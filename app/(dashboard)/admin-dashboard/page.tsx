import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShieldAlert,
  AlertTriangle,
  Users,
  CheckCircle,
  Ban,
  Clock,
  UserCheck,
  Search,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  FileText,
} from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage platform operations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,238</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center gap-1 text-xs text-red-500">
              <ArrowUpRight className="h-3 w-3" />
              <span>+8% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3" />
              <span>+4% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center gap-1 text-xs text-red-500">
              <ArrowDownRight className="h-3 w-3" />
              <span>-25% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Health Overview</CardTitle>
          <CardDescription>Real-time metrics of platform performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">System Uptime</h3>
                <span className="text-sm font-medium text-green-500">99.8%</span>
              </div>
              <Progress value={99.8} className="h-2" />
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">API Response Time</h3>
                <span className="text-sm font-medium">245ms</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">Avg. over 24 hours</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Error Rate</h3>
                <span className="text-sm font-medium text-green-500">0.12%</span>
              </div>
              <Progress value={0.12} max={5} className="h-2" />
              <p className="text-xs text-muted-foreground">Across all requests</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="reports">Content Reports</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Administration</CardTitle>
              <CardDescription>Manage accounts and user permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="User Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="citizen">Citizens</SelectItem>
                      <SelectItem value="worker">Workers</SelectItem>
                      <SelectItem value="dao">DAO Members</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium">User</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Joined</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Jane Doe",
                        email: "jane.doe@example.com",
                        type: "Citizen",
                        status: "Active",
                        joined: "Jan 15, 2023",
                        verified: true,
                      },
                      {
                        name: "John Contractor",
                        email: "john.contractor@example.com",
                        type: "Worker",
                        status: "Active",
                        joined: "Feb 3, 2023",
                        verified: true,
                      },
                      {
                        name: "Robert Brown",
                        email: "robert.brown@example.com",
                        type: "DAO Member",
                        status: "Active",
                        joined: "Mar 10, 2023",
                        verified: true,
                      },
                      {
                        name: "Sarah Miller",
                        email: "sarah.miller@example.com",
                        type: "Citizen",
                        status: "Suspended",
                        joined: "Apr 22, 2023",
                        verified: false,
                      },
                      {
                        name: "Tom Martin",
                        email: "tom.martin@example.com",
                        type: "Worker",
                        status: "Pending",
                        joined: "May 8, 2023",
                        verified: false,
                      },
                    ].map((user, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{user.name}</span>
                              {user.verified && (
                                <div className="flex items-center gap-1">
                                  <UserCheck className="h-3 w-3 text-green-500" />
                                  <span className="text-xs text-muted-foreground">Verified</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm">{user.email}</td>
                        <td className="px-4 py-2 text-sm">{user.type}</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge
                            variant="outline"
                            className={
                              user.status === "Active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : user.status === "Suspended"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-sm">{user.joined}</td>
                        <td className="px-4 py-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            {user.status === "Active" ? (
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                <Ban className="h-4 w-4" />
                              </Button>
                            ) : user.status === "Suspended" ? (
                              <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-600">
                                Approve
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">Showing 5 of 5,238 users</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Reports</CardTitle>
              <CardDescription>Review and moderate reported content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Grievance",
                    title: "Offensive language in pothole report",
                    reporter: "Sarah Miller",
                    reportedUser: "Anonymous User",
                    date: "May 10, 2023",
                    status: "Pending",
                    priority: "Medium",
                  },
                  {
                    type: "Comment",
                    title: "Harassment in public discussion",
                    reporter: "John Doe",
                    reportedUser: "Tom Wilson",
                    date: "May 9, 2023",
                    status: "Under Review",
                    priority: "High",
                  },
                  {
                    type: "Profile",
                    title: "Fake contractor credentials",
                    reporter: "Building Department",
                    reportedUser: "James Smith",
                    date: "May 8, 2023",
                    status: "Under Review",
                    priority: "High",
                  },
                  {
                    type: "Grievance",
                    title: "Duplicate report submission",
                    reporter: "System",
                    reportedUser: "Karen Jones",
                    date: "May 7, 2023",
                    status: "Resolved",
                    priority: "Low",
                  },
                ].map((report, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge>{report.type}</Badge>
                          <Badge
                            variant="outline"
                            className={
                              report.priority === "High"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : report.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            }
                          >
                            {report.priority} Priority
                          </Badge>
                        </div>
                        <h3 className="mt-1 font-medium">{report.title}</h3>
                        <div className="mt-1 text-sm text-muted-foreground">
                          <span>Reported by: {report.reporter}</span>
                          <span className="mx-2">•</span>
                          <span>User: {report.reportedUser}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{report.date}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            report.status === "Resolved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : report.status === "Under Review"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }
                        >
                          {report.status}
                        </Badge>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Monitor financial activities on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="project">Project Funding</SelectItem>
                      <SelectItem value="worker">Worker Payment</SelectItem>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Description</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm font-medium">TXN-{2023050000 + i + 1}</td>
                        <td className="px-4 py-2 text-sm">
                          {
                            [
                              "Main Street Repaving - Phase 1",
                              "Worker Payment - John Contractor",
                              "Community Center Renovation Fund",
                              "Emergency Fund Allocation",
                              "Worker Payment - Sarah Plumber",
                            ][i]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm font-medium">
                          ${[120000, 4500, 75000, 25000, 3200][i].toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {["Project", "Payment", "Project", "Allocation", "Payment"][i]}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {["May 12, 2023", "May 11, 2023", "May 10, 2023", "May 9, 2023", "May 8, 2023"][i]}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <Badge
                            variant="outline"
                            className={
                              i === 2
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            }
                          >
                            {i === 2 ? "Pending" : "Completed"}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">Showing 5 of 248 transactions</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Track system events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-1 items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Log Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Component" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Components</SelectItem>
                      <SelectItem value="auth">Authentication</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="db">Database</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
              </div>

              <div className="space-y-2">
                {[
                  {
                    level: "Error",
                    component: "API",
                    message: "Rate limit exceeded for IP 192.168.1.54",
                    timestamp: "2023-05-12 15:42:33",
                  },
                  {
                    level: "Warning",
                    component: "Authentication",
                    message: "Multiple failed login attempts for user ID 4582",
                    timestamp: "2023-05-12 14:37:22",
                  },
                  {
                    level: "Info",
                    component: "Database",
                    message: "Scheduled backup completed successfully",
                    timestamp: "2023-05-12 14:00:00",
                  },
                  {
                    level: "Error",
                    component: "Blockchain",
                    message: "Transaction verification failed: Invalid signature",
                    timestamp: "2023-05-12 13:45:17",
                  },
                  {
                    level: "Info",
                    component: "API",
                    message: "New API key generated for organization ID 3245",
                    timestamp: "2023-05-12 13:30:55",
                  },
                  {
                    level: "Critical",
                    component: "Database",
                    message: "Connection pool exhausted - performance degradation",
                    timestamp: "2023-05-12 13:15:02",
                  },
                  {
                    level: "Warning",
                    component: "Frontend",
                    message: "Asset loading failed: CDN unreachable",
                    timestamp: "2023-05-12 12:52:40",
                  },
                  {
                    level: "Info",
                    component: "Authentication",
                    message: "User roles updated for administrative group",
                    timestamp: "2023-05-12 12:30:18",
                  },
                ].map((log, i) => (
                  <div key={i} className="rounded-md border px-4 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      {log.level === "Error" || log.level === "Critical" ? (
                        <AlertCircle
                          className={`h-4 w-4 ${log.level === "Critical" ? "text-red-500" : "text-red-400"}`}
                        />
                      ) : log.level === "Warning" ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span
                        className={`font-medium ${
                          log.level === "Critical"
                            ? "text-red-500"
                            : log.level === "Error"
                              ? "text-red-400"
                              : log.level === "Warning"
                                ? "text-yellow-500"
                                : "text-green-500"
                        }`}
                      >
                        {log.level}
                      </span>
                      <span className="text-muted-foreground">[{log.component}]</span>
                      <span className="flex-1">{log.message}</span>
                      <span className="text-muted-foreground">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline">Load More Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

