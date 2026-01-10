"use client"

import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserContext } from "../src/context/UserContext"
import { WasteAnalysis } from "../src/components/waste-analysis"
import { WasteTracker } from "../src/components/waste-tracker"
// 1. Import the Leaderboard component
import { Leaderboard } from "../src/components/leaderboard"

export default function HomePage() {
  const { user, loading } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/register")
    }
  }, [user, loading, router])

  if (loading) return <div className="p-8">Syncing Eco-Dashboard...</div>
  if (!user) return null

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-black text-slate-900">
          Welcome back, {user.displayName || "Eco Warrior"}!
        </h1>
        <p className="text-slate-500 text-sm">Your current impact is growing.</p>
      </header>

      {/* 2. Update the grid to include the Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WasteAnalysis />
          {/* You can also place the leaderboard here or in the sidebar column */}
          <Leaderboard /> 
        </div>
        <div>
          <WasteTracker />
        </div>
      </div>
    </div>
  )
}