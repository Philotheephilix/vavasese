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
import { ethers } from "ethers"
import TimeLockEscrowABI from "../../../contracts/timelock-escrow/out/TimeLockEscrow.sol/TimeLockEscrow.json"; 
''
export default function WorkerDashboardPage() {
  const { bids } = useBidStore()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error("Failed to connect wallet:", error);
        }
      }
    };
    connectWallet();
  }, []);
  console.log(walletAddress)

  // Mock wallet connection - replace with actual wallet implementation
  const workerBids = bids.filter(bid => bid.wallet && walletAddress && bid.wallet.toLowerCase() === walletAddress.toLowerCase())
  console.log(workerBids)
  const approvedBids = workerBids.filter(bid => bid.status === 'approved')
  const pendingBids = workerBids.filter(bid => bid.status === 'pending')

  const stats = {
    activeTasks: approvedBids.length,
    completedTasks: 12, // Keep separate or add completion status
    earnings: approvedBids.reduce((sum, bid) => sum + bid.amount, 0),
    reputation: 4.8
  }
  const isMaxVotes = (bid: { votes: any }) => {
    const allVotes = bids.map(b => b.status === 'completed' ? 1 : 0);
    const maxVotes = Math.max(...allVotes);
    return (bid.votes || 0) >= maxVotes;
  };
  const { approvePayment } = useBidStore();

  // Handle payment release
  const handlePaymentRelease = async (bid: { id: any; taskId?: string; taskTitle?: string; amount: any; days?: number; proposal?: string; bidder?: string; timestamp?: Date; deadline?: Date; wallet?: string; status?: "pending" | "approved" | "rejected" | "completed";escrowIndex:number; }) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const escrow = new ethers.Contract(
        process.env.NEXT_PUBLIC_ESCROW_ADDRESS!,
        TimeLockEscrowABI.abi,
        await signer
      );
  
      // 3. Execute withdrawal
      const tx = await escrow.withdraw(bid.escrowIndex);
      await tx.wait();
  
      // 4. Update store
      approvePayment(bid.id);
  
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle error state
    }
  };
  
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
            Track your earnings and payment approvals
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
                    <th className="px-4 py-2 text-left text-sm font-medium">Votes</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {workerBids
                    .filter(bid => bid.status === 'approved')
                    .map((bid) => (
                      <tr key={bid.id} className="border-b last:border-0">
                        <td className="px-4 py-2 text-sm font-medium">
                          {bid.taskTitle}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          ${bid.amount}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <Badge variant="outline">
                            {bid.amount+4 || 0} approvals
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {bid.status === 'completed' ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Paid
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              Pending
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <Button 
                            size="sm"
                            disabled={bid.status==='pending' || !bid.escrowIndex}
                            onClick={() => bid.escrowIndex && handlePaymentRelease(bid as any)}
                          >
                            {bid.status ? 'Completed' : 'Claim Payment'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total Pending: ${workerBids.filter(bid => bid.status === 'approved' || bid.status === 'pending')
                  .reduce((sum, bid) => sum + bid.amount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">
                Total Paid: ${workerBids.filter(bid => bid.status === 'completed')
                  .reduce((sum, bid) => sum + bid.amount, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
async function convertUsdToEth(usdAmount: number): Promise<number> {
  try {
    // Fetch current ETH price in USD from CoinGecko API
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    const ethPrice = data.ethereum.usd;

    // Convert USD to ETH
    const ethAmount = usdAmount / ethPrice;
    
    // Return the amount in ETH, rounded to 6 decimal places
    return Number(ethAmount.toFixed(6));
  } catch (error) {
    console.error('Error converting USD to ETH:', error);
    throw new Error('Failed to convert USD to ETH');
  }
}
