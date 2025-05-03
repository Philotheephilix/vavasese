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
                  },
                  {
                    id: 3,
                    title: "Project Scope Disagreement",
                    description: "Conflict over the scope of work for community center renovation",
                    party1: { name: "Community Center Board", type: "Client" },
                    party2: { name: "BuildRight Contractors", type: "Worker" },
                    amount: 12500,
                    filed: "May 5, 2023",
                    priority: "Medium",
                    status: "Evidence Collection"
                  },
                  {
                    id: 4,
                    title: "Duplicate Grievance Report",
                    description: "Dispute over merger of similar grievances reported by multiple citizens",
                    party1: { name: "Robert Brown", type: "Citizen" },
                    party2: { name: "Lisa Johnson", type: "Citizen" },
                    amount: 0,
                    filed: "May 3, 2023",
                    priority: "Low",
                    status: "Scheduling Mediation"
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
                  },
                  {
                    id: 6,
                    title: "Water Leak Emergency Repair Cost",
                    description: "Dispute over emergency repair costs and authorization",
                    party1: { name: "Water Utility", type: "Client" },
                    party2: { name: "Rapid Plumbing", type: "Worker" },
                    resolution: "Full payment approved with future contract adjustment",
                    proposed: "May 7, 2023",
                    waiting: "Client approval"
                  },
                  {
                    id: 7,
                    title: "Sidewalk Repair Materials Dispute",
                    description: "Disagreement about materials quality and specifications",
                    party1: { name: "City Engineering", type: "Client" },
                    party2: { name: "Concrete Solutions", type: "Worker" },
                    resolution: "Partial rework with shared material costs",
                    proposed: "May 5, 2023",
                    waiting: "Worker approval"
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
                  },
                  {
                    id: 9,
                    title: "Worker Certification Dispute",
                    description: "Challenge to worker certification validity for specialized electrical work",
                    party1: { name: "Electrical Safety Board", type: "Client" },
                    party2: { name: "James Wilson", type: "Worker" },
                    amount: 0,
                    escalated: "April 28, 2023",
                    status: "DAO Voting",
                    votes: { yes: 18, no: 3, abstain: 4 }
                  },
                  {
                    id: 10,
                    title: "Community Fund Allocation Dispute",
                    description: "Disagreement over allocation of community improvement funds",
                    party1: { name: "Neighborhood Association", type: "Client" },
                    party2: { name: "Parks Department", type: "Client" },
                    amount: 75000,
                    escalated: "April 25, 2023",
                    status: "DAO Deliberation",
                    votes: { yes: 10, no: 10, abstain: 5 }
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Dispute Details: Worker Compensation Dispute</DialogTitle>
            <DialogDescription>Case #DIS-2023-0042 • Filed on May 10, 2023</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Dispute Summary</h3>
                  <p className="mt-1 text-sm">
                    Dispute over payment for completed work on Main Street repaving project. The City Public Works department is withholding 
                    final payment of $4,500 due to alleged quality issues with the asphalt work. John Contractor claims the work meets all 
                    specifications in the contract and has provided documentation of material quality and installation procedures.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Dispute Status</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      Critical Priority
                    </Badge>
                    <Badge>In Progress</Badge>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium">Involved Parties</h3>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">City Public Works</p>
                        <p className="text-xs text-muted-foreground">Client • Represented by: Michael Johnson</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>JC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Contractor</p>
                        <p className="text-xs text-muted-foreground">Worker • Road Repair Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Evidence Submitted</h3>
                  <div className="mt-2 space-y-2">
                    <div className="rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Contract Agreement.pdf</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Material Specifications.pdf</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Quality Inspection Report.pdf</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Email Communications.zip</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Site Photos (12).zip</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Timeline</h3>
                  <div className="mt-2 space-y-3">
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">May 10, 2023</p>
                      <p className="text-xs text-muted-foreground">Dispute filed by John Contractor</p>
                    </div>
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">May 11, 2023</p>
                      <p className="text-xs text-muted-foreground">Initial review by Admin</p>
                    </div>
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary"></div>
                      <p className="text-sm font-medium">May 12, 2023</p>
                      <p className="text-xs text-muted-foreground">Evidence collection initiated</p>
                    </div>
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-muted"></div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-xs text\

