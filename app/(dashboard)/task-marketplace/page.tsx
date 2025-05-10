"use client"

import { useState, useEffect } from "react" 
import { useToast } from "@/components/ui/use-toast" 
import { ToastAction } from "@/components/ui/toast" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useBidStore } from "@/lib/stores/bids"
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
import { TaskTimer } from "@/components/task-timer"
type Bid = {
  amount: number;
  days: number;
  proposal: string;
  bidder: string;
  timestamp: Date;
  taskId: string;
};

const mockTasks = [
  {
    id: "pothole-1",
    title: "Pothole Repair on Main Street",
    category: "Infrastructure",
    reward: 450,
    deadline: new Date("2023-05-20")
  },
  // ... other mock tasks
]

export default function TaskMarketplacePage() {
  const { toast } = useToast()
  const [bidDialogOpen, setBidDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [filterDistance, setFilterDistance] = useState([5])
  const [formData, setFormData] = useState({
    amount: 0,
    timeframe: "",
    proposal: ""
  })

  const handleBidClick = (taskId: string) => {
    setSelectedTask(taskId)
    setBidDialogOpen(true)
  }

  const submitBid = async (taskId: string) => {
    if (!formData.amount || !formData.timeframe || !formData.proposal) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill all required bid fields",
      })
      return
    }

    try {
      const task = mockTasks.find(t => t.id === taskId)
      
      useBidStore.getState().addBid({
        taskId,
        taskTitle: task?.title || "Unknown Task",
        amount: formData.amount,
        days: parseInt(formData.timeframe),
        proposal: formData.proposal,
        bidder: "Worker123", // Replace with actual user
        timestamp: new Date(),
        deadline: task?.deadline || new Date()
      })

      setFormData({ amount: 0, timeframe: "", proposal: "" })
      setBidDialogOpen(false)
      
      toast({
        title: "Bid Submitted",
        description: "Your bid has been submitted for DAO review",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not submit bid. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Task Marketplace</h1>
        <p className="text-muted-foreground">Browse and bid on available tasks in your community</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Available Tasks</CardTitle>
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
                          <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: May 20, 2025</span>
                          <TaskTimer deadline={new Date('2025-05-20')} />
                        </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 4.0/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("pothole-1")}>Submit Bid</Button>
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
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Deadline: June 25, 2025</span>
                          <TaskTimer deadline={new Date('2025-06-25')} />
                        </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 4.5/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("streetlight-1")}>Submit Bid</Button>
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
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Deadline: May 25, 2025</span>
                          <TaskTimer deadline={new Date('2025-05-25')} />
                        </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 3.5/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("graffiti-1")}>Submit Bid</Button>
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
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: May 30, 2025</span>
                          <TaskTimer deadline={new Date('2025-05-30')} />
                        </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>Min. Rating: 4.2/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => handleBidClick("tree-1")}>Submit Bid</Button>
                    </div>
                  </div>
                </div>
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
            <Input 
              id="bid-amount" 
              type="number" 
              placeholder="Enter your bid amount"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
            />
            <p className="text-xs text-muted-foreground">Suggested range: $400-$500</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="completion-time">Estimated Completion Time</Label>
            <Select
              value={formData.timeframe}
              onValueChange={(value) => setFormData({...formData, timeframe: value})}
            >
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
            <Textarea 
              id="proposal" 
              placeholder="Describe your approach..." 
              rows={4}
              value={formData.proposal}
              onChange={(e) => setFormData({...formData, proposal: e.target.value})}
            />
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
              <Button onClick={() => selectedTask && submitBid(selectedTask)}>
                Submit Bid
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

