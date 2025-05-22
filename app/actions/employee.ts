"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"

// Schema for employee creation/update
const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  dateOfHire: z.string(),
  departmentId: z.string(),
  position: z.string(),
  status: z.enum(["ACTIVE", "ON_LEAVE", "TERMINATED", "SUSPENDED"]),
  emergencyContact: z.string().optional(),
  salary: z.number().optional(),
  managerId: z.string().optional(),
})

export async function getEmployees(query = "", departmentId = "") {
  try {
    const whereClause: any = {}

    if (query) {
      whereClause.OR = [
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { position: { contains: query, mode: "insensitive" } },
      ]
    }

    if (departmentId) {
      whereClause.departmentId = departmentId
    }

    const employees = await prisma.employee.findMany({
      where: whereClause,
      include: {
        department: true,
        manager: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        lastName: "asc",
      },
    })

    return employees
  } catch (error) {
    console.error("Failed to fetch employees:", error)
    throw new Error("Failed to fetch employees")
  }
}

export async function getEmployee(id: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        skills: {
          include: {
            skill: true,
          },
        },
        certifications: {
          include: {
            certification: true,
          },
        },
        careerPlans: true,
        attendanceRecords: {
          orderBy: {
            date: "desc",
          },
          take: 10,
        },
        leaveRequests: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
      },
    })

    return employee
  } catch (error) {
    console.error("Failed to fetch employee:", error)
    throw new Error("Failed to fetch employee")
  }
}

export async function createEmployee(data: z.infer<typeof employeeSchema>, userId: string) {
  try {
    const validatedData = employeeSchema.parse(data)

    // Generate a unique employee ID
    const employeeCount = await prisma.employee.count()
    const employeeId = `EMP${(employeeCount + 1).toString().padStart(5, "0")}`

    // Create the employee
    const employee = await prisma.employee.create({
      data: {
        employeeId,
        userId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        dateOfHire: new Date(validatedData.dateOfHire),
        departmentId: validatedData.departmentId,
        position: validatedData.position,
        status: validatedData.status,
        emergencyContact: validatedData.emergencyContact,
        salary: validatedData.salary,
        managerId: validatedData.managerId,
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "CREATE",
      `Created employee: ${employee.firstName} ${employee.lastName}`,
      "EMPLOYEE",
      employee.id,
    )

    revalidatePath("/employees")
    return employee
  } catch (error) {
    console.error("Failed to create employee:", error)
    throw new Error("Failed to create employee")
  }
}

export async function updateEmployee(id: string, data: z.infer<typeof employeeSchema>, userId: string) {
  try {
    const validatedData = employeeSchema.parse(data)

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        dateOfHire: new Date(validatedData.dateOfHire),
        departmentId: validatedData.departmentId,
        position: validatedData.position,
        status: validatedData.status,
        emergencyContact: validatedData.emergencyContact,
        salary: validatedData.salary,
        managerId: validatedData.managerId,
      },
    })

    // Create activity log
    await createActivity(
      userId,
      "UPDATE",
      `Updated employee: ${employee.firstName} ${employee.lastName}`,
      "EMPLOYEE",
      employee.id,
    )

    revalidatePath(`/employees/${id}`)
    revalidatePath("/employees")
    return employee
  } catch (error) {
    console.error("Failed to update employee:", error)
    throw new Error("Failed to update employee")
  }
}

export async function deleteEmployee(id: string, userId: string) {
  try {
    const employee = await prisma.employee.delete({
      where: { id },
    })

    // Create activity log
    await createActivity(
      userId,
      "DELETE",
      `Deleted employee: ${employee.firstName} ${employee.lastName}`,
      "EMPLOYEE",
      employee.id,
    )

    revalidatePath("/employees")
    return employee
  } catch (error) {
    console.error("Failed to delete employee:", error)
    throw new Error("Failed to delete employee")
  }
}
