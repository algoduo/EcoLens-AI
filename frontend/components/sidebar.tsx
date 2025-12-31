"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, BarChart3, Trophy, Leaf, Settings, Menu, X, Recycle, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", icon: Home, href: "#", current: true },
  { name: "Analytics", icon: BarChart3, href: "#", current: false },
  { name: "Leaderboard", icon: Trophy, href: "#", current: false },
  { name: "Waste Tracker", icon: Recycle, href: "#", current: false },
  { name: "Goals", icon: Target, href: "#", current: false },
  { name: "Impact", icon: TrendingUp, href: "#", current: false },
  { name: "Settings", icon: Settings, href: "#", current: false },
]

export function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 shadow-lg">
              <Leaf className="h-6 w-6 text-primary-foreground animate-pulse" />
              <div className="absolute inset-0 bg-primary/30 rounded-lg blur-sm animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                EcoLens AI
              </span>
              <span className="text-xs text-muted-foreground">Sustainability Hub</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="border-b border-sidebar-border p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-sidebar">
                <AvatarImage src="/diverse-group.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Jordan Davis</p>
                <p className="text-xs text-muted-foreground truncate">jordan@ecolens.ai</p>
              </div>
            </div>

            {/* Eco Level */}
            <div className="space-y-2 rounded-lg bg-primary/10 p-3 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Eco Level</span>
                <Badge variant="default" className="bg-primary hover:bg-primary">
                  Level 7
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress to Level 8</span>
                  <span className="font-semibold">73%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-chart-2 to-primary transition-all duration-500"
                    style={{ width: "73%" }}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">1,850 points</span> to next level
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  item.current
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12",
                    item.current ? "text-primary animate-pulse" : "",
                  )}
                />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Footer Stats */}
          <div className="border-t border-sidebar-border p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Total Impact</span>
              <span className="font-bold text-primary">12.4 tons CO₂</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Global Rank</span>
              <span className="font-bold">#247</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  )
}
