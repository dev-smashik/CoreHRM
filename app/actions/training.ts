"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"
import { createNotification } from "@/app/actions/notification"

// Schema for training creation/update
const trainingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum(["COURSE", "WORKSHOP", "WEBINAR", "CERTIFICATION", "CONFERENCE"]),
  category: z.string().optional(),
  isRequired: z.boolean().default(false),
  dueDate: z.string().optional(),
  content: z.string().optional(),
})

export async function getTrainings(query = "", type = "") {
  try {
    const whereClause: any = {}

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ]
    }

    if (type) {
      whereClause.type = type
    }

    const trainings = await prisma.training.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    })

    return trainings
  } catch (error) {
    console.error("Failed to fetch trainings:", error)
    throw new Error("Failed to fetch trainings")
  }
}

export async function getTraining(id: string) {
  try {
    const training = await prisma.training.findUnique({
      where: { id },
      include: {
        status: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return training
  } catch (error) {
    console.error("Failed to fetch training:", error)
    throw new Error("Failed to fetch training")
  }
}

export async function createTraining(data: z.infer<typeof trainingSchema>, userId: string) {
  try {
    const validatedData = trainingSchema.parse(data)

    const training = await prisma.training.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        category: validatedData.category,
        isRequired: validatedData.isRequired,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        content: validatedData.content,
      },
    })

    // Create activity log
    await createActivity(userId, "CREATE", `Created training: ${training.title}`, "TRAINING", training.id)

    // If required training, assign to all employees
    if (validatedData.isRequired) {
      const employees = await prisma.user.findMany({
        where: {
          employee: {
            isNot: null,
          },
        },
      })

      for (const employee of employees) {
        // Create training status for each employee
        await prisma.trainingStatus.create({
          data: {
            trainingId: training.id,
            userId: employee.id,
          },
        })

        // Notify each employee
        await createNotification(
          employee.id,
          "New Required Training",
          `You have been assigned a new required training: ${training.title}`,
          "INFO",
          `/development?tab=training`,
        )
      }
    }

    revalidatePath("/development")
    return training
  } catch (error) {
    console.error("Failed to create training:", error)
    throw new Error("Failed to create training")
  }
}

export async function updateTraining(id: string, data: z.infer<typeof trainingSchema>, userId: string) {
  try {
    const validatedData = trainingSchema.parse(data)

    const training = await prisma.training.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        category: validatedData.category,
        isRequired: validatedData.isRequired,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        content: validatedData.content,
      },
    })

    // Create activity log
    await createActivity(userId, "UPDATE", `Updated training: ${training.title}`, "TRAINING", training.id)

    revalidatePath("/development")
    revalidatePath(`/development/training/${id}`)
    return training
  } catch (error) {
    console.error("Failed to update training:", error)
    throw new Error("Failed to update training")
  }
}

export async function deleteTraining(id: string, userId: string) {
  try {
    const training = await prisma.training.delete({
      where: { id },
    })

    // Create activity log
    await createActivity(userId, "DELETE", `Deleted training: ${training.title}`, "TRAINING", training.id)

    revalidatePath("/development")
    return training
  } catch (error) {
    console.error("Failed to delete training:", error)
    throw new Error("Failed to delete training")
  }
}

export async function assignTrainingToUser(trainingId: string, userId: string, assignedBy: string) {
  try {
    // Check if already assigned
    const existingStatus = await prisma.trainingStatus.findFirst({
      where: {
        trainingId,
        userId,
      },
    })

    if (existingStatus) {
      return existingStatus
    }

    // Create new training status
    const status = await prisma.trainingStatus.create({
      data: {
        trainingId,
        userId,
      },
      include: {
        training: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    // Create activity log
    await createActivity(
      assignedBy,
      "CREATE",
      `Assigned training "${status.training.title}" to ${status.user.name}`,
      "TRAINING_STATUS",
      status.id,
    )

    // Notify the user
    await createNotification(
      userId,
      "New Training Assigned",
      `You have been assigned a new training: ${status.training.title}`,
      "INFO",
      `/development?tab=training`,
    )

    revalidatePath("/development")
    return status
  } catch (error) {
    console.error("Failed to assign training:", error)
    throw new Error("Failed to assign training")
  }
}

export async function updateTrainingStatus(id: string, progress: number, status: string, userId: string) {
  try {
    const trainingStatus = await prisma.trainingStatus.update({
      where: { id },
      data: {
        progress,
        status: status as any,
        startedAt: status === "IN_PROGRESS" && !progress ? new Date() : undefined,
        completedAt: status === "COMPLETED" ? new Date() : null,
      },
      include: {
        training: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "UPDATE",
      `Updated training status for "${trainingStatus.training.title}" to ${status}`,
      "TRAINING_STATUS",
      trainingStatus.id,
    )

    // If completed, notify HR
    if (status === "COMPLETED") {
      const hrManagers = await prisma.user.findMany({
        where: {
          role: "HR",
        },
      })

      for (const manager of hrManagers) {
        await createNotification(
          manager.id,
          "Training Completed",
          `${trainingStatus.user.name} has completed the training: ${trainingStatus.training.title}`,
          "SUCCESS",
          `/development?tab=training`,
        )
      }
    }

    revalidatePath("/development")
    return trainingStatus
  } catch (error) {
    console.error("Failed to update training status:", error)
    throw new Error("Failed to update training status")
  }
}
