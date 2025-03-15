"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TaskTimer } from "@/components/task-timer"
import { useBidStore } from "@/lib/stores/bids"
import { Input } from "@/components/ui/input"

import { ethers } from "ethers";
import TimeLockEscrowABI from "../../../contracts/timelock-escrow/out/TimeLockEscrow.sol/TimeLockEscrow.json"; 
export default function DaoBidsPage() {
    const { bids, approveBid, rejectBid } = useBidStore()
    const [sortBy, setSortBy] = useState("newest")
    const [statusFilter, setStatusFilter] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
  
    const handleApprove = async (bidId: string) => {
      const bid = bids.find(b => b.id === bidId);
      if (!bid) return;
    
      try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
        const escrow = new ethers.Contract(
          process.env.NEXT_PUBLIC_ESCROW_ADDRESS!,
          TimeLockEscrowABI.abi,
          signer
        );
    
        // Calculate delay from bid deadline
        const deadlineTime = new Date(bid.deadline).getTime();
        const currentTime = Math.floor(Date.now() / 1000);
        const delaySeconds = Math.max(0, deadlineTime - currentTime);
    
        // Convert USD to ETH
        const ethAmount = await convertUsdToEth(bid.amount);
        const value = ethers.parseEther(ethAmount.toString());
    
        // Deposit and wait for transaction
        const tx = await escrow.deposit(delaySeconds, { value });
        const receipt = await tx.wait();
    
        // Get the deposit index from event logs
        const depositEvent = receipt.events?.find((e: any) => e.event === "Deposited");
        const escrowIndex = depositEvent?.args?.index.toNumber();
    
        // Update store with escrow index
        approveBid(bidId, escrowIndex);
    
      } catch (error) {
        console.error("Approval failed:", error);
      }
    };
  
    const handleReject = (bidId: string) => {
      rejectBid(bidId)
      // Add any additional logic like API calls
    }

    const filteredBids = bids
      .filter(bid => 
    (statusFilter === "all" || bid.status === statusFilter) &&
    (bid.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
     bid.bidder.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  .sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case 'lowest': return a.amount - b.amount
      case 'highest': return b.amount - a.amount
      case 'deadline': return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      default: return 0
    }
  })
  console.log(filteredBids[0])
  

  return (
    <div className="flex flex-col gap-2">
  <h1 className="text-3xl font-bold tracking-tight">DAO Bid Management</h1>
  <div className="flex items-center gap-4">
    <Input
      placeholder="Search bids..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="max-w-[300px]"
    />
    <p className="text-muted-foreground">
      Showing {filteredBids.length} bids ({bids.filter(b => b.status === 'pending').length} pending)
    </p>
  </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Active Bids</CardTitle>
            <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="lowest">Lowest Bid</SelectItem>
                  <SelectItem value="highest">Highest Bid</SelectItem>
                  <SelectItem value="deadline">Nearest Deadline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Bidder</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Timeframe</TableHead>
                <TableHead>Proposal</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{bid.taskTitle}</span>
                      <span className="text-sm text-muted-foreground">{bid.taskId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-sm">
                      {bid.bidder}
                    </Badge>
                  </TableCell>
                  <TableCell>${bid.amount}</TableCell>
                  <TableCell>{bid.days} days</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {bid.proposal}
                  </TableCell>
                  <TableCell>
                    <TaskTimer deadline={bid.deadline} />
                  </TableCell>
                  <TableCell>
                    <Badge variant={bid.status === "pending" ? "secondary" : "outline"}>
                      {bid.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(bid.id)}
                        disabled={bid.status !== "pending"}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(bid.id)}
                        disabled={bid.status !== "pending"}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

    // Convert USD amount to ETH
    const ethAmount = usdAmount / ethPrice;
    return Number(ethAmount.toFixed(6)); // Return with 6 decimal precision
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    throw new Error('Failed to convert USD to ETH');
  }
}
