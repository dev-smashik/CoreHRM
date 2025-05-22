"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"

// Schema for company settings
const companySettingsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().optional(),
  companyEmail: z.string().email("Invalid email address").optional(),
  companyPhone: z.string().optional(),
  companyWebsite: z.string().url("Invalid URL").optional(),
  fiscalYearStart: z.number().min(1).max(12),
  autoBackup: z.boolean(),
  twoFactorAuth: z.boolean(),
  auditLogs: z.boolean(),
  dataRetention: z.number().min(1),
  defaultLanguage: z.string(),
  dateFormat: z.string(),
  timeFormat: z.string(),
  timezone: z.string(),
  currency: z.string(),
  multiLanguage: z.boolean(),
})

export async function getCompanySettings() {
  try {
    // Get the first settings record or create default if none exists
    let settings = await prisma.companySettings.findFirst()

    if (!settings) {
      settings = await prisma.companySettings.create({
        data: {
          companyName: "Acme Inc.",
        },
      })
    }

    return settings
  } catch (error) {
    console.error("Failed to fetch company settings:", error)
    throw new Error("Failed to fetch company settings")
  }
}

export async function updateCompanySettings(data: z.infer<typeof companySettingsSchema>, userId: string) {
  try {
    const validatedData = companySettingsSchema.parse(data)

    // Get existing settings or create new
    const existingSettings = await prisma.companySettings.findFirst()

    let settings

    if (existingSettings) {
      settings = await prisma.companySettings.update({
        where: { id: existingSettings.id },
        data: validatedData,
      })
    } else {
      settings = await prisma.companySettings.create({
        data: validatedData,
      })
    }

    // Create activity log
    await createActivity(userId, "UPDATE", "Updated company settings", "SETTINGS", settings.id)

    revalidatePath("/settings")
    return settings
  } catch (error) {
    console.error("Failed to update company settings:", error)
    throw new Error("Failed to update company settings")
  }
}

// Schema for user creation
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["ADMIN", "MANAGER", "HR", "LIMITED"]),
  department: z.string().optional(),
  position: z.string().optional(),
})

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
        position: true,
        createdAt: true,
        employee: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return users
  } catch (error) {
    console.error("Failed to fetch users:", error)
    throw new Error("Failed to fetch users")
  }
}

export async function createUser(data: z.infer<typeof userSchema>, userId: string) {
  try {
    const validatedData = userSchema.parse(data)

    // Hash password
    const bcrypt = require("bcryptjs")
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        role: validatedData.role,
        department: validatedData.department,
        position: validatedData.position,
      },
    })

    // Create activity log
    await createActivity(userId, "CREATE", `Created user: ${user.name}`, "USER", user.id)

    revalidatePath("/settings")
    return user
  } catch (error) {
    console.error("Failed to create user:", error)
    throw new Error("Failed to create user")
  }
}

export async function updateUser(
  id: string,
  data: Omit<z.infer<typeof userSchema>, "password"> & { password?: string },
  userId: string,
) {
  try {
    const { password, ...otherData } = data

    // Prepare update data
    const updateData: any = { ...otherData }

    // If password is provided, hash it
    if (password && password.length > 0) {
      const bcrypt = require("bcryptjs")
      updateData.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    })

    // Create activity log
    await createActivity(userId, "UPDATE", `Updated user: ${user.name}`, "USER", user.id)

    revalidatePath("/settings")
    return user
  } catch (error) {
    console.error("Failed to update user:", error)
    throw new Error("Failed to update user")
  }
}

export async function deleteUser(id: string, userId: string) {
  try {
    const user = await prisma.user.delete({
      where: { id },
    })

    // Create activity log
    await createActivity(userId, "DELETE", `Deleted user: ${user.name}`, "USER", user.id)

    revalidatePath("/settings")
    return user
  } catch (error) {
    console.error("Failed to delete user:", error)
    throw new Error("Failed to delete user")
  }
}
