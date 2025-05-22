"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"

// Schema for document creation/update
const documentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum([
    "POLICY",
    "TEMPLATE",
    "CHECKLIST",
    "ONBOARDING",
    "PERFORMANCE",
    "COMPLIANCE",
    "OFFBOARDING",
    "OTHER",
  ]),
  fileUrl: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
  isTemplate: z.boolean().default(false),
  tags: z.string().optional(),
})

export async function getDocuments(query = "", category = "") {
  try {
    const whereClause: any = {}

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { tags: { contains: query, mode: "insensitive" } },
      ]
    }

    if (category) {
      whereClause.category = category
    }

    const documents = await prisma.document.findMany({
      where: whereClause,
      include: {
        uploadedBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return documents
  } catch (error) {
    console.error("Failed to fetch documents:", error)
    throw new Error("Failed to fetch documents")
  }
}

export async function getTemplates(query = "", category = "") {
  try {
    const whereClause: any = {
      isTemplate: true,
    }

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { tags: { contains: query, mode: "insensitive" } },
      ]
    }

    if (category) {
      whereClause.category = category
    }

    const templates = await prisma.document.findMany({
      where: whereClause,
      include: {
        uploadedBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return templates
  } catch (error) {
    console.error("Failed to fetch templates:", error)
    throw new Error("Failed to fetch templates")
  }
}

export async function getDocument(id: string) {
  try {
    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: {
            name: true,
          },
        },
      },
    })

    return document
  } catch (error) {
    console.error("Failed to fetch document:", error)
    throw new Error("Failed to fetch document")
  }
}

export async function createDocument(data: z.infer<typeof documentSchema>, userId: string) {
  try {
    const validatedData = documentSchema.parse(data)

    const document = await prisma.document.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        fileUrl: validatedData.fileUrl,
        fileType: validatedData.fileType,
        fileSize: validatedData.fileSize,
        isTemplate: validatedData.isTemplate,
        tags: validatedData.tags,
        uploadedById: userId,
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "CREATE",
      `Created ${validatedData.isTemplate ? "template" : "document"}: ${document.title}`,
      "DOCUMENT",
      document.id,
    )

    revalidatePath(validatedData.isTemplate ? "/templates" : "/documents")
    return document
  } catch (error) {
    console.error("Failed to create document:", error)
    throw new Error("Failed to create document")
  }
}

export async function updateDocument(id: string, data: z.infer<typeof documentSchema>, userId: string) {
  try {
    const validatedData = documentSchema.parse(data)

    const document = await prisma.document.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        fileUrl: validatedData.fileUrl,
        fileType: validatedData.fileType,
        fileSize: validatedData.fileSize,
        isTemplate: validatedData.isTemplate,
        tags: validatedData.tags,
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "UPDATE",
      `Updated ${validatedData.isTemplate ? "template" : "document"}: ${document.title}`,
      "DOCUMENT",
      document.id,
    )

    revalidatePath(validatedData.isTemplate ? "/templates" : "/documents")
    return document
  } catch (error) {
    console.error("Failed to update document:", error)
    throw new Error("Failed to update document")
  }
}

export async function deleteDocument(id: string, userId: string) {
  try {
    const document = await prisma.document.delete({
      where: { id },
    })

    // Create activity log
    await createActivity(
      userId,
      "DELETE",
      `Deleted ${document.isTemplate ? "template" : "document"}: ${document.title}`,
      "DOCUMENT",
      document.id,
    )

    revalidatePath(document.isTemplate ? "/templates" : "/documents")
    return document
  } catch (error) {
    console.error("Failed to delete document:", error)
    throw new Error("Failed to delete document")
  }
}
