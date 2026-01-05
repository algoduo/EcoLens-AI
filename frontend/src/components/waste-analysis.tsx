"use client"

import { useState, useRef } from "react"
import { db, auth } from "@/context/UserContext" 
import { doc, updateDoc, increment, collection, addDoc, serverTimestamp } from "firebase/firestore"
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

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("AI Analysis failed")
      const data = await response.json()
      setResult(data)

      if (auth.currentUser) {
        // Update Points
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, {
          points: increment(50), 
          totalScans: increment(1)
        })

        // Save Scan History for Charts
        await addDoc(collection(db, "scans"), {
          userId: auth.currentUser.uid,
          category: data.category,
          itemName: data.itemName,
          timestamp: serverTimestamp()
        })
      }
    } catch (err: any) {
      setError(err.message || "Connection failed")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="border-2 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">AI Waste Analysis</CardTitle>
        <CardDescription>Powered by Gemini 3 Flash</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex h-auto py-4 flex-col">
            <Camera className="h-5 w-5 mb-2" />
            <span>Take Photo</span>
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex h-auto py-4 flex-col">
            <Upload className="h-5 w-5 mb-2" />
            <span>Upload Image</span>
          </Button>
        </div>

        {isAnalyzing && <div className="text-center p-4 animate-pulse"><Loader2 className="animate-spin mx-auto h-8 w-8" /><p>Analyzing...</p></div>}
        
        {result && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2 animate-in fade-in">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <CheckCircle2 className="text-primary h-5 w-5" /> {result.itemName}
            </h3>
            <p className="text-sm font-semibold text-emerald-600">Earned 50 Points! 🏆</p>
            <div className="bg-white p-3 rounded-lg border text-sm italic">💡 {result.upcyclingTips}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}