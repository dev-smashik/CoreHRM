import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1 as connected`

    // Get database URL (masked for security)
    const dbUrl = process.env.DATABASE_URL || ""
    const maskedUrl = dbUrl.replace(/:\/\/([^:]+):([^@]+)@/, "://*****:*****@")

    return NextResponse.json({
      success: true,
      message: `Connected to ${maskedUrl}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 },
    )
  }
}
