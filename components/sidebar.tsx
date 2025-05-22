"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Calendar,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            <span>HR Dashboard</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/employees"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/employees" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Users className="h-4 w-4" />
              Employees
            </Link>
            <Link
              href="/attendance"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/attendance" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Calendar className="h-4 w-4" />
              Time & Attendance
            </Link>
            <Link
              href="/development"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/development" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <GraduationCap className="h-4 w-4" />
              Professional Development
            </Link>
            <Link
              href="/templates"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/templates" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <FileText className="h-4 w-4" />
              Templates
            </Link>
            <Link
              href="/documents"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/documents" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <FolderKanban className="h-4 w-4" />
              Document Management
            </Link>
            <Link
              href="/reports"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/reports" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <BarChart className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === "/settings" ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}
