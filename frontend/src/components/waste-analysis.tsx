"use client"

import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { db } from "../firebaseConfig" 
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Camera, Upload, Loader2 } from "lucide-react"

export function WasteAnalysis() {
  const { user } = useContext(UserContext)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setAnalyzing(true)
    try {
      // 1. DEFINING 'data': This prevents the "data is not defined" error
      // Replace this mock with your Gemini API response logic when ready
      const data = {
        itemName: "Aluminum Can",
        category: "Recyclable",
        confidence: 0.95,
        instructions: "Empty, crush, and place in the recycling bin."
      }

      // 2. SAVE SCAN HISTORY
      await addDoc(collection(db, "scans"), {
        userId: user.uid,
        item: data.itemName, 
        category: data.category,
        timestamp: serverTimestamp(),
        pointsEarned: 15
      })

      // 3. UPDATE USER PROFILE: This makes points visible in the sidebar
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        points: increment(15),
        totalScans: increment(1)
      })

      setResult(data)
    } catch (error) {
      console.error("Analysis Error:", error)
      alert("Failed to analyze waste. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Camera className="text-emerald-500" /> AI Waste Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-8 bg-slate-50 hover:bg-slate-100 transition-colors">
          <Upload className="h-10 w-10 text-slate-400 mb-2" />
          <p className="text-sm text-slate-500 mb-4 text-center">Scan an item to earn EcoPoints</p>
          <input 
            type="file" 
            id="waste-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleAnalyze}
            disabled={analyzing}
          />
          <Button asChild disabled={analyzing} className="bg-emerald-600 hover:bg-emerald-700">
            <label htmlFor="waste-upload" className="cursor-pointer">
              {analyzing ? <Loader2 className="mr-2 animate-spin" /> : null}
              {analyzing ? "Analyzing..." : "Capture / Upload"}
            </label>
          </Button>
        </div>

        {result && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-emerald-900 text-lg">{result.itemName}</h4>
                <p className="text-sm text-emerald-700">Category: {result.category}</p>
              </div>
              <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded">
                +15 PTS
              </span>
            </div>
            <p className="text-xs text-emerald-600 mt-2 leading-relaxed">
              <strong>Action:</strong> {result.instructions}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}