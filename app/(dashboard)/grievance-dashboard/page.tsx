import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, User, ChevronRight } from "lucide-react"

export default function GrievanceDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Grievances</h1>
        <p className="text-muted-foreground">Track and manage your submitted issues</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active (4)</TabsTrigger>
          <TabsTrigger value="resolved">Resolved (12)</TabsTrigger>
          <TabsTrigger value="all">All Grievances</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pothole on Main Street</CardTitle>
              <CardDescription>Submitted 3 days ago • ID: GR-2023-0042</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge>Infrastructure</Badge>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-900"
                  >
                    In Progress
                  </Badge>
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-0 h-full w-0.5 bg-muted"></div>
                  <ol className="space-y-4">
                    <li className="relative pl-8">
                      <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Submitted</p>
                        <p className="text-xs text-muted-foreground">May 12, 2023 • 10:30 AM</p>
                      </div>
                    </li>
                    <li className="relative pl-8">
                      <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Under Review</p>
                        <p className="text-xs text-muted-foreground">May 13, 2023 • 2:15 PM</p>
                      </div>
                    </li>
                    <li className="relative pl-8">
                      <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Assigned</p>
                        <p className="text-xs text-muted-foreground">May 14, 2023 • 9:45 AM</p>
                      </div>
                    </li>
                    <li className="relative pl-8">
                      <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">In Progress</p>
                        <p className="text-xs text-muted-foreground">Estimated completion: May 18, 2023</p>
                      </div>
                    </li>
                    <li className="relative pl-8">
                      <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Completed</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 text-sm font-medium">Worker Details</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">John Contractor</p>
                      <p className="text-xs text-muted-foreground">Road Repair Specialist • 4.8/5 Rating</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 text-sm font-medium">Funding Allocation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Materials</p>
                      <p className="text-xs font-medium">$350</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Labor</p>
                      <p className="text-xs font-medium">$450</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Equipment</p>
                      <p className="text-xs font-medium">$200</p>
                    </div>
                    <div className="h-px bg-border my-2"></div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">Total</p>
                      <p className="text-xs font-medium">$1,000</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Add Comment
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Escalate Issue
                  </Button>
                  <Button variant="outline" size="sm">
                    View Similar Issues
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Broken Street Light</CardTitle>
              <CardDescription>Submitted 1 week ago • ID: GR-2023-0039</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge>Utilities</Badge>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                  >
                    Under Review
                  </Badge>
                </div>

                <Button variant="link" className="px-0">
                  View Details <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Illegal Dumping at River Park</CardTitle>
              <CardDescription>Submitted 2 weeks ago • ID: GR-2023-0035</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge>Environment</Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900"
                  >
                    Assigned
                  </Badge>
                </div>

                <Button variant="link" className="px-0">
                  View Details <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Grievances</CardTitle>
              <CardDescription>Issues that have been successfully addressed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {
                          [
                            "Sidewalk Repair",
                            "Traffic Light Malfunction",
                            "Fallen Tree Removal",
                            "Water Leak",
                            "Park Bench Repair",
                          ][i]
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Resolved on {["April 28", "April 15", "March 30", "March 22", "March 10"][i]}, 2023
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Grievances</CardTitle>
              <CardDescription>Complete history of your submitted issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Title</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Category</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="px-4 py-2 text-sm">GR-2023-00{42 - i}</td>
                          <td className="px-4 py-2 text-sm font-medium">
                            {
                              [
                                "Pothole on Main Street",
                                "Broken Street Light",
                                "Illegal Dumping at River Park",
                                "Graffiti on Community Center",
                                "Sidewalk Repair",
                                "Traffic Light Malfunction",
                                "Fallen Tree Removal",
                                "Water Leak",
                              ][i]
                            }
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {
                              [
                                "Infrastructure",
                                "Utilities",
                                "Environment",
                                "Public Property",
                                "Infrastructure",
                                "Utilities",
                                "Environment",
                                "Utilities",
                              ][i]
                            }
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {i < 4 ? (
                              <Badge
                                variant="outline"
                                className={
                                  [
                                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                                    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                                    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                                  ][i]
                                }
                              >
                                {["In Progress", "Under Review", "Assigned", "In Progress"][i]}
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              >
                                Resolved
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {
                              [
                                "May 12, 2023",
                                "May 5, 2023",
                                "May 1, 2023",
                                "April 25, 2023",
                                "April 28, 2023",
                                "April 15, 2023",
                                "March 30, 2023",
                                "March 22, 2023",
                              ][i]
                            }
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

