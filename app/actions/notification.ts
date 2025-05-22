"use server"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: "INFO" | "WARNING" | "ERROR" | "SUCCESS" = "INFO",
  link?: string,
) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        link,
      },
    })

    return notification
  } catch (error) {
    console.error("Failed to create notification:", error)
    // Don't throw error to prevent disrupting the main operation
    return null
  }
}

export async function getUserNotifications(userId: string) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return notifications
  } catch (error) {
    console.error("Failed to fetch user notifications:", error)
    throw new Error("Failed to fetch user notifications")
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    const notification = await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    })

    revalidatePath("/")
    return notification
  } catch (error) {
    console.error("Failed to mark notification as read:", error)
    throw new Error("Failed to mark notification as read")
  }
}

export async function markAllNotificationsAsRead(userId: string) {
  try {
    await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    })

    revalidatePath("/")
    return true
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error)
    throw new Error("Failed to mark all notifications as read")
  }
}

export async function deleteNotification(id: string) {
  try {
    await prisma.notification.delete({
      where: { id },
    })

    revalidatePath("/")
    return true
  } catch (error) {
    console.error("Failed to delete notification:", error)
    throw new Error("Failed to delete notification")
  }
}
