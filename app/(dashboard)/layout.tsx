"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertCircle,
  BarChart3,
  ChevronDown,
  Home,
  LogOut,
  Settings,
  User,
  Wallet,
  Briefcase,
  Award,
  Vote,
  Building,
  DollarSign,
  ShieldAlert,
  Scale,
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<"citizen" | "worker" | "dao" | "admin">("citizen")

  const handleRoleChange = (role: "citizen" | "worker" | "dao" | "admin") => {
    setUserRole(role)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="fixed inset-y-0 left-0 z-40 w-64">
          <Sidebar className="h-full flex flex-col">
            <SidebarHeader className="border-b px-6 py-3">
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="font-bold">CivicPlatform</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="flex-grow overflow-y-auto">
              {/* Citizen Navigation */}
              {userRole === "citizen" && (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                      <Link href="/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/submit-grievance"}>
                      <Link href="/submit-grievance">
                        <AlertCircle className="h-4 w-4" />
                        <span>Submit Grievance</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/grievance-dashboard"}>
                      <Link href="/grievance-dashboard">
                        <BarChart3 className="h-4 w-4" />
                        <span>My Grievances</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/voting"}>
                      <Link href="/voting">
                        <Vote className="h-4 w-4" />
                        <span>Voting & Governance</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                      <Link href="/profile">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}

              {/* Worker Navigation */}
              {userRole === "worker" && (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/task-marketplace"}>
                      <Link href="/task-marketplace">
                        <Briefcase className="h-4 w-4" />
                        <span>Task Marketplace</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/worker-dashboard"}>
                      <Link href="/worker-dashboard">
                        <BarChart3 className="h-4 w-4" />
                        <span>Worker Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/reputation"}>
                      <Link href="/reputation">
                        <Award className="h-4 w-4" />
                        <span>Reputation Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}

              {/* DAO Member Navigation */}
              {userRole === "dao" && (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/governance-dashboard"}>
                      <Link href="/governance-dashboard">
                        <Building className="h-4 w-4" />
                        <span>Governance Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dao-bids"}>
                      <Link href="/dao-bids">
                        <DollarSign className="h-4 w-4" />
                        <span>Bids</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}

              {/* Admin Navigation */}
              
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex flex-col gap-2">
                {/* Role Switcher (for demo purposes) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleRoleChange("citizen")}>Citizen</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange("worker")}>Worker</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange("dao")}>DAO Member</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
          </Sidebar>
        </div>

        {/* Content area */}
        <div className="flex flex-col w-full ml-64">
          {/* Fixed Header */}
          <header className="fixed top-0 right-0 z-30 h-16 w-[calc(100%-16rem)] flex items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Wallet className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          {/* Scrollable Content Area */}
          <main className="pt-16 h-screen overflow-y-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}