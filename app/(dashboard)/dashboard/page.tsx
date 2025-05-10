import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertCircle, BarChart3, CheckCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Grievances</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Votes</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Active voting sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="nearby">Nearby Issues</TabsTrigger>
          <TabsTrigger value="votes">Active Votes</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Pothole on Main Street</p>
                  <p className="text-sm text-muted-foreground">You submitted a new grievance</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />2 days ago
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Broken Street Light</p>
                  <p className="text-sm text-muted-foreground">Issue marked as resolved</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />1 week ago
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Park Renovation Project</p>
                  <p className="text-sm text-muted-foreground">You voted on funding allocation</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />2 weeks ago
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nearby" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Issues</CardTitle>
              <CardDescription>Issues reported in your neighborhood</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Fallen Tree on Oak Street</p>
                  <p className="text-sm text-muted-foreground">0.5 miles away • High Priority</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Water Main Break</p>
                  <p className="text-sm text-muted-foreground">0.8 miles away • Critical Priority</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Graffiti on Community Center</p>
                  <p className="text-sm text-muted-foreground">1.2 miles away • Medium Priority</p>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="votes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Votes</CardTitle>
              <CardDescription>Ongoing voting sessions you can participate in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Park Renovation Funding</p>
                  <p className="text-sm text-muted-foreground">Ends in 3 days • 245 participants</p>
                </div>
                <Button size="sm">Vote Now</Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Road Repair Prioritization</p>
                  <p className="text-sm text-muted-foreground">Ends in 5 days • 178 participants</p>
                </div>
                <Button size="sm">Vote Now</Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Community Center Programs</p>
                  <p className="text-sm text-muted-foreground">Ends in 1 week • 312 participants</p>
                </div>
                <Button size="sm">Vote Now</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/submit-grievance">
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Submit Grievance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Report a new issue in your community</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/voting">
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Participate in Voting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Help prioritize community issues</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/grievance-dashboard">
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Track Grievances</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View status of your reported issues</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/profile">
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Update Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage your account settings</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

