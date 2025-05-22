"use server"

import prisma from "@/lib/prisma"

export async function createActivity(
  userId: string,
  action: string,
  description: string,
  entityType?: string,
  entityId?: string | null,
) {
  try {
    const activity = await prisma.activity.create({
      data: {
        userId,
        action,
        description,
        entityType: entityType || null,
        entityId: entityId || null,
      },
    })

    return activity
  } catch (error) {
    console.error("Failed to create activity log:", error)
    // Don't throw error to prevent disrupting the main operation
    return null
  }
}

export async function getRecentActivities(limit = 10) {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return activities
  } catch (error) {
    console.error("Failed to fetch recent activities:", error)
    throw new Error("Failed to fetch recent activities")
  }
}

export async function getUserActivities(userId: string, limit = 10) {
  try {
    const activities = await prisma.activity.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return activities
  } catch (error) {
    console.error("Failed to fetch user activities:", error)
    throw new Error("Failed to fetch user activities")
  }
}
