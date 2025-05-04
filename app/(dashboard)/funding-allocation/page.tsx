"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Building,
  DollarSign,
  PieChart,
  AlertTriangle,
  Clock,
  FileText,
  CheckCircle,
  RotateCcw,
  Search,
  Filter,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function FundingAllocationPage() {
  const [allocations, setAllocations] = useState<Record<string, number>>({
    infrastructure: 35,
    "public-safety": 25,
    community: 20,
    environment: 15,
    emergency: 5,
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleAllocationChange = (category: string, value: number[]) => {
    const newValue = value[0]
    const oldValue = allocations[category]
    const diff = newValue - oldValue

    const otherCategories = Object.keys(allocations).filter((key) => key !== category)

    if (diff === 0) return

    // Calculate how much to adjust other categories
    const totalOtherValues = otherCategories.reduce((sum, key) => sum + allocations[key], 0)
    const adjustmentFactor = totalOtherValues > 0 ? -diff / totalOtherValues : 0

    const newAllocations = { ...allocations }

    // Adjust other categories proportionally
    otherCategories.forEach((key) => {
      const currentValue = allocations[key]
      const adjustment = Math.round(currentValue * adjustmentFactor)
      newAllocations[key] = Math.max(0, currentValue + adjustment)
    })

    // Ensure total is 100%
    const newTotal = newValue + otherCategories.reduce((sum, key) => sum + newAllocations[key], 0)
    if (newTotal !== 100) {
      const lastCategory = otherCategories[otherCategories.length - 1]
      newAllocations[lastCategory] += 100 - newTotal
    }

    newAllocations[category] = newValue
    setAllocations(newAllocations)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setDialogOpen(true)
  }

  const totalBudget = 2500000 // $2.5M

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Funding Allocation</h1>
        <p className="text-muted-foreground">Manage and distribute community funds</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.5M</div>
            <p className="text-xs text-muted-foreground">Fiscal Year 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Allocated Funds</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.8M</div>
            <p className="text-xs text-muted-foreground">72% of total budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Funds</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$700K</div>
            <p className="text-xs text-muted-foreground">Available for allocation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Across 5 categories</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Budget Allocation</CardTitle>
          <CardDescription>Adjust fund distribution across categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center h-60">
            <div className="text-center flex flex-col items-center">
              <PieChart className="h-40 w-40 mb-4 text-primary" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>Infrastructure ({allocations["infrastructure"]}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Public Safety ({allocations["public-safety"]}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Community ({allocations["community"]}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span>Environment ({allocations["environment"]}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span>Emergency ({allocations["emergency"]}%)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  Infrastructure
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Roads, bridges, public buildings, and other physical infrastructure
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{allocations["infrastructure"]}%</span>
                  <span className="text-sm text-muted-foreground">
                    ${((allocations["infrastructure"] / 100) * totalBudget).toLocaleString()}
                  </span>
                </div>
              </div>
              <Slider
                value={[allocations["infrastructure"]]}
                max={100}
                step={1}
                onValueChange={(value) => handleAllocationChange("infrastructure", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  Public Safety
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Community policing, emergency response, and public safety equipment
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{allocations["public-safety"]}%</span>
                  <span className="text-sm text-muted-foreground">
                    ${((allocations["public-safety"] / 100) * totalBudget).toLocaleString()}
                  </span>
                </div>
              </div>
              <Slider
                value={[allocations["public-safety"]]}
                max={100}
                step={1}
                onValueChange={(value) => handleAllocationChange("public-safety", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  Community Programs
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Education, recreation, cultural programs and community events
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{allocations["community"]}%</span>
                  <span className="text-sm text-muted-foreground">
                    ${((allocations["community"] / 100) * totalBudget).toLocaleString()}
                  </span>
                </div>
              </div>
              <Slider
                value={[allocations["community"]]}
                max={100}
                step={1}
                onValueChange={(value) => handleAllocationChange("community", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  Environment
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Parks, green spaces, sustainability initiatives and environmental protections
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{allocations["environment"]}%</span>
                  <span className="text-sm text-muted-foreground">
                    ${((allocations["environment"] / 100) * totalBudget).toLocaleString()}
                  </span>
                </div>
              </div>
              <Slider
                value={[allocations["environment"]]}
                max={100}
                step={1}
                onValueChange={(value) => handleAllocationChange("environment", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1">
                  Emergency Fund
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px] text-xs">
                          Reserved for natural disasters, unforeseen community emergencies and urgent needs
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{allocations["emergency"]}%</span>
                  <span className="text-sm text-muted-foreground">
                    ${((allocations["emergency"] / 100) * totalBudget).toLocaleString()}
                  </span>
                </div>
              </div>
              <Slider
                value={[allocations["emergency"]]}
                max={100}
                step={1}
                onValueChange={(value) => handleAllocationChange("emergency", value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
            <Button size="sm">Save Allocation</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="proposed">Proposed Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "infrastructure-1",
                title: "Main Street Repaving",
                category: "Infrastructure",
                budget: 350000,
                progress: 65,
                dueDate: "June 30, 2023",
                status: "In Progress",
              },
              {
                id: "infrastructure-2",
                title: "Bridge Reinforcement",
                category: "Infrastructure",
                budget: 420000,
                progress: 30,
                dueDate: "August 15, 2023",
                status: "In Progress",
              },
              {
                id: "community-1",
                title: "Community Center Renovation",
                category: "Community",
                budget: 280000,
                progress: 80,
                dueDate: "May 31, 2023",
                status: "Nearly Complete",
              },
              {
                id: "public-safety-1",
                title: "Emergency Response Equipment",
                category: "Public Safety",
                budget: 150000,
                progress: 100,
                dueDate: "Completed",
                status: "Complete",
              },
              {
                id: "environment-1",
                title: "Central Park Improvements",
                category: "Environment",
                budget: 180000,
                progress: 45,
                dueDate: "July 15, 2023",
                status: "In Progress",
              },
              {
                id: "public-safety-2",
                title: "Traffic Safety Measures",
                category: "Public Safety",
                budget: 120000,
                progress: 25,
                dueDate: "September 1, 2023",
                status: "In Progress",
              },
            ].map(
              (project) =>
                (
                  <Card key={project.id} className="cursor-pointer hover:bg-muted/50 transition" onClick={() => handleCategoryClick(project.id)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.category}</CardDescription>
                    </div>
                    <Badge variant={project.progress === 100 ? "default" : "outline"}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Budget:</span>
                      <span className="font-medium">${project.budget.toLocaleString()}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress:</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify"  />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Due Date:</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {project.dueDate}
                      </span>
                    </div>
                </CardContent>
              </Card>
                ),
            )}
          </div>

          <div className="flex justify-center">
            <Button variant="outline">Load More Projects</Button>
          </div>
        </TabsContent>

        <TabsContent value="proposed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposed Projects</CardTitle>
              <CardDescription>Projects awaiting funding approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Westside Sidewalk Replacement",
                    category: "Infrastructure",
                    budget: 185000,
                    sponsor: "Public Works Department",
                    votes: 65,
                    priority: "Medium",
                  },
                  {
                    title: "Youth After-School Programs",
                    category: "Community",
                    budget: 120000,
                    sponsor: "Education Committee",
                    votes: 82,
                    priority: "High",
                  },
                  {
                    title: "Solar Panels for Public Buildings",
                    category: "Environment",
                    budget: 320000,
                    sponsor: "Sustainability Task Force",
                    votes: 48,
                    priority: "Medium",
                  },
                  {
                    title: "Emergency Communication System",
                    category: "Public Safety",
                    budget: 215000,
                    sponsor: "Emergency Services",
                    votes: 74,
                    priority: "High",
                  },
                ].map((project, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge>{project.category}</Badge>
                          <Badge
                            variant="outline"
                            className={
                              project.priority === "High"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }
                          >
                            {project.priority} Priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            ${project.budget.toLocaleString()} requested
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Sponsored by: {project.sponsor}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{project.votes} votes</span>
                        </div>
                        <Button size="sm">Review</Button>
                        <Button variant="outline" size="sm">
                          Vote
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Submit New Project Proposal
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Projects</CardTitle>
              <CardDescription>Successfully delivered community projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium">Project</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Category</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Budget</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Final Cost</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Completion Date</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm font-medium">
                          {
                            [
                              "Community Library Expansion",
                              "Elm Street Repaving",
                              "Public Safety Equipment",
                              "City Park Playground",
                              "Downtown Lighting Upgrade",
                              "Emergency Weather Shelters",
                            ][i]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {
                            [
                              "Community",
                              "Infrastructure",
                              "Public Safety",
                              "Environment",
                              "Infrastructure",
                              "Emergency",
                            ][i]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm">
                          ${[250000, 320000, 180000, 145000, 210000, 95000][i].toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          ${[245000, 335000, 172000, 150000, 205000, 92000][i].toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {
                            [
                              "April 15, 2023",
                              "March 30, 2023",
                              "February 28, 2023",
                              "January 20, 2023",
                              "December 10, 2022",
                              "November 5, 2022",
                            ][i]
                          }
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <Button variant="ghost" size="sm">
                            View Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Project Details: Main Street Repaving</DialogTitle>
            <DialogDescription>View and manage project details and funding</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Budget Allocation</h3>
                <div className="rounded-lg border p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Original Budget:</span>
                      <span className="font-medium">$350,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Current Expenses:</span>
                      <span className="font-medium">$228,500</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Remaining Budget:</span>
                      <span className="font-medium text-green-600">$121,500</span>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Expense Tracking:</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Timeline</h3>
                <div className="rounded-lg border p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Start Date:</span>
                      <span>March 15, 2023</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Expected Completion:</span>
                      <span>June 30, 2023</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Current Phase:</span>
                      <Badge>Phase 2 of 3</Badge>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress:</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Project Description</h3>
              <div className="rounded-lg border p-4">
                <p className="text-sm">
                  Complete repaving of Main Street from Oak Avenue to Pine Street. Project includes repairing underlying
                  infrastructure, fixing drainage issues, and adding ADA-compliant sidewalk ramps. Will improve safety
                  and accessibility for all residents while extending the life of this critical transportation corridor.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Expense Breakdown</h3>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">Category</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Budget</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Spent</th>
                      <th className="px-4 py-2 text-left text-sm font-medium">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 text-sm">Materials</td>
                      <td className="px-4 py-2 text-sm">$150,000</td>
                      <td className="px-4 py-2 text-sm">$112,500</td>
                      <td className="px-4 py-2 text-sm">$37,500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 text-sm">Labor</td>
                      <td className="px-4 py-2 text-sm">$120,000</td>
                      <td className="px-4 py-2 text-sm">$78,000</td>
                      <td className="px-4 py-2 text-sm">$42,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 text-sm">Equipment</td>
                      <td className="px-4 py-2 text-sm">$50,000</td>
                      <td className="px-4 py-2 text-sm">$28,000</td>
                      <td className="px-4 py-2 text-sm">$22,000</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Permits & Admin</td>
                      <td className="px-4 py-2 text-sm">$30,000</td>
                      <td className="px-4 py-2 text-sm">$10,000</td>
                      <td className="px-4 py-2 text-sm">$20,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Budget Adjustment</h3>
                <Badge variant="outline">Requires DAO Approval</Badge>
              </div>
              <div className="rounded-lg border p-4">
                <div className="space-y-3">
                  <div className="grid gap-2 grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="additional-amount">Additional Amount</Label>
                      <Input id="additional-amount" placeholder="0.00" type="number" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="reason">Reason</Label>
                      <Select>
                        <SelectTrigger id="reason">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unexpected">Unexpected Costs</SelectItem>
                          <SelectItem value="scope">Scope Expansion</SelectItem>
                          <SelectItem value="materials">Material Price Increase</SelectItem>
                          <SelectItem value="labor">Additional Labor</SelectItem>
                          <SelectItem value="other">Other (Specify)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="justification">Justification</Label>
                    <Textarea id="justification" placeholder="Explain the need for additional funds..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="confirmation" />
                    <Label htmlFor="confirmation" className="text-sm">
                      I confirm this budget adjustment is necessary for project completion
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>
              <FileText className="mr-2 h-4 w-4" />
              Submit Adjustment Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

