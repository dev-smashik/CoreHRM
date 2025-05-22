"use server"

import prisma from "@/lib/prisma"
import { createActivity } from "@/app/actions/activity"

export async function getDepartmentHeadcount() {
  try {
    const departments = await prisma.department.findMany({
      include: {
        _count: {
          select: {
            employees: true,
          },
        },
      },
    })

    return departments.map((dept) => ({
      name: dept.name,
      total: dept._count.employees,
    }))
  } catch (error) {
    console.error("Failed to fetch department headcount:", error)
    throw new Error("Failed to fetch department headcount")
  }
}

export async function getEmployeePerformance() {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        performanceScore: {
          not: null,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        department: {
          select: {
            name: true,
          },
        },
        performanceScore: true,
      },
      orderBy: {
        performanceScore: "desc",
      },
      take: 10,
    })

    return employees
  } catch (error) {
    console.error("Failed to fetch employee performance:", error)
    throw new Error("Failed to fetch employee performance")
  }
}

export async function getTrainingCompletion() {
  try {
    // Get all required trainings
    const requiredTrainings = await prisma.training.findMany({
      where: {
        isRequired: true,
      },
      include: {
        _count: {
          select: {
            status: true,
          },
        },
        status: {
          where: {
            status: "COMPLETED",
          },
        },
      },
    })

    // Get total employee count
    const employeeCount = await prisma.employee.count({
      where: {
        status: "ACTIVE",
      },
    })

    // Calculate completion rates
    const trainingCompletionRates = requiredTrainings.map((training) => {
      const completedCount = training.status.length
      const completionRate = employeeCount > 0 ? (completedCount / employeeCount) * 100 : 0

      return {
        id: training.id,
        title: training.title,
        completionRate: Math.round(completionRate),
        completedCount,
        totalEmployees: employeeCount,
      }
    })

    return trainingCompletionRates
  } catch (error) {
    console.error("Failed to fetch training completion:", error)
    throw new Error("Failed to fetch training completion")
  }
}

export async function getAttendanceStats(startDate: string, endDate: string) {
  try {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const attendanceRecords = await prisma.attendanceRecord.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      include: {
        employee: {
          select: {
            department: true,
          },
        },
      },
    })

    // Group by status
    const statusCounts = attendanceRecords.reduce(
      (acc, record) => {
        acc[record.status] = (acc[record.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Group by department
    const departmentCounts = attendanceRecords.reduce(
      (acc, record) => {
        const deptName = record.employee.department.name
        acc[deptName] = acc[deptName] || {}
        acc[deptName][record.status] = (acc[deptName][record.status] || 0) + 1
        return acc
      },
      {} as Record<string, Record<string, number>>,
    )

    return {
      statusCounts,
      departmentCounts,
      totalRecords: attendanceRecords.length,
    }
  } catch (error) {
    console.error("Failed to fetch attendance stats:", error)
    throw new Error("Failed to fetch attendance stats")
  }
}

export async function getLeaveStats(year: number) {
  try {
    const startDate = new Date(year, 0, 1) // January 1st of the year
    const endDate = new Date(year, 11, 31) // December 31st of the year

    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        startDate: {
          gte: startDate,
        },
        endDate: {
          lte: endDate,
        },
        status: "APPROVED",
      },
      include: {
        employee: {
          select: {
            department: true,
          },
        },
      },
    })

    // Group by leave type
    const typeCounts = leaveRequests.reduce(
      (acc, request) => {
        acc[request.type] = (acc[request.type] || 0) + request.duration
        return acc
      },
      {} as Record<string, number>,
    )

    // Group by month
    const monthlyData = Array(12)
      .fill(0)
      .map((_, i) => {
        const monthLeaves = leaveRequests.filter((req) => {
          const reqMonth = new Date(req.startDate).getMonth()
          return reqMonth === i
        })

        return {
          month: i + 1,
          count: monthLeaves.length,
          days: monthLeaves.reduce((sum, req) => sum + req.duration, 0),
        }
      })

    return {
      typeCounts,
      monthlyData,
      totalRequests: leaveRequests.length,
      totalDays: leaveRequests.reduce((sum, req) => sum + req.duration, 0),
    }
  } catch (error) {
    console.error("Failed to fetch leave stats:", error)
    throw new Error("Failed to fetch leave stats")
  }
}

export async function generateCustomReport(reportType: string, filters: any, userId: string) {
  try {
    // Log the report generation
    await createActivity(userId, "REPORT", `Generated custom report: ${reportType}`, "REPORT", null)

    // Different report types
    switch (reportType) {
      case "turnover":
        return await generateTurnoverReport(filters)
      case "skills":
        return await generateSkillsReport(filters)
      case "compensation":
        return await generateCompensationReport(filters)
      case "training":
        return await generateTrainingReport(filters)
      default:
        throw new Error("Invalid report type")
    }
  } catch (error) {
    console.error("Failed to generate custom report:", error)
    throw new Error("Failed to generate custom report")
  }
}

