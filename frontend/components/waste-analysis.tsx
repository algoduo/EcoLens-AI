"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Camera, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

export function WasteAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append("image", file)

    try {
      // Connects to your Node.js backend on Port 5000
      const response = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Analysis failed")
      }

      const data = await response.json()
      setResult(data) // Displays the JSON data from Gemini 3 Flash
    } catch (err: any) {
      console.error("Analysis Error:", err)
      setError(err.message || "Could not connect to the backend server.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="border-2 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">AI Waste Analysis</CardTitle>
        <CardDescription>Powered by Gemini 3 Flash</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
        />

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex flex-col h-auto py-4">
            <Camera className="h-5 w-5 mb-2" />
            <span>Take Photo</span>
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex flex-col h-auto py-4">
            <Upload className="h-5 w-5 mb-2" />
            <span>Upload Image</span>
          </Button>
        </div>

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center p-6 text-primary animate-pulse">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p className="font-medium">Gemini 3 Flash is analyzing...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2 text-sm border border-destructive/20">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-primary" /> {result.itemName}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-background p-2 rounded border">
                  <p className="text-[10px] uppercase text-muted-foreground">Score</p>
                  <p className="text-xl font-bold text-chart-2">{result.score}%</p>
                </div>
                <div className="bg-background p-2 rounded border">
                  <p className="text-[10px] uppercase text-muted-foreground">Category</p>
                  <p className="text-sm font-semibold">{result.category}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-bold block mb-1">📋 Preparation</span>
                <p className="text-muted-foreground">{result.prepStep}</p>
              </div>
              <div className="text-sm bg-muted/50 p-3 rounded-lg border border-border">
                <span className="font-bold block mb-1 text-primary">💡 DIY Upcycling Idea</span>
                <p className="italic">"{result.upcyclingTips}"</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}