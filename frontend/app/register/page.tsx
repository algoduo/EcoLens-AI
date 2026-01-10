"use client"

import { useState } from "react"
// Correct path to reach the root from app/login/ or app/register/
// You must go up 3 levels to reach the frontend root
// Go up two levels to 'frontend', then into 'src'
import { auth, db } from "../../src/firebaseConfig"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Button } from "../../src/components/ui/button"
import { Input } from "../../src/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../src/components/ui/card"
import { Recycle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: name })
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: name,
        email: email,
        points: 0,
        ecoLevel: 1,
        rank: 500,
        totalScans: 0,
        createdAt: new Date()
      })
      router.push("/")
    } catch (error: any) { alert(error.message) }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-emerald-100 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-200">
            <Recycle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Join the Mission</CardTitle>
          <CardDescription>Create your account and start earning points</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 text-white font-bold">Sign Up</Button>
          </form>
          <div className="text-center text-sm text-slate-500">
            Already have an account? <Link href="/login" className="text-emerald-600 font-bold hover:underline">Sign In</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}