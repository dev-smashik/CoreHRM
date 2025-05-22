"use client"

import { AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function EnvVariablesStatus() {
  // List of required environment variables
  const requiredVariables = [
    { name: "DATABASE_URL", description: "Database connection string" },
    { name: "NEXTAUTH_URL", description: "NextAuth URL" },
    { name: "NEXTAUTH_SECRET", description: "NextAuth secret key" },
    { name: "STORAGE_BUCKET", description: "Storage bucket name" },
    { name: "STORAGE_REGION", description: "Storage region" },
    { name: "STORAGE_ACCESS_KEY", description: "Storage access key" },
    { name: "STORAGE_SECRET_KEY", description: "Storage secret key" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Status of required environment variables</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variable</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requiredVariables.map((variable) => (
              <TableRow key={variable.name}>
                <TableCell className="font-medium">{variable.name}</TableCell>
                <TableCell>{variable.description}</TableCell>
                <TableCell>
                  {/* This will always show as "Client" since we can't access process.env on the client */}
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-xs">Client</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="flex items-center">
            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
            Environment variables can only be checked on the server. The database connection status above confirms if
            your DATABASE_URL is working correctly.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
