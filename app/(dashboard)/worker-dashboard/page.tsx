"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Clock, DollarSign, FileText, Upload, User } from "lucide-react"
import { useBidStore } from "@/lib/stores/bids"

export default function WorkerDashboardPage() {
  const { bids } = useBidStore()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Mock wallet connection - replace with actual wallet implementation
  useEffect(() => {
    setWalletAddress("0x123...") // Replace with real wallet address
  }, [])

  const workerBids = bids.filter(bid => bid.wallet === walletAddress)
  const approvedBids = workerBids.filter(bid => bid.status === 'approved')
  const pendingBids = workerBids.filter(bid => bid.status === 'pending')

  const stats = {
    activeTasks: approvedBids.length,
    completedTasks: 12, // Keep separate or add completion status
    earnings: approvedBids.reduce((sum, bid) => sum + bid.amount, 0),
    reputation: 4.8
  }

  return (
    <div className="flex flex-col w-full gap-6 max-w-full">
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
            <div className="text-2xl font-bold">{stats.activeTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bids</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBids.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.earnings}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reputation}/5</div>
            <p className="text-xs text-muted-foreground">Based on 15 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Tasks ({approvedBids.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval ({pendingBids.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed (12)</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {approvedBids.map((bid) => (
            <Card key={bid.id}>
              <CardHeader className="pb-2">
                <CardTitle>{bid.taskTitle}</CardTitle>
                <CardDescription>
                
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Approved
                    </Badge>
                    <Badge>Budget: ${bid.amount}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Work Proposal</Label>
                    <p className="text-sm text-muted-foreground">{bid.proposal}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Work Proof
                    </Button>
                    <Button variant="outline">
                      Request Extension
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingBids.map((bid) => (
            <Card key={bid.id}>
              <CardHeader className="pb-2">
                <CardTitle>{bid.taskTitle}</CardTitle>
                <CardDescription>
                  Submitted on {bid.timestamp.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm">Bid Amount: ${bid.amount}</p>
                    <p className="text-sm">Proposed Timeline: {bid.days} days</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Under Review
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
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
                        )}
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
    </div>
  )
}