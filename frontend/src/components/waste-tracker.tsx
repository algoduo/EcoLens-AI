"use client"

import { useEffect, useState } from "react"
// 1. Get the data from Context
import { UserContext } from "../context/UserContext"; 
import { useContext } from "react";

// 2. Get the Firebase tools from the Config file where they live
import { db, auth } from "../firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export function WasteTracker() {
  const [chartData, setChartData] = useState([
    { category: "Plastic", count: 0, color: "#10b981" },
    { category: "Paper", count: 0, color: "#3b82f6" },
    { category: "Metal", count: 0, color: "#f59e0b" },
  ])

  useEffect(() => {
    if (!auth.currentUser) return;

    // Listen for scans belonging to the current user
    const q = query(collection(db, "scans"), where("userId", "==", auth.currentUser.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const counts: { [key: string]: number } = { Plastic: 0, Paper: 0, Metal: 0 };
      snapshot.docs.forEach((doc) => {
        const cat = doc.data().category;
        if (counts[cat] !== undefined) counts[cat]++;
      });

      setChartData(prev => prev.map(item => ({
        ...item,
        count: counts[item.category]
      })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card className="border-2 shadow-md">
      <CardHeader><CardTitle>Waste Distribution</CardTitle></CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
              {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}