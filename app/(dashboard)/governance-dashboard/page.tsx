"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Building,
  Users,
  Vote,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Crown,
  LucideShield,
  LucidePencil,
  ChevronRight,
} from "lucide-react"

export default function GovernanceDashboardPage() {
  const [activeProposal, setActiveProposal] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Governance Dashboard</h1>
        <p className="text-muted-foreground">Manage and participate in DAO governance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Requiring votes or action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DAO Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quorum Rate</CardTitle>
            <Vote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">Average participation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Execution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Successfully implemented</p>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Voting on the "Community Center Renovation" proposal ends in 24 hours. Please cast your vote.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="proposals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
          <TabsTrigger value="past">Past Proposals</TabsTrigger>
          <TabsTrigger value="members">Member Directory</TabsTrigger>
          <TabsTrigger value="analytics">Governance Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="proposals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Proposals</CardTitle>
              <CardDescription>Requiring your attention and vote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {[
                  {
                    id: 1,
                    title: "Community Center Renovation",
                    description: "Allocate $75,000 for renovating the community center facilities",
                    type: "Funding",
                    deadline: "24 hours",
                    status: "Voting",
                    votes: { yes: 65, no: 15, abstain: 20 },
                  },
                  {
                    id: 2,
                    title: "Road Infrastructure Improvement Plan",
                    description: "Prioritize and fund road repairs across the district",
                    type: "Infrastructure",
                    deadline: "3 days",
                    status: "Voting",
                    votes: { yes: 58, no: 22, abstain: 20 },
                  },
                  {
                    id: 3,
                    title: "Worker Certification Requirements",
                    description: "Update certification requirements for infrastructure workers",
                    type: "Policy",
                    deadline: "5 days",
                    status: "Voting",
                    votes: { yes: 72, no: 8, abstain: 20 },
                  },
                ].map((proposal) => (
                  <div key={proposal.id} className="rounded-lg border">
                    <div
                      className={`p-4 ${activeProposal === proposal.id ? "border-b" : ""}`}
                      onClick={() => setActiveProposal(activeProposal === proposal.id ? null : proposal.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{proposal.title}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge>{proposal.type}</Badge>
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-900"
                            >
                              {proposal.status}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>Ends in {proposal.deadline}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 transition-transform ${activeProposal === proposal.id ? "rotate-90" : ""}`}
                        />
                      </div>
                    </div>

                    {activeProposal === proposal.id && (
                      <div className="p-4">
                        <p className="mb-4 text-sm text-muted-foreground">{proposal.description}</p>

                        <div className="mb-6 space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Yes ({proposal.votes.yes}%)</span>
                              <span>{proposal.votes.yes}%</span>
                            </div>
                            <Progress value={proposal.votes.yes} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>No ({proposal.votes.no}%)</span>
                              <span>{proposal.votes.no}%</span>
                            </div>
                            <Progress value={proposal.votes.no} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Abstain ({proposal.votes.abstain}%)</span>
                              <span>{proposal.votes.abstain}%</span>
                            </div>
                            <Progress value={proposal.votes.abstain} className="h-2" />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button size="sm">Vote Yes</Button>
                          <Button size="sm" variant="outline">
                            Vote No
                          </Button>
                          <Button size="sm" variant="outline">
                            Abstain
                          </Button>
                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Proposals
              </Button>
            </CardFooter>
          </Card>

          
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Proposals</CardTitle>
              <CardDescription>History of previous governance decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium">Proposal</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Result</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm font-medium">
                          {
                            [
                              "Park Renovation Funding",
                              "Road Repair Prioritization",
                              "Community Center Programs",
                              "Worker Compensation Policy",
                              "Sustainable Infrastructure Initiative",
                              "Emergency Response Protocol",
                              "Public Transit Improvement",
                              "Neighborhood Watch Program",
                            ][i]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {
                            [
                              "Funding",
                              "Infrastructure",
                              "Community",
                              "Policy",
                              "Infrastructure",
                              "Policy",
                              "Infrastructure",
                              "Community",
                            ][i]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {
                            [
                              "May 10, 2023",
                              "April 28, 2023",
                              "April 15, 2023",
                              "April 5, 2023",
                              "March 30, 2023",
                              "March 22, 2023",
                              "March 10, 2023",
                              "February 28, 2023",
                            ][i]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {i % 3 === 0 ? (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            >
                              Rejected
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            >
                              Approved
                            </Badge>
                          )}
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
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Directory</CardTitle>
              <CardDescription>DAO members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium">Filter by Role:</div>
                    <Badge variant="outline" className="cursor-pointer">
                      All
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Core Member
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Contributor
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Observer
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </div>

                <div className="rounded-lg border">
                  <div className="grid grid-cols-1 divide-y">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Member" />
                              <AvatarFallback>{["JD", "SM", "RB", "KL", "TM"][i]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {["John Doe", "Sarah Miller", "Robert Brown", "Karen Lee", "Tom Martin"][i]}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Member since {["Jan 2022", "Mar 2021", "Nov 2022", "Feb 2023", "Apr 2022"][i]}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge>{["Core Member", "Core Member", "Contributor", "Contributor", "Observer"][i]}</Badge>
                            {i < 2 && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Crown className="h-3 w-3" />
                                <span>Committee Lead</span>
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Members
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Governance Analytics</CardTitle>
              <CardDescription>Insights into DAO operations and governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Proposal Outcomes (Last 6 Months)</h3>
                  <div className="aspect-square rounded-lg border p-4 flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <PieChart className="h-32 w-32 mb-4 text-primary" />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-primary"></div>
                          <span>Approved (72%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-400"></div>
                          <span>Rejected (18%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                          <span>Expired (6%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                          <span>Cancelled (4%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Member Participation</h3>
                  <div className="aspect-square rounded-lg border p-4 flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <BarChart3 className="h-32 w-32 mb-4 text-primary" />
                      <div className="space-y-2 w-full text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Infrastructure</span>
                            <span>92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Funding</span>
                            <span>84%</span>
                          </div>
                          <Progress value={84} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Policy</span>
                            <span>76%</span>
                          </div>
                          <Progress value={76} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Community</span>
                            <span>88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-sm font-medium">Governance KPIs</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-xl font-bold">3.2 days</div>
                      <p className="text-xs text-muted-foreground">Avg. Deliberation Time</p>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-xl font-bold">5.4 days</div>
                      <p className="text-xs text-muted-foreground">Avg. Implementation Time</p>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-xl font-bold">84%</div>
                      <p className="text-xs text-muted-foreground">Quorum Achievement</p>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-xl font-bold">92%</div>
                      <p className="text-xs text-muted-foreground">Execution Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

