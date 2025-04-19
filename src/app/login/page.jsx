"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLoginMutation } from "@/lib/service/authApi"


export default function LoginPage() {
  const router = useRouter()
  const [phone, setUserphone] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Use the login mutation hook from our API
  const [login, { isLoading }] = useLoginMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      const result = await login({ phone, password }).unwrap()

      // Store tokens in localStorage
      localStorage.setItem("accessToken", result.access)
      localStorage.setItem("refreshToken", result.refresh)

      // Store user info if available
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user))
      }

      // Redirect to dashboard
      router.push("/")
    } catch (error) {
      console.error("Login failed:", error)

      // Handle different error types
      if (error.status === 401) {
        setErrorMessage("Login yoki parol noto'g'ri")
      } else if (error.data?.detail) {
        setErrorMessage(error.data.detail)
      } else {
        setErrorMessage("Serverga ulanishda xatolik yuz berdi")
      }
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8" />
            <span className="text-2xl font-bold">English Center CRM</span>
          </div>
          <CardTitle className="text-2xl text-center">Tizimga kirish</CardTitle>
          <CardDescription className="text-center">Tizimga kirish uchun login va parolingizni kiriting</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="phone">Login</Label>
              <Input
                id="phone"
                placeholder="admin"
                value={phone}
                onChange={(e) => setUserphone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Kirish..." : "Kirish"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
