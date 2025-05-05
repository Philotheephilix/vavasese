import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, DollarSign, FileText, Upload, User } from "lucide-react"

export default function WorkerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Worker Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your assigned tasks and submissions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Tasks in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              Based on 15 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Tasks (3)</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval (2)</TabsTrigger>
          <TabsTrigger value="completed">Completed (12)</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pothole Repair on Main Street</CardTitle>
              <CardDescription>
                Assigned 2 days ago • Due in 3 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge>Infrastructure</Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-900">
                    In Progress
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 text-sm font-medium">Milestone Checklist</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="milestone-1" className="h-4 w-4" checked disabled />
                      <Label htmlFor="milestone-1" className="text-sm">Initial assessment completed</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="milestone-2" className="h-4 w-4" checked disabled />
                      <Label htmlFor="milestone-2" className="text-sm">Materials acquired</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="milestone-3" className="h-4 w-4" checked disabled />
                      <Label htmlFor="milestone-3" className="text-sm">Area prepared for repair</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="milestone-4" className="h-4 w-4" />
                      <Label htmlFor="milestone-4" className="text-sm">Pothole filled and patched</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="milestone-5" className="h-4 w-4" />
                      <Label htmlFor="milestone-5" className="text-sm">Final inspection and cleanup</Label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 text-sm font-medium">Task Details</h4>
                  <p className="text-sm text-muted-foreground">
                    Large pothole approximately 2 feet wide causing traffic hazards and potential vehicle damage. Requires filling and patching with asphalt.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm">123 Main St, Anytown</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment</p>
                      <p className="text-sm">$450</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-sm">May 20, 2023</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button className="gap-1">
                    <Upload className="h-4 w-4" />
                    Submit Proof
                  </Button>
                  <Button variant="outline">
                    Request Extension
                  </Button>
                  <Button variant="outline">
                    Contact Citizen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Street Light Replacement</CardTitle>
              <CardDescription>
                Assigned 3 days ago • Due in 5 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge>Utilities</Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-900">
                    In Progress
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <Button variant="link" className="px-0">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Graffiti Removal at Community Center</CardTitle>
              <CardDescription>
                Assigned 1 week ago • Due in 1 week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge>Public Property</Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-900">
                    In Progress
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <Button variant="link" className="px-0">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>
                Tasks awaiting client verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Fallen Tree Removal
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Completed on May 14, 2023 • Awaiting verification
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Pending
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Park Bench Repair
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Completed on May 10, 2023 • Awaiting verification
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Pending
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>
                Tasks you have successfully completed
              </CardDescription>
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
                        {["Sidewalk Repair", "Traffic Light Maintenance", "Playground Equipment Repair", "Water Leak Fix", "Tree Trimming"][i]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Completed on {["April 28", "April 15", "March 30", "March 22", "March 10"][i]}, 2023
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">${[350, 400, 250, 300, 275][i]}</div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
          <CardDescription>
            Track your earnings and payment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left text-sm font-medium">Task</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="px-4 py-2 text-sm font-medium">
                        {["Fallen Tree Removal", "Park Bench Repair", "Sidewalk Repair", "Traffic Light Maintenance", "Playground Equipment Repair"][i]}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        ${[600, 200, 350, 400, 250][i]}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {i < 2 ? (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Paid
                          </Badge>
                        )}\

</td>
                      <td className="px-4 py-2 text-sm">
                        {["May 14, 2023", "May 10, 2023", "April 28, 2023", "April 15, 2023", "March 30, 2023"][i]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total Pending: $800
              </p>
              <p className="text-sm text-muted-foreground">
                Total Paid: $1,250
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reputation & Reviews</CardTitle>
          <CardDescription>
            Feedback from clients and your reputation score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">4.8/5 Reputation Score</p>
                <p className="text-sm text-muted-foreground">
                  Based on 15 reviews
                </p>
              </div>
              <Button variant="outline">View All Reviews</Button>
            </div>

            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {["John Doe", "Jane Smith", "Alice Johnson"][i]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {["Fallen Tree Removal", "Park Bench Repair", "Sidewalk Repair"][i]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        5/5
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {[
                      "Great work! The tree was removed quickly and safely.",
                      "The bench looks brand new. Thank you!",
                      "The sidewalk repair was done perfectly.",
                    ][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}