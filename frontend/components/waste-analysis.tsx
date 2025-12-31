"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Upload, Camera, FileText } from "lucide-react"

export function WasteAnalysis() {
  const [input, setInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  return (
    <Card className="border-2 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Waste Analysis
            </CardTitle>
            <CardDescription className="text-base">
              Upload or describe your waste for instant sustainability insights
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Methods */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="flex flex-col h-auto py-4 gap-2 hover:bg-accent hover:scale-105 transition-all bg-transparent"
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs font-medium">Photo</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col h-auto py-4 gap-2 hover:bg-accent hover:scale-105 transition-all bg-transparent"
          >
            <Upload className="h-5 w-5" />
            <span className="text-xs font-medium">Upload</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col h-auto py-4 gap-2 hover:bg-accent hover:scale-105 transition-all bg-transparent"
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs font-medium">Text</span>
          </Button>
        </div>

        {/* Text Input */}
        <div className="space-y-3">
          <Textarea
            placeholder="Describe your waste items (e.g., '3 plastic bottles, 2 cardboard boxes, food scraps') or upload an image..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] resize-none text-base"
          />

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze Waste with AI
              </>
            )}
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
            <div className="text-2xl font-bold text-primary">86%</div>
            <div className="text-xs text-muted-foreground mt-1">Recyclable Rate</div>
          </div>
          <div className="rounded-lg bg-chart-2/10 p-4 border border-chart-2/20">
            <div className="text-2xl font-bold text-chart-2">2.3 kg</div>
            <div className="text-xs text-muted-foreground mt-1">CO₂ Saved Today</div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="rounded-lg bg-muted/50 p-4 border border-border">
          <p className="text-xs font-medium text-foreground mb-2">💡 Pro Tip</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Take clear photos of your waste items for more accurate AI analysis and better sustainability
            recommendations.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