async function generateTurnoverReport(filters: any) {
  // Implementation for turnover report
  const { departmentId, startDate, endDate } = filters

  const whereClause: any = {
    status: "TERMINATED",
  }

  if (departmentId) {
    whereClause.departmentId = departmentId
  }

  if (startDate && endDate) {
    whereClause.updatedAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    }
  }

  const terminatedEmployees = await prisma.employee.findMany({
    where: whereClause,
    include: {
      department: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  // Get total employee count for turnover rate calculation
  const totalEmployees = await prisma.employee.count()

  return {
    terminatedEmployees,
    totalEmployees,
    turnoverRate: totalEmployees > 0 ? (terminatedEmployees.length / totalEmployees) * 100 : 0,
  }
}

async function generateSkillsReport(filters: any) {
  // Implementation for skills gap report
  const { departmentId, skillCategory } = filters

  const whereClause: any = {}

  if (skillCategory) {
    whereClause.category = skillCategory
  }

  const skills = await prisma.skill.findMany({
    where: whereClause,
    include: {
      employees: {
        include: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              departmentId: true,
              department: true,
            },
          },
        },
        where: departmentId
          ? {
              employee: {
                departmentId,
              },
            }
          : undefined,
      },
    },
  })

  // Calculate average proficiency for each skill
  const skillsWithStats = skills.map((skill) => {
    const totalProficiency = skill.employees.reduce((sum, emp) => sum + emp.proficiency, 0)
    const avgProficiency = skill.employees.length > 0 ? totalProficiency / skill.employees.length : 0

    return {
      id: skill.id,
      name: skill.name,
      category: skill.category,
      employeeCount: skill.employees.length,
      averageProficiency: Math.round(avgProficiency),
      employees: skill.employees.map((emp) => ({
        id: emp.employee.id,
        name: `${emp.employee.firstName} ${emp.employee.lastName}`,
        department: emp.employee.department.name,
        proficiency: emp.proficiency,
      })),
    }
  })

  return {
    skills: skillsWithStats,
    totalSkills: skills.length,
  }
}

async function generateCompensationReport(filters: any) {
  // Implementation for compensation analysis report
  const { departmentId, position } = filters

  const whereClause: any = {
    salary: {
      not: null,
    },
  }

  if (departmentId) {
    whereClause.departmentId = departmentId
  }

  if (position) {
    whereClause.position = position
  }

  const employees = await prisma.employee.findMany({
    where: whereClause,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      position: true,
      salary: true,
      department: true,
    },
    orderBy: {
      salary: "desc",
    },
  })

  // Calculate statistics
  const salaries = employees.map((emp) => emp.salary as number)
  const totalSalary = salaries.reduce((sum, salary) => sum + salary, 0)
  const avgSalary = salaries.length > 0 ? totalSalary / salaries.length : 0

  // Group by department
  const departmentStats = employees.reduce(
    (acc, emp) => {
      const deptName = emp.department.name
      acc[deptName] = acc[deptName] || { count: 0, total: 0, avg: 0 }
      acc[deptName].count += 1
      acc[deptName].total += emp.salary as number
      acc[deptName].avg = acc[deptName].total / acc[deptName].count
      return acc
    },
    {} as Record<string, { count: number; total: number; avg: number }>,
  )

  // Group by position
  const positionStats = employees.reduce(
    (acc, emp) => {
      acc[emp.position] = acc[emp.position] || { count: 0, total: 0, avg: 0 }
      acc[emp.position].count += 1
      acc[emp.position].total += emp.salary as number
      acc[emp.position].avg = acc[emp.position].total / acc[emp.position].count
      return acc
    },
    {} as Record<string, { count: number; total: number; avg: number }>,
  )

  return {
    employees,
    totalEmployees: employees.length,
    averageSalary: avgSalary,
    departmentStats,
    positionStats,
  }
}

async function generateTrainingReport(filters: any) {
  // Implementation for training ROI report
  const { trainingId, departmentId } = filters

  const whereClause: any = {}

  if (trainingId) {
    whereClause.id = trainingId
  }

  const trainings = await prisma.training.findMany({
    where: whereClause,
    include: {
      status: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              employee: {
                select: {
                  id: true,
                  departmentId: true,
                  department: true,
                  performanceScore: true,
                },
              },
            },
          },
        },
        where: departmentId
          ? {
              user: {
                employee: {
                  departmentId,
                },
              },
            }
          : undefined,
      },
    },
  })

  // Calculate completion rates and other stats
  const trainingStats = trainings.map((training) => {
    const totalAssigned = training.status.length
    const completed = training.status.filter((s) => s.status === "COMPLETED").length
    const completionRate = totalAssigned > 0 ? (completed / totalAssigned) * 100 : 0

    // Calculate average performance score before and after training
    // This is a simplified approach - in a real system you'd need before/after measurements
    const employeesWithScores = training.status
      .filter((s) => s.status === "COMPLETED" && s.user.employee?.performanceScore !== null)
      .map((s) => ({
        id: s.user.employee?.id,
        name: s.user.name,
        department: s.user.employee?.department.name,
        performanceScore: s.user.employee?.performanceScore,
      }))

    return {
      id: training.id,
      title: training.title,
      type: training.type,
      totalAssigned,
      completed,
      completionRate: Math.round(completionRate),
      employeesWithScores,
    }
  })

  return {
    trainings: trainingStats,
    totalTrainings: trainings.length,
  }
}
