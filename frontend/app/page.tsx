import { Sidebar } from "@/components/sidebar"
import { Certificate } from "@/components/certificate"
import { Leaderboard } from "@/components/leaderboard"
import { WasteAnalysis } from "@/components/waste-analysis"
import { Footer } from "@/components/footer"
import { Sparkles } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-balance">Welcome to EcoLens AI</h1>
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <p className="text-lg text-muted-foreground text-balance">
              Track your environmental impact and earn recognition for sustainable choices
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            <WasteAnalysis />
            <Certificate />
          </div>

          <Leaderboard />
        </div>

        <Footer />
      </main>
    </div>
  )
}
