"use client"

// Add ethereum property to Window interface
declare global {
  interface Window {
    ethereum?: any;
  }
}

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
import { Award, Calendar, Clock, DollarSign, Filter, MapPin, Search, Star, User, Wallet } from "lucide-react"
import Image from "next/image"
import { TaskTimer } from "@/components/task-timer"
import { ethers } from "ethers"

type Bid = {
  amount: number;
  days: number;
  proposal: string;
  bidder: string;
  timestamp: Date;
  taskId: string;
};

type GrievanceTask = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  priorityLevel: string;
  estimatedDays: number;
  reward: number;
  currency: string;
  timestamp: number;
  submitter: string;
  resolved: boolean;
  mediaCount: number;
  aiJustification: string;
  trackingId: string;
};

// Contract information
const GRIEVANCE_CONTRACT_ADDRESS = "0xf290590D47c81820427A108Ce6363607a03Aaf1b";
const BASE_SEPOLIA_RPC = "https://sepolia.base.org";

const GRIEVANCE_CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_category", "type": "string"},
      {"internalType": "string", "name": "_location", "type": "string"},
      {"internalType": "uint256", "name": "_mediaCount", "type": "uint256"},
      {"internalType": "string", "name": "_priorityLevel", "type": "string"},
      {"internalType": "uint256", "name": "_estimatedDays", "type": "uint256"},
      {"internalType": "uint256", "name": "_fundAmount", "type": "uint256"},
      {"internalType": "string", "name": "_currency", "type": "string"},
      {"internalType": "string", "name": "_aiJustification", "type": "string"},
      {"internalType": "string", "name": "_trackingId", "type": "string"}
    ],
    "name": "submitGrievance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_trackingId", "type": "string"}],
    "name": "markResolved",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_trackingId", "type": "string"}],
    "name": "getGrievance",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "title", "type": "string"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "string", "name": "location", "type": "string"},
          {"internalType": "uint256", "name": "mediaCount", "type": "uint256"},
          {"internalType": "string", "name": "priorityLevel", "type": "string"},
          {"internalType": "uint256", "name": "estimatedDays", "type": "uint256"},
          {"internalType": "uint256", "name": "fundAmount", "type": "uint256"},
          {"internalType": "string", "name": "currency", "type": "string"},
          {"internalType": "string", "name": "aiJustification", "type": "string"},
          {"internalType": "string", "name": "trackingId", "type": "string"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "bool", "name": "resolved", "type": "bool"}
        ],
        "internalType": "struct GrievanceRegistry.Grievance",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllGrievances",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "title", "type": "string"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "string", "name": "location", "type": "string"},
          {"internalType": "uint256", "name": "mediaCount", "type": "uint256"},
          {"internalType": "string", "name": "priorityLevel", "type": "string"},
          {"internalType": "uint256", "name": "estimatedDays", "type": "uint256"},
          {"internalType": "uint256", "name": "fundAmount", "type": "uint256"},
          {"internalType": "string", "name": "currency", "type": "string"},
          {"internalType": "string", "name": "aiJustification", "type": "string"},
          {"internalType": "string", "name": "trackingId", "type": "string"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "bool", "name": "resolved", "type": "bool"}
        ],
        "internalType": "struct GrievanceRegistry.Grievance[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function TaskMarketplacePage() {
  const { toast } = useToast()
  const [bidDialogOpen, setBidDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [filterDistance, setFilterDistance] = useState([5])
  const [grievanceTasks, setGrievanceTasks] = useState<GrievanceTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    amount: 0,
    timeframe: "",
    proposal: ""
  })
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

