import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, Medal } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Alex Morgan",
    points: 28450,
    change: "+12%",
    avatar: "/diverse-person-portrait.png",
    badge: "gold",
  },
  {
    rank: 2,
    name: "Sarah Chen",
    points: 26890,
    change: "+8%",
    avatar: "/diverse-group-conversation.png",
    badge: "silver",
  },
  {
    rank: 3,
    name: "Marcus Johnson",
    points: 25120,
    change: "+15%",
    avatar: "/diverse-group-meeting.png",
    badge: "bronze",
  },
  {
    rank: 4,
    name: "Emma Rodriguez",
    points: 23780,
    change: "+5%",
    avatar: "/diverse-group-meeting.png",
    badge: "none",
  },
  {
    rank: 5,
    name: "Jordan Davis (You)",
    points: 22150,
    change: "+18%",
    avatar: "/diverse-group-five.png",
    badge: "none",
    isCurrentUser: true,
  },
]

export function Leaderboard() {
  return (
    <Card className="border-2 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Global Leaderboard
            </CardTitle>
            <CardDescription className="text-base">Top sustainability champions this month</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            Live Rankings
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`group flex items-center gap-4 rounded-lg p-4 transition-all duration-200 hover:scale-[1.01] ${
                user.isCurrentUser
                  ? "bg-primary/10 border-2 border-primary/30 shadow-sm"
                  : "bg-muted/30 hover:bg-muted/50 border border-transparent"
              }`}
            >
              {/* Rank */}
              <div className="flex h-10 w-10 items-center justify-center">
                {user.rank <= 3 ? (
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
                      user.badge === "gold" ? "bg-chart-4/20" : user.badge === "silver" ? "bg-muted" : "bg-chart-1/20"
                    }`}
                  >
                    <Medal
                      className={`h-6 w-6 ${
                        user.badge === "gold"
                          ? "text-chart-4"
                          : user.badge === "silver"
                            ? "text-muted-foreground"
                            : "text-chart-1"
                      }`}
                    />
                  </div>
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">{user.rank}</span>
                )}
              </div>

              {/* Avatar */}
              <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">{user.name}</p>
                  {user.isCurrentUser && (
                    <Badge variant="default" className="text-xs px-2 py-0">
                      You
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">{user.points.toLocaleString()} points</span>
                </div>
              </div>

              {/* Change Indicator */}
              <div className="flex items-center gap-1.5 text-sm">
                <TrendingUp className="h-4 w-4 text-chart-2" />
                <span className="font-semibold text-chart-2">{user.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className="mt-4 w-full rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          View Full Leaderboard
        </button>
      </CardContent>
    </Card>
  )
}
