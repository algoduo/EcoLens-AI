"use client"

import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { db } from "../firebaseConfig"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export function WasteTracker() {
  const { user } = useContext(UserContext)
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    // 1. Listen for Nia's real-time scan history
    const q = query(
      collection(db, "scans"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dailyTotals: Record<string, number> = {}
      
      snapshot.docs.forEach((doc) => {
        const data = doc.data()
        if (data.timestamp) {
          // Convert Firestore timestamp to a readable date (e.g., "Jan 05")
          const date = data.timestamp.toDate().toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })
          dailyTotals[date] = (dailyTotals[date] || 0) + 1
        }
      })

      // 2. Format the data for the Recharts BarChart
      const formattedData = Object.keys(dailyTotals).map(date => ({
        date,
        scans: dailyTotals[date]
      }))

      setChartData(formattedData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  return (
    <Card className="border-emerald-100 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-emerald-800 text-lg font-bold">Waste Analytics</CardTitle>
        <CardDescription className="text-xs">Your weekly recycling activity</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px] pt-4">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">
            Fetching scan history...
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 10}} 
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Bar dataKey="scans" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#10b981" fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
            <p className="text-sm text-slate-500 font-medium">No scans recorded yet</p>
            <p className="text-[11px] text-slate-400">Scan your first item to see your progress!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}