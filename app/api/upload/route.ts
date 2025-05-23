import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

import { authOptions } from "@/lib/auth"

// Initialize S3 client with fallback region
const s3Client = new S3Client({
  region: process.env.STORAGE_REGION || "us-east-1", // Provide a default region
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY || "",
    secretAccessKey: process.env.STORAGE_SECRET_KEY || "",
  },
})

export async function POST(request: NextRequest) {
  try {
    // Validate required environment variables
    if (!process.env.STORAGE_REGION || !process.env.STORAGE_ACCESS_KEY || !process.env.STORAGE_SECRET_KEY || !process.env.STORAGE_BUCKET) {
      console.error("Missing required AWS environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Generate unique file name
    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })

    await s3Client.send(command)

    // Generate public URL
    const fileUrl = `https://${process.env.STORAGE_BUCKET}.s3.${process.env.STORAGE_REGION}.amazonaws.com/${fileName}`

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName,
      fileType: file.type,
      fileSize: file.size,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}