// Wallet connection handlers
const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setSigner(signer);
    setWalletAddress(address);
  } catch (error) {
    console.error('Wallet connection error:', error);
    alert('Wallet connection failed');
  }
};

  // Function to fetch grievances from blockchain
  const fetchGrievances = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Initialize provider
      const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC)
      
      // Initialize contract
      const grievanceContract = new ethers.Contract(
        GRIEVANCE_CONTRACT_ADDRESS,
        GRIEVANCE_CONTRACT_ABI,
        provider
      )
      
      // Fetch all grievances
      const grievances = await grievanceContract.getAllGrievances()
      
      // Transform blockchain data to our app format
      const transformedGrievances = grievances.map((grievance: any) => ({
        id: grievance.trackingId,
        title: grievance.title,
        description: grievance.description,
        category: grievance.category,
        location: grievance.location,
        priorityLevel: grievance.priorityLevel,
        estimatedDays: parseInt(grievance.estimatedDays.toString()),
        reward: parseInt(grievance.fundAmount.toString()),
        currency: grievance.currency,
        timestamp: parseInt(grievance.timestamp.toString()),
        submitter: grievance.submitter,
        resolved: grievance.resolved,
        mediaCount: parseInt(grievance.mediaCount.toString()),
        aiJustification: grievance.aiJustification,
        trackingId: grievance.trackingId
      }))
      
      // Filter out resolved grievances
      const activeGrievances = transformedGrievances.filter((grievance: { resolved: any }) => !grievance.resolved)
      
      setGrievanceTasks(activeGrievances)
      setIsLoading(false)
    } catch (err) {
      console.error("Error fetching grievances:", err)
      setError("Failed to load tasks from blockchain")
      setIsLoading(false)
      
      // Load fallback data when blockchain fetch fails
      setGrievanceTasks([
        {
          id: "pothole-1",
          title: "Pothole Repair on Main Street",
          description: "Large pothole approximately 2 feet wide causing traffic hazards and potential vehicle damage. Requires filling and patching with asphalt.",
          category: "Infrastructure",
          location: "Main Street",
          priorityLevel: "High",
          estimatedDays: 3,
          reward: 450,
          currency: "USD",
          timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
          submitter: "0x123...",
          resolved: false,
          mediaCount: 2,
          aiJustification: "High priority due to safety concerns",
          trackingId: "pothole-1"
        },
        {
          id: "streetlight-1",
          title: "Street Light Replacement",
          description: "Street light at the corner of Oak and Elm is non-functional. Requires electrical expertise to diagnose and replace components.",
          category: "Utilities",
          location: "Oak and Elm",
          priorityLevel: "Medium",
          estimatedDays: 5,
          reward: 350,
          currency: "USD",
          timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
          submitter: "0x456...",
          resolved: false,
          mediaCount: 1,
          aiJustification: "Medium priority due to safety concerns",
          trackingId: "streetlight-1"
        }
      ])
      
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to blockchain. Showing cached data instead.",
      })
    }
  }

  useEffect(() => {
    fetchGrievances()
  }, [])

  const handleBidClick = (taskId: string) => {
    setSelectedTask(taskId)
    setBidDialogOpen(true)
  }

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    
    const days = Math.floor(diff / (24 * 60 * 60 * 1000))
    const hours = Math.floor(diff / (60 * 60 * 1000))
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      return 'Just now'
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-900"
      case 'medium':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900"
      case 'critical':
        return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-900"
      case 'low':
        return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-900"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
    }
  }

  const calculateDeadline = (timestamp: number, estimatedDays: number) => {
    const deadline = new Date(timestamp + (estimatedDays * 24 * 60 * 60 * 1000))
    return deadline
  }

  const formatDeadline = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
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
      const task = grievanceTasks.find(t => t.id === taskId)
      
      if (!task) {
        throw new Error("Task not found")
      }
      
      useBidStore.getState().addBid({
        taskId,
        taskTitle: task.title,
        amount: formData.amount,
        days: parseInt(formData.timeframe),
        proposal: formData.proposal,
        bidder: "Worker123", // Replace with actual user wallet address
        timestamp: new Date(),
        wallet : "0x123...",
        deadline: calculateDeadline(task.timestamp, task.estimatedDays)
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

          {/* Search and filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-full pl-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="public-property">Public Property</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Available Tasks</CardTitle>
                <Button variant="outline" size="sm" onClick={fetchGrievances}>
                  Refresh
                </Button>
              </div>
              <CardDescription>
                {isLoading ? "Loading tasks..." : 
                 error ? "Error loading tasks" : 
                 `Found ${grievanceTasks.length} tasks matching your criteria`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="rounded-lg border p-6 text-center">
                  <p className="text-muted-foreground">{error}</p>
                  <Button className="mt-4" onClick={fetchGrievances}>
                    Try Again
                  </Button>
                </div>
              ) : grievanceTasks.length === 0 ? (
                <div className="rounded-lg border p-6 text-center">
                  <p className="text-muted-foreground">No active tasks found</p>
                </div>
              ) : (
                grievanceTasks.map((task) => (
                  <div key={task.id} className="rounded-lg border">
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className="h-24 w-24 overflow-hidden rounded-lg">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            width={96}
                            height={96}
                            alt={task.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="text-lg font-medium">{task.title}</h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge>{task.category}</Badge>
                              <Badge
                                variant="outline"
                                className={getPriorityBadgeClass(task.priorityLevel)}
                              >
                                {task.priorityLevel} Priority
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{task.location}</span>
                              </div>
                            
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                ${task.reward === 0 ? 
                                  400 + Math.floor(Math.random() * 600) : 
                                  task.reward}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-muted-foreground" />
                              <span>Min. Rating: 4.0/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button onClick={() => handleBidClick(task.id)}>Submit Bid</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
      {/* Wallet Connection Section */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {walletAddress ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                  <Badge className="px-2 py-1 text-xs">Connected</Badge>
                </div>
              ) : (
                "Connect Wallet to Bid"
              )}
            </span>
          </div>
          {!walletAddress ? (
            <Button 
              size="sm" 
              onClick={connectWallet}
              variant="outline"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button 
              size="sm" 
             
              variant="ghost"
              className="text-red-500 hover:text-red-600"
            >
              Disconnect
            </Button>
          )}
        </div>
        {!walletAddress && (
          <p className="mt-2 text-xs text-red-500">
            You must connect your wallet to submit a bid
          </p>
        )}
      </div>

      {/* Existing form fields */}
      <div className="space-y-2">
        <Label htmlFor="bid-amount">Bid Amount ($)</Label>
        <Input 
          id="bid-amount" 
          type="number" 
          placeholder="Enter your bid amount"
          value={formData.amount || ""}
          onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
          disabled={!walletAddress}
        />
        <p className="text-xs text-muted-foreground">
          Suggested range: ${selectedTask ? 
            Math.floor(grievanceTasks.find(t => t.id === selectedTask)?.reward ?? 0 * 0.8) : 0}-
          ${selectedTask ? 
            Math.ceil(grievanceTasks.find(t => t.id === selectedTask)?.reward ?? 0 * 1.1) : 0}
        </p>
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
            <SelectItem value="1">1 day</SelectItem>
            <SelectItem value="3">3 days</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="14">14 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="proposal">Your Proposal</Label>
        <Textarea 
          id="proposal" 
          placeholder="Describe your approach, materials needed, and relevant experience..." 
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
      <Button 
        onClick={() => selectedTask && submitBid(selectedTask)}
        disabled={!walletAddress}
      >
        Submit Bid
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}