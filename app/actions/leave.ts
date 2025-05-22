"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"
import { createNotification } from "@/app/actions/notification"

// Schema for leave request creation/update
const leaveRequestSchema = z.object({
  employeeId: z.string(),
  type: z.enum(["VACATION", "SICK", "PERSONAL", "MATERNITY", "PATERNITY", "BEREAVEMENT", "UNPAID"]),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().optional(),
})

export async function getLeaveRequests(status?: string, employeeId?: string) {
  try {
    const whereClause: any = {}

    if (status) {
      whereClause.status = status
    }

    if (employeeId) {
      whereClause.employeeId = employeeId
    }

    const requests = await prisma.leaveRequest.findMany({
      where: whereClause,
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
            department: true,
          },
        },
        requestedBy: {
          select: {
            name: true,
          },
        },
        approvedBy: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return requests
  } catch (error) {
    console.error("Failed to fetch leave requests:", error)
    throw new Error("Failed to fetch leave requests")
  }
}

export async function createLeaveRequest(data: z.infer<typeof leaveRequestSchema>, userId: string) {
  try {
    const validatedData = leaveRequestSchema.parse(data)

    // Calculate duration in days
    const startDate = new Date(validatedData.startDate)
    const endDate = new Date(validatedData.endDate)
    const durationInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1

    const request = await prisma.leaveRequest.create({
      data: {
        employeeId: validatedData.employeeId,
        requestedById: userId,
        type: validatedData.type,
        startDate,
        endDate,
        duration: durationInDays,
        reason: validatedData.reason,
      },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "CREATE",
      `Created leave request for ${request.employee.firstName} ${request.employee.lastName}`,
      "LEAVE",
      request.id,
    )

    // Notify HR managers
    const hrManagers = await prisma.user.findMany({
      where: {
        role: "HR",
      },
    })

    for (const manager of hrManagers) {
      await createNotification(
        manager.id,
        "New Leave Request",
        `${request.employee.firstName} ${request.employee.lastName} has requested ${durationInDays} days of ${validatedData.type.toLowerCase()} leave`,
        "INFO",
        `/attendance?tab=leave`,
      )
    }

    revalidatePath("/attendance")
    return request
  } catch (error) {
    console.error("Failed to create leave request:", error)
    throw new Error("Failed to create leave request")
  }
}

export async function updateLeaveRequest(id: string, data: z.infer<typeof leaveRequestSchema>, userId: string) {
  try {
    const validatedData = leaveRequestSchema.parse(data)

    // Calculate duration in days
    const startDate = new Date(validatedData.startDate)
    const endDate = new Date(validatedData.endDate)
    const durationInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1

    const request = await prisma.leaveRequest.update({
      where: { id },
      data: {
        type: validatedData.type,
        startDate,
        endDate,
        duration: durationInDays,
        reason: validatedData.reason,
      },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "UPDATE",
      `Updated leave request for ${request.employee.firstName} ${request.employee.lastName}`,
      "LEAVE",
      request.id,
    )

    revalidatePath("/attendance")
    return request
  } catch (error) {
    console.error("Failed to update leave request:", error)
    throw new Error("Failed to update leave request")
  }
}

export async function approveLeaveRequest(id: string, userId: string) {
  try {
    const request = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: "APPROVED",
        approvedById: userId,
        approvedAt: new Date(),
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userId: true,
          },
        },
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "UPDATE",
      `Approved leave request for ${request.employee.firstName} ${request.employee.lastName}`,
      "LEAVE",
      request.id,
    )

    // Notify the employee
    await createNotification(
      request.employee.userId,
      "Leave Request Approved",
      `Your request for ${request.duration} days of ${request.type.toLowerCase()} leave has been approved`,
      "SUCCESS",
      `/attendance?tab=leave`,
    )

    revalidatePath("/attendance")
    return request
  } catch (error) {
    console.error("Failed to approve leave request:", error)
    throw new Error("Failed to approve leave request")
  }
}

export async function rejectLeaveRequest(id: string, userId: string) {
  try {
    const request = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
        approvedById: userId,
        approvedAt: new Date(),
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userId: true,
          },
        },
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "UPDATE",
      `Rejected leave request for ${request.employee.firstName} ${request.employee.lastName}`,
      "LEAVE",
      request.id,
    )

    // Notify the employee
    await createNotification(
      request.employee.userId,
      "Leave Request Rejected",
      `Your request for ${request.duration} days of ${request.type.toLowerCase()} leave has been rejected`,
      "WARNING",
      `/attendance?tab=leave`,
    )

    revalidatePath("/attendance")
    return request
  } catch (error) {
    console.error("Failed to reject leave request:", error)
    throw new Error("Failed to reject leave request")
  }
}

export async function cancelLeaveRequest(id: string, userId: string) {
  try {
    const request = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: "CANCELLED",
      },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "UPDATE",
      `Cancelled leave request for ${request.employee.firstName} ${request.employee.lastName}`,
      "LEAVE",
      request.id,
    )

    revalidatePath("/attendance")
    return request
  } catch (error) {
    console.error("Failed to cancel leave request:", error)
    throw new Error("Failed to cancel leave request")
  }
}
