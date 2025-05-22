import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { reportType, filters } = body

    // Generate report data
    let data
    let headers

    switch (reportType) {
      case "employees":
        ;({ data, headers } = await generateEmployeeReport(filters))
        break
      case "attendance":
        ;({ data, headers } = await generateAttendanceReport(filters))
        break
      case "leave":
        ;({ data, headers } = await generateLeaveReport(filters))
        break
      case "training":
        ;({ data, headers } = await generateTrainingReport(filters))
        break
      default:
        return NextResponse.json({ error: "Invalid report type" }, { status: 400 })
    }

    // Create CSV
    const csvData = generateCsv(data, headers)

    // Log activity
    await createActivity(session.user.id, "EXPORT", `Exported ${reportType} report`, "REPORT", null)

    // Return CSV data
    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${reportType}_report_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}

async function generateEmployeeReport(filters: any) {
  const whereClause: any = {}

  if (filters?.departmentId) {
    whereClause.departmentId = filters.departmentId
  }

  if (filters?.status) {
    whereClause.status = filters.status
  }

  const employees = await prisma.employee.findMany({
    where: whereClause,
    include: {
      department: true,
    },
    orderBy: {
      lastName: "asc",
    },
  })

  const data = employees.map((emp) => ({
    id: emp.employeeId,
    firstName: emp.firstName,
    lastName: emp.lastName,
    email: emp.email,
    department: emp.department.name,
    position: emp.position,
    status: emp.status,
    hireDate: emp.dateOfHire.toISOString().split("T")[0],
  }))

  const headers = [
    { id: "id", title: "Employee ID" },
    { id: "firstName", title: "First Name" },
    { id: "lastName", title: "Last Name" },
    { id: "email", title: "Email" },
    { id: "department", title: "Department" },
    { id: "position", title: "Position" },
    { id: "status", title: "Status" },
    { id: "hireDate", title: "Hire Date" },
  ]

  return { data, headers }
}

async function generateAttendanceReport(filters: any) {
  const whereClause: any = {}

  if (filters?.startDate && filters?.endDate) {
    whereClause.date = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate),
    }
  }

  if (filters?.employeeId) {
    whereClause.employeeId = filters.employeeId
  }

  if (filters?.status) {
    whereClause.status = filters.status
  }

  const records = await prisma.attendanceRecord.findMany({
    where: whereClause,
    include: {
      employee: {
        select: {
          firstName: true,
          lastName: true,
          employeeId: true,
          department: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  })

  const data = records.map((record) => ({
    date: record.date.toISOString().split("T")[0],
    employeeId: record.employee.employeeId,
    name: `${record.employee.firstName} ${record.employee.lastName}`,
    department: record.employee.department.name,
    checkIn: record.checkIn ? record.checkIn.toISOString().split("T")[1].substring(0, 5) : "",
    checkOut: record.checkOut ? record.checkOut.toISOString().split("T")[1].substring(0, 5) : "",
    status: record.status,
    notes: record.notes || "",
  }))

  const headers = [
    { id: "date", title: "Date" },
    { id: "employeeId", title: "Employee ID" },
    { id: "name", title: "Employee Name" },
    { id: "department", title: "Department" },
    { id: "checkIn", title: "Check In" },
    { id: "checkOut", title: "Check Out" },
    { id: "status", title: "Status" },
    { id: "notes", title: "Notes" },
  ]

  return { data, headers }
}

async function generateLeaveReport(filters: any) {
  const whereClause: any = {}

  if (filters?.startDate && filters?.endDate) {
    whereClause.startDate = {
      gte: new Date(filters.startDate),
    }
    whereClause.endDate = {
      lte: new Date(filters.endDate),
    }
  }

  if (filters?.employeeId) {
    whereClause.employeeId = filters.employeeId
  }

  if (filters?.status) {
    whereClause.status = filters.status
  }

  if (filters?.type) {
    whereClause.type = filters.type
  }

  const requests = await prisma.leaveRequest.findMany({
    where: whereClause,
    include: {
      employee: {
        select: {
          firstName: true,
          lastName: true,
          employeeId: true,
          department: true,
        },
      },
      approvedBy: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      startDate: "desc",
    },
  })

  const data = requests.map((req) => ({
    employeeId: req.employee.employeeId,
    name: `${req.employee.firstName} ${req.employee.lastName}`,
    department: req.employee.department.name,
    type: req.type,
    startDate: req.startDate.toISOString().split("T")[0],
    endDate: req.endDate.toISOString().split("T")[0],
    duration: req.duration,
    status: req.status,
    approvedBy: req.approvedBy?.name || "",
    reason: req.reason || "",
  }))

  const headers = [
    { id: "employeeId", title: "Employee ID" },
    { id: "name", title: "Employee Name" },
    { id: "department", title: "Department" },
    { id: "type", title: "Leave Type" },
    { id: "startDate", title: "Start Date" },
    { id: "endDate", title: "End Date" },
    { id: "duration", title: "Duration (Days)" },
    { id: "status", title: "Status" },
    { id: "approvedBy", title: "Approved By" },
    { id: "reason", title: "Reason" },
  ]

  return { data, headers }
}

async function generateTrainingReport(filters: any) {
  const whereClause: any = {}

  if (filters?.trainingId) {
    whereClause.trainingId = filters.trainingId
  }

  const statuses = await prisma.trainingStatus.findMany({
    where: whereClause,
    include: {
      training: true,
      user: {
        select: {
          name: true,
          email: true,
          employee: {
            select: {
              employeeId: true,
              department: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  const data = statuses.map((status) => ({
    trainingTitle: status.training.title,
    trainingType: status.training.type,
    employeeId: status.user.employee?.employeeId || "",
    name: status.user.name,
    email: status.user.email,
    department: status.user.employee?.department.name || "",
    status: status.status,
    progress: `${status.progress}%`,
    startDate: status.startedAt ? status.startedAt.toISOString().split("T")[0] : "",
    completionDate: status.completedAt ? status.completedAt.toISOString().split("T")[0] : "",
    score: status.score || "",
  }))

  const headers = [
    { id: "trainingTitle", title: "Training Title" },
    { id: "trainingType", title: "Training Type" },
    { id: "employeeId", title: "Employee ID" },
    { id: "name", title: "Employee Name" },
    { id: "email", title: "Email" },
    { id: "department", title: "Department" },
    { id: "status", title: "Status" },
    { id: "progress", title: "Progress" },
    { id: "startDate", title: "Start Date" },
    { id: "completionDate", title: "Completion Date" },
    { id: "score", title: "Score" },
  ]

  return { data, headers }
}

function generateCsv(data: any[], headers: { id: string; title: string }[]) {
  // Convert data to CSV string
  const headerRow = headers.map((h) => h.title).join(",")
  const rows = data.map((row) => {
    return headers
      .map((header) => {
        const value = row[header.id]
        // Handle values with commas by wrapping in quotes
        return typeof value === "string" && value.includes(",") ? `"${value}"` : value
      })
      .join(",")
  })

  return [headerRow, ...rows].join("\n")
}
