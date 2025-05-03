"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Calendar, Clock, DollarSign, Filter, MapPin, Search, Star, User } from "lucide-react"
import Image from "next/image"

export default function TaskMarketplacePage() {
  const [bidDialogOpen, setBidDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [filterDistance, setFilterDistance] = useState([5])

  const handleBidClick = (taskId: string) => {
    setSelectedTask(taskId)
    setBidDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Task Marketplace</h1>
        <p className="text-muted-foreground">Browse and bid on available tasks in your community</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="md:w-64">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Search tasks..." className="pl-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="infrastructure" className="h-4 w-4 rounded border-muted" />
                  <Label htmlFor="infrastructure" className="text-sm font-normal">
                    Infrastructure
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sanitation" className="h-4 w-4 rounded border-muted" />
                  <Label htmlFor="sanitation" className="text-sm font-normal">
                    Sanitation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="utilities" className="h-4 w-4 rounded border-muted" />
                  <Label htmlFor="utilities" className="text-sm font-normal">
                    Utilities
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="environment" className="h-4 w-4 rounded border-muted" />
                  <Label htmlFor="environment" className="text-sm font-normal">
                    Environment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="public-property" className="h-4 w-4 rounded border-muted" />
                  <Label htmlFor="public-property" className="text-sm font-normal">
                    Public Property
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Distance (miles)</Label>
                <span className="text-sm">{filterDistance[0]} miles</span>
              </div>
              <Slider value={filterDistance} max={20} step={1} onValueChange={setFilterDistance} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Urgency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any urgency</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Reward Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any amount</SelectItem>
                  <SelectItem value="0-100">$0 - $100</SelectItem>
                  <SelectItem value="100-500">$100 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000+">$1,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Available Tasks</CardTitle>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="reward-high">Highest Reward</SelectItem>
                    <SelectItem value="reward-low">Lowest Reward</SelectItem>
                    <SelectItem value="deadline">Closest Deadline</SelectItem>
                    <SelectItem value="distance">Nearest Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>Found 28 tasks matching your criteria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="h-24 w-24 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        width={96}
                        height={96}
                        alt="Pothole"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="text-lg font-medium">Pothole Repair on Main Street</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>Infrastructure</Badge>
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-900"
                          >
                            High Priority
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>0.8 miles away</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Posted 2 days ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Large pothole approximately 2 feet wide causing traffic hazards and potential vehicle damage.
                        Requires filling and patching with asphalt.
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">$450</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: May 20, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 4.0/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("pothole-1")}>Submit Bid</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="h-24 w-24 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        width={96}
                        height={96}
                        alt="Street Light"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="text-lg font-medium">Street Light Replacement</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>Utilities</Badge>
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                          >
                            Medium Priority
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>1.2 miles away</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Posted 3 days ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Street light at the corner of Oak and Elm is non-functional. Requires electrical expertise to
                        diagnose and replace components.
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">$350</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: May 25, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 4.5/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("streetlight-1")}>Submit Bid</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="h-24 w-24 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        width={96}
                        height={96}
                        alt="Graffiti"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="text-lg font-medium">Graffiti Removal at Community Center</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>Public Property</Badge>
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
                          >
                            Medium Priority
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>1.5 miles away</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Posted 1 week ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Graffiti on the east wall of the community center needs to be removed. Requires pressure washing
                        and possibly repainting.
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">$300</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: May 30, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 3.5/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("graffiti-1")}>Submit Bid</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="h-24 w-24 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        width={96}
                        height={96}
                        alt="Tree"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="text-lg font-medium">Fallen Tree Removal</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>Environment</Badge>
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900"
                          >
                            Critical Priority
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>0.5 miles away</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Posted 1 day ago</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Large oak tree has fallen across Oak Street after the storm. Blocking traffic and creating a
                        hazard. Requires chainsaw work and debris removal.
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">$600</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: May 16, 2023 (Urgent)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 4.2/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("tree-1")}>Submit Bid</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button variant="outline">Load More Tasks</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Submit a Bid</DialogTitle>
            <DialogDescription>Provide your bid details for this task. Be competitive but fair.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bid-amount">Bid Amount ($)</Label>
              <Input id="bid-amount" type="number" placeholder="Enter your bid amount" />
              <p className="text-xs text-muted-foreground">Suggested range: $400-$500</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="completion-time">Estimated Completion Time</Label>
              <Select>
                <SelectTrigger id="completion-time">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-day">1 day</SelectItem>
                  <SelectItem value="2-3-days">2-3 days</SelectItem>
                  <SelectItem value="4-7-days">4-7 days</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal">Your Proposal</Label>
              <Textarea id="proposal" placeholder="Describe your approach to completing this task..." rows={4} />
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Your Qualifications</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Star className="h-4 w-4 text-muted" />
                </div>
                <span className="text-sm">4.2/5 Rating</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">12 completed tasks</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBidDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setBidDialogOpen(false)}>Submit Bid</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

