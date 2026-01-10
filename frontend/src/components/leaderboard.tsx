"use client"

import { useState, useEffect } from "react"
import { db } from "../firebaseConfig" // Ensure path to src/firebaseConfig is correct
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Trophy, Medal, Award } from "lucide-react"

export function Leaderboard() {
  const [topUsers, setTopUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Query the 'users' collection, sorted by points in descending order
    const q = query(collection(db, "users"), orderBy("points", "desc"), limit(10))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTopUsers(users)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <div className="p-4 text-center text-slate-500">Loading Rankings...</div>

  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader className="border-b border-slate-50">
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="text-amber-500 h-6 w-6" /> Global Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-50">
          {topUsers.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 text-center font-bold text-slate-400">
                  {index === 0 ? <Medal className="text-amber-500 mx-auto" /> : 
                   index === 1 ? <Medal className="text-slate-400 mx-auto" /> :
                   index === 2 ? <Award className="text-amber-700 mx-auto" /> : 
                   `#${index + 1}`}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{user.displayName || "Anonymous"}</p>
                  <p className="text-xs text-slate-500">Level {user.ecoLevel || 1} Eco-Warrior</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600">{user.points || 0}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Points</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}