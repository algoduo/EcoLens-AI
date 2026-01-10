"use client"

import { useState } from "react"
// You must go up 3 levels to reach the frontend root
// Go up two levels to 'frontend', then into 'src'
import { auth, db } from "../../src/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { Button } from "../../src/components/ui/button"
import { Input } from "../../src/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../src/components/ui/card"
import { Recycle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error: any) { alert("Login failed. Please check your credentials.") }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-emerald-100 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500">
            <Recycle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</CardTitle>
          <CardDescription>Log in to continue your impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 text-white font-bold">Sign In</Button>
          </form>
          <div className="text-center text-sm text-slate-500">
            New to EcoLens? <Link href="/register" className="text-emerald-600 font-bold hover:underline">Create an account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}