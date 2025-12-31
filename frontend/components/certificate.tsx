import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, CheckCircle2 } from "lucide-react"

export function Certificate() {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-balance">Sustainability Champion</CardTitle>
            <p className="text-sm text-muted-foreground">Certification Award</p>
          </div>
          <Award className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Award Badge */}
        <div className="flex items-center justify-center py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 shadow-2xl ring-4 ring-background animate-[spin_20s_linear_infinite]">
              <Award className="h-16 w-16 text-primary-foreground animate-[spin_20s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="space-y-4 rounded-lg bg-muted/50 p-4 border border-border">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-primary animate-bounce" />
            <span className="font-medium">Certified Eco Warrior</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Awarded on December 15, 2025</span>
          </div>

          <div className="pt-2 space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Awarded for outstanding commitment to environmental sustainability and achieving significant milestones in
              waste reduction and carbon footprint management.
            </p>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-chart-2/20 text-chart-2 border-chart-2/30 hover:scale-105 transition-transform"
          >
            100+ Actions
          </Badge>
          <Badge
            variant="secondary"
            className="bg-primary/20 text-primary border-primary/30 hover:scale-105 transition-transform"
          >
            Top 5% User
          </Badge>
          <Badge
            variant="secondary"
            className="bg-chart-4/20 text-chart-4 border-chart-4/30 hover:scale-105 transition-transform"
          >
            Community Leader
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
