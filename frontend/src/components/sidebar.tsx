"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { UserContext } from "../context/UserContext"
import { auth } from "../firebaseConfig"
import { signOut } from "firebase/auth"
import { 
  Home, Trophy, Settings, 
  Menu, X, Recycle, LogOut, TrendingUp 
} from "lucide-react"
import { cn } from "../lib/utils"

const navigation = [
  { name: "Dashboard", icon: Home, href: "/", current: true },
  { name: "Leaderboard", icon: Trophy, href: "#leaderboard", current: false },
  { name: "Waste Tracker", icon: Recycle, href: "#tracker", current: false },
  { name: "Impact", icon: TrendingUp, href: "#impact", current: false },
  { name: "Settings", icon: Settings, href: "#settings", current: false },
]

export function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading } = useContext(UserContext)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // NOTE: Ensure your login file is at 'frontend/app/login/page.tsx'
      router.push("/login"); 
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10b981] shadow-sm">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900">EcoLens AI</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Sustainability Hub</span>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="border-b border-slate-100 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-emerald-500/10">
                <AvatarImage src={user?.photoURL} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                  {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "NI"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-slate-900">
                  {user?.displayName || "nia"}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {user?.email || "sonialearns7@gmail.com"}
                </p>
              </div>
            </div>

            {/* Level & Progress - Matches Dashboard UI */}
            <div className="space-y-3 rounded-xl bg-slate-50/50 p-4 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Eco Level</span>
                <Badge className="bg-[#10b981] hover:bg-[#059669] border-none px-2 py-0 h-5">
                  Level {user?.ecoLevel || 4}
                </Badge>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-medium">Progress</span>
                  <span className="font-bold text-[#10b981]">73%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full bg-[#10b981]" style={{ width: "73%" }} />
                </div>
              </div>
              <p className="text-[11px] text-slate-600">
                <span className="font-bold text-emerald-700">{user?.points || 395}</span> points earned
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  item.current 
                    ? "bg-emerald-50 text-emerald-700 font-bold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-4 w-4", item.current ? "text-emerald-600" : "text-slate-400")} />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Footer with Sign Out */}
          <div className="border-t border-slate-100 p-4 space-y-2">
            <div className="flex items-center justify-between text-[10px] px-2 mb-2">
              <span className="text-slate-400 uppercase font-bold tracking-tighter">Global Rank</span>
              <span className="font-bold text-slate-900">#{user?.rank || "247"}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/10 backdrop-blur-[2px] lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  )
}