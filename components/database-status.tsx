"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DatabaseStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState<string>("")

  const checkConnection = async () => {
    setStatus("loading")
    try {
      const response = await fetch("/api/system/db-status")
      const data = await response.json()

      if (data.success) {
        setStatus("connected")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to connect to database")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to check database connection")
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Database Connection
          {status === "connected" && <CheckCircle className="h-5 w-5 text-green-500" />}
          {status === "error" && <XCircle className="h-5 w-5 text-red-500" />}
        </CardTitle>
        <CardDescription>Status of your database connection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm">
            {status === "loading" && "Checking database connection..."}
            {status === "connected" && (
              <div className="text-green-600">
                <p>Connected to database successfully</p>
                <p className="text-muted-foreground mt-1">{message}</p>
              </div>
            )}
            {status === "error" && (
              <div className="text-red-600">
                <p>Failed to connect to database</p>
                <p className="text-muted-foreground mt-1">{message}</p>
              </div>
            )}
          </div>
          <Button onClick={checkConnection} variant="outline" size="sm">
            Test Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
