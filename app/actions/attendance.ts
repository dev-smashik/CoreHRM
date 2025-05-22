"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"

// Schema for attendance record creation/update
const attendanceSchema = z.object({
  employeeId: z.string(),
  date: z.string(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "ON_LEAVE", "HALF_DAY"]),
  notes: z.string().optional(),
})

export async function getAttendanceRecords(date?: string, employeeId?: string, status?: string) {
  try {
    const whereClause: any = {}

    if (date) {
      const selectedDate = new Date(date)
      const nextDay = new Date(selectedDate)
      nextDay.setDate(selectedDate.getDate() + 1)

      whereClause.date = {
        gte: selectedDate,
        lt: nextDay,
      }
    }

    if (employeeId) {
      whereClause.employeeId = employeeId
    }

    if (status) {
      whereClause.status = status
    }

    const records = await prisma.attendanceRecord.findMany({
      where: whereClause,
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
            department: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    })

    return records
  } catch (error) {
    console.error("Failed to fetch attendance records:", error)
    throw new Error("Failed to fetch attendance records")
  }
}

export async function createAttendanceRecord(data: z.infer<typeof attendanceSchema>, userId: string) {
  try {
    const validatedData = attendanceSchema.parse(data)

    const record = await prisma.attendanceRecord.create({
      data: {
        employeeId: validatedData.employeeId,
        date: new Date(validatedData.date),
        checkIn: validatedData.checkIn ? new Date(validatedData.checkIn) : null,
        checkOut: validatedData.checkOut ? new Date(validatedData.checkOut) : null,
        status: validatedData.status,
        notes: validatedData.notes,
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
      `Created attendance record for ${record.employee.firstName} ${record.employee.lastName}`,
      "ATTENDANCE",
      record.id,
    )

    revalidatePath("/attendance")
    return record
  } catch (error) {
    console.error("Failed to create attendance record:", error)
    throw new Error("Failed to create attendance record")
  }
}

export async function updateAttendanceRecord(id: string, data: z.infer<typeof attendanceSchema>, userId: string) {
  try {
    const validatedData = attendanceSchema.parse(data)

    const record = await prisma.attendanceRecord.update({
      where: { id },
      data: {
        date: new Date(validatedData.date),
        checkIn: validatedData.checkIn ? new Date(validatedData.checkIn) : null,
        checkOut: validatedData.checkOut ? new Date(validatedData.checkOut) : null,
        status: validatedData.status,
        notes: validatedData.notes,
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
      `Updated attendance record for ${record.employee.firstName} ${record.employee.lastName}`,
      "ATTENDANCE",
      record.id,
    )

    revalidatePath("/attendance")
    return record
  } catch (error) {
    console.error("Failed to update attendance record:", error)
    throw new Error("Failed to update attendance record")
  }
}

export async function deleteAttendanceRecord(id: string, userId: string) {
  try {
    const record = await prisma.attendanceRecord.delete({
      where: { id },
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
      "DELETE",
      `Deleted attendance record for ${record.employee.firstName} ${record.employee.lastName}`,
      "ATTENDANCE",
      record.id,
    )

    revalidatePath("/attendance")
    return record
  } catch (error) {
    console.error("Failed to delete attendance record:", error)
    throw new Error("Failed to delete attendance record")
  }
}

export async function checkInEmployee(employeeId: string, userId: string) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Check if there's already a record for today
    const existingRecord = await prisma.attendanceRecord.findFirst({
      where: {
        employeeId,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    })

    if (existingRecord) {
      // Update existing record
      const record = await prisma.attendanceRecord.update({
        where: { id: existingRecord.id },
        data: {
          checkIn: new Date(),
          status: "PRESENT",
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
        `Check-in recorded for ${record.employee.firstName} ${record.employee.lastName}`,
        "ATTENDANCE",
        record.id,
      )

      revalidatePath("/attendance")
      return record
    } else {
      // Create new record
      const record = await prisma.attendanceRecord.create({
        data: {
          employeeId,
          date: today,
          checkIn: new Date(),
          status: "PRESENT",
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
        `Check-in recorded for ${record.employee.firstName} ${record.employee.lastName}`,
        "ATTENDANCE",
        record.id,
      )

      revalidatePath("/attendance")
      return record
    }
  } catch (error) {
    console.error("Failed to check in employee:", error)
    throw new Error("Failed to check in employee")
  }
}

export async function checkOutEmployee(employeeId: string, userId: string) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Find today's record
    const existingRecord = await prisma.attendanceRecord.findFirst({
      where: {
        employeeId,
        date: {
          gte: today,
          lt: tomorrow,
        },
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

    if (!existingRecord) {
      throw new Error("No check-in record found for today")
    }

    // Update with check-out time
    const record = await prisma.attendanceRecord.update({
      where: { id: existingRecord.id },
      data: {
        checkOut: new Date(),
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
      `Check-out recorded for ${record.employee.firstName} ${record.employee.lastName}`,
      "ATTENDANCE",
      record.id,
    )

    revalidatePath("/attendance")
    return record
  } catch (error) {
    console.error("Failed to check out employee:", error)
    throw new Error("Failed to check out employee")
  }
}
