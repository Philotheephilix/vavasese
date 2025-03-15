"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Scale,
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  Calendar,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Building,
  Briefcase,
  TimerReset,
  Shield,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function DisputeResolutionPage() {
  const [selectedDispute, setSelectedDispute] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDisputeClick = (id: number) => {
    setSelectedDispute(id)
    setDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dispute Resolution</h1>
        <p className="text-muted-foreground">Mediate conflicts and resolve disputes between platform users</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 days</div>
            <p className="text-xs text-muted-foreground">
              From filing to resolution
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8%</div>
            <p className="text-xs text-muted-foreground">
              Requiring DAO intervention
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical Dispute</AlertTitle>
        <AlertDescription>
          The worker compensation dispute between City Public Works and John Contractor requires immediate attention.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Disputes (12)</TabsTrigger>
          <TabsTrigger value="pending">Pending Resolution (5)</TabsTrigger>
          <TabsTrigger value="resolved">Resolved (42)</TabsTrigger>
          <TabsTrigger value="escalated">Escalated (4)</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Disputes</CardTitle>
              <CardDescription>Disputes requiring investigation and resolution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Worker Compensation Dispute",
                    description: "Dispute over payment for completed work on Main Street repaving project",
                    party1: { name: "City Public Works", type: "Client" },
                    party2: { name: "John Contractor", type: "Worker" },
                    amount: 4500,
                    filed: "May 10, 2023",
                    priority: "Critical",
                    status: "In Progress"
                  },
                  {
                    id: 2,
                    title: "Work Quality Dispute",
                    description: "Disagreement about the quality of completed street light installation",
                    party1: { name: "Sarah Miller", type: "Citizen" },
                    party2: { name: "ElectraTech Services", type: "Worker" },
                    amount: 350,
                    filed: "May 8, 2023",
                    priority: "High",
                    status: "Under Investigation"
                  }
                ].map((dispute) => (
                  <div key={dispute.id} className="rounded-lg border cursor-pointer hover:bg-muted/50 transition" onClick={() => handleDisputeClick(dispute.id)}>
                    <div className="p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                dispute.priority === "Critical"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : dispute.priority === "High"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                                  : dispute.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }
                            >
                              {dispute.priority} Priority
                            </Badge>
                            <Badge>
                              {dispute.status}
                            </Badge>
                          </div>
                          <h3 className="mt-1 font-medium">{dispute.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{dispute.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {dispute.party1.type === "Client" ? (
                                <Building className="h-5 w-5 text-primary" />
                              ) : (
                                <Users className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{dispute.party1.type}</span>
                          </div>
                          <div className="text-muted-foreground">vs</div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {dispute.party2.type === "Worker" ? (
                                <Briefcase className="h-5 w-5 text-primary" />
                              ) : (
                                <Users className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{dispute.party2.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Filed: {dispute.filed}</span>
                          </div>
                          {dispute.amount > 0 && (
                            <div className="flex items-center gap-1">
                              <Scale className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Amount: ${dispute.amount}</span>
                            </div>
                          )}
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Disputes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Resolution</CardTitle>
              <CardDescription>Disputes with proposed resolutions awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 5,
                    title: "Park Bench Installation Delay",
                    description: "Dispute over timeline extensions and penalties",
                    party1: { name: "Parks Department", type: "Client" },
                    party2: { name: "Urban Furnishings", type: "Worker" },
                    resolution: "Reduced payment by 15% with extended timeline",
                    proposed: "May 8, 2023",
                    waiting: "Both parties"
                  }
                ].map((dispute) => (
                  <div key={dispute.id} className="rounded-lg border cursor-pointer hover:bg-muted/50 transition" onClick={() => handleDisputeClick(dispute.id)}>
                    <div className="p-4">
                      <div className="mb-3 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-medium">{dispute.title}</h3>
                          <p className="text-sm text-muted-foreground">{dispute.description}</p>
                        </div>
                        <Badge variant="outline" className="mt-2 sm:mt-0">
                          Waiting: {dispute.waiting}
                        </Badge>
                      </div>
                      
                      <div className="rounded-lg bg-muted/50 p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <h4 className="text-sm font-medium">Proposed Resolution</h4>
                        </div>
                        <p className="mt-1 text-sm">{dispute.resolution}</p>
                        <p className="mt-2 text-xs text-muted-foreground">Proposed on {dispute.proposed}</p>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <TimerReset className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Response due in 48 hours</span>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Disputes</CardTitle>
              <CardDescription>Successfully concluded dispute cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium">Dispute</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Parties</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Resolution</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Satisfaction</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm font-medium">
                          {[
                            "Tree Removal Dispute",
                            "Park Equipment Quality",
                            "Street Cleaning Schedule",
                            "Pothole Repair Verification",
                            "Noise Complaint Investigation",
                            "Contractor Insurance Verification",
                          ][i]}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {[
                            "Homeowner vs Tree Service",
                            "Parks Dept vs Equipment Supplier",
                            "Residents vs Sanitation Dept",
                            "Road Dept vs Contractor",
                            "Residents vs Construction Company",
                            "City vs Contractor",
                          ][i]}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {[
                            "Compromise accepted",
                            "Replacement provided",
                            "Schedule adjusted",
                            "Payment adjusted",
                            "Hours restricted",
                            "Documentation verified",
                          ][i]}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {[
                            "April 30, 2023",
                            "April 25, 2023",
                            "April 20, 2023",
                            "April 15, 2023",
                            "April 10, 2023",
                            "April 5, 2023",
                          ][i]}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, star) => (
                              <ThumbsUp
                                key={star}
                                className={`h-3 w-3 ${
                                  star < [4, 5, 3, 4, 5, 4][i]
                                    ? "fill-green-500 text-green-500"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
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
                <p className="text-sm text-muted-foreground">Showing 6 of 42 resolved disputes</p>
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
        
        <TabsContent value="escalated" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escalated Disputes</CardTitle>
              <CardDescription>Cases requiring DAO governance intervention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 8,
                    title: "Major Contract Breach Allegation",
                    description: "Serious allegations of contract breach on downtown revitalization project",
                    party1: { name: "City Development Authority", type: "Client" },
                    party2: { name: "Metro Construction Group", type: "Worker" },
                    amount: 125000,
                    escalated: "May 2, 2023",
                    status: "DAO Review",
                    votes: { yes: 12, no: 5, abstain: 8 }
                  }
                ].map((dispute) => (
                  <div key={dispute.id} className="rounded-lg border cursor-pointer hover:bg-muted/50 transition" onClick={() => handleDisputeClick(dispute.id)}>
                    <div className="p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive">Escalated</Badge>
                            <Badge variant="outline">{dispute.status}</Badge>
                          </div>
                          <h3 className="mt-1 font-medium">{dispute.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{dispute.description}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">DAO Governance</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 rounded-lg bg-muted/50 p-3">
                        <h4 className="text-sm font-medium">Current Voting Status</h4>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>Yes</span>
                            </span>
                            <span>{dispute.votes.yes} votes</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1">
                              <ThumbsDown className="h-3 w-3" />
                              <span>No</span>
                            </span>
                            <span>{dispute.votes.no} votes</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Abstain</span>
                            <span>{dispute.votes.abstain} votes</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Escalated: {dispute.escalated}</span>
                          </div>
                          {dispute.amount > 0 && (
                            <div className="flex items-center gap-1">
                              <Scale className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Amount: ${dispute.amount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>            


            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="default" size="sm">
                Propose Resolution
              </Button>
              <Button variant="secondary" size="sm">
                Request Additional Evidence
              </Button>
              <Button variant="outline" size="sm">
                Escalate to DAO
              </Button>
            </div>
          </div>
  )
}