"use client"

import { useContext, useRef } from "react"
import { UserContext } from "../context/UserContext"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Award, Share2, Download } from "lucide-react"
import { Button } from "./ui/button"
import { toPng } from 'html-to-image' // New library import

export function Certificate() {
  const { user, loading } = useContext(UserContext)
  const certificateRef = useRef<HTMLDivElement>(null) // Reference to the card

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EcoLens AI Certificate',
          text: `I'm a Level ${user?.ecoLevel || 1} Eco Warrior!`,
          url: window.location.href,
        });
      } catch (err) { console.error(err); }
    }
  };

  // Fixed Download Logic: Grabs only the card
  const handleDownload = async () => {
    if (certificateRef.current === null) return

    try {
      const dataUrl = await toPng(certificateRef.current, { cacheBust: true })
      const link = document.createElement('a')
      link.download = `${user?.displayName || 'EcoWarrior'}-Certificate.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Oops, something went wrong!', err)
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Achievements...</div>

  return (
    /* We attach the ref here so the library knows what to capture */
    <div ref={certificateRef} className="bg-white"> 
      <Card className="overflow-hidden border-emerald-100 shadow-none">
        <CardHeader className="bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-emerald-800 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Active Certificate
            </CardTitle>
            {/* The buttons stay on screen but don't show up in the downloaded image */}
            <div className="flex gap-2 print:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-emerald-600"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-emerald-600"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-sm">
            <Award className="h-12 w-12 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {user?.ecoLevel === 1 ? "Eco Initiate" : `Level ${user?.ecoLevel} Eco Master`}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Certified Sustainability Champion
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-around text-sm">
            <div>
              <p className="font-bold text-slate-900">{user?.points || 0}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Total Points</p>
            </div>
            <div className="border-x border-slate-100 px-4">
              <p className="font-bold text-slate-900">#{user?.rank || "247"}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Global Rank</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}