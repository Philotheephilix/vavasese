"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertCircle, BarChart3, CheckCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import { calculateStats, fetchTransactions } from "../../utils/History"
import { ChartDataPoint, CovalentResponse, Transaction, TransactionStats } from "../../utils/types"


const DEPARTMENTS = [
  { name: 'PWD', walletAddress: '0x3fA87a4D992196498f721371617ABC1fFbb6d2b5' },
  { name: 'Medical', walletAddress: '0xb5d85CBf7cB3EE0D56b3bB207D5Fc4B82f43F511' },
  { name: 'Education', walletAddress: '0x3fA87a4D992196498f721371617ABC1fFbb6d2b5' },
];

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const prepareChartData = (transactions: Transaction[]): ChartDataPoint[] => {
  return transactions.map(tx => ({
    date: formatDate(tx.block_signed_at),
    amount: parseFloat(tx.value_quote.toString())
  }))
}

const renderTransactions = (transactions: Transaction[], activeTab: "incoming" | "outgoing") => (
  <div>
    <h2 className="mt-8 text-2xl font-bold">Government Transactions</h2>
    <Table className="bg-muted/50 p-2">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>From/To</TableHead>
          <TableHead className="text-right">Amount (USD)</TableHead>
          <TableHead className="text-right">Gas Fee (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.tx_hash}>
            <TableCell>{formatDate(tx.block_signed_at)}</TableCell>
            <TableCell className="font-mono">
              {activeTab === "incoming" ? 
                `From: ${tx.from_address.slice(0,6)}...${tx.from_address.slice(-4)}` :
                `To: ${tx.to_address.slice(0,6)}...${tx.to_address.slice(-4)}`
              }
            </TableCell>
            <TableCell className="text-right">${tx.value_quote.toFixed(2)}</TableCell>
            <TableCell className="text-right">${tx.gas_quote.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

const renderChart = (transactions: Transaction[]) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsBarChart data={prepareChartData(transactions)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip  />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" name="Amount (USD)" />
    </RechartsBarChart>
  </ResponsiveContainer>
)

const renderStats = (stats: TransactionStats) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${stats.total}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stats.count}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Avg Value</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${stats.average}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Gas</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${stats.totalGas}</div>
      </CardContent>
    </Card>
  </div>
)

function GovernmentTransactions() {
  const [data, setData] = useState<CovalentResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"incoming" | "outgoing">("incoming")
  const [activeDepartment, setActiveDepartment] = useState(DEPARTMENTS[0])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const result = await fetchTransactions(activeDepartment.walletAddress)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load transactions")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [activeDepartment])

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      <span>Loading transactions...</span>
    </div>
  )

  if (error) return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )

  const processTransactions = () => {
    const items = data?.items || []
    return {
      incoming: items.filter(tx => tx.to_address.toLowerCase() === activeDepartment.walletAddress.toLowerCase()),
      outgoing: items.filter(tx => tx.from_address.toLowerCase() === activeDepartment.walletAddress.toLowerCase())
    }
  }

  const { incoming, outgoing } = processTransactions()
  const incomingStats = calculateStats(incoming)
  const outgoingStats = calculateStats(outgoing)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Department Transactions</CardTitle>
            <CardDescription>
              Tracking wallet for{' '}
              <select 
                value={activeDepartment.name}
                onChange={(e) => setActiveDepartment(DEPARTMENTS.find(d => d.name === e.target.value)!)}
                className="rounded-md px-2 py-1"
              >
                {DEPARTMENTS.map(dept => (
                  <option key={dept.name} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </CardDescription>
          </div>
         
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="incoming">
          {renderStats(incomingStats)}
          {renderChart(incoming)}
          {renderTransactions(incoming, "incoming")}
        </TabsContent>
        
        <TabsContent value="outgoing">
          {renderStats(outgoingStats)}
          {renderChart(outgoing)}
          {renderTransactions(outgoing, "outgoing")}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Original Dashboard Content */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Grievances</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Votes</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Active voting sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="transactions">Government Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Pothole on Main Street</p>
                  <p className="text-sm text-muted-foreground">You submitted a new grievance</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />2 days ago
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Broken Street Light</p>
                  <p className="text-sm text-muted-foreground">Issue marked as resolved</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />1 week ago
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Park Renovation Project</p>
                  <p className="text-sm text-muted-foreground">You voted on funding allocation</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />2 weeks ago
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        
        <TabsContent value="transactions" className="space-y-4">
          <GovernmentTransactions />
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/submit-grievance">
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Submit Grievance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Report a new issue in your community</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/voting">
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Participate in Voting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Help prioritize community issues</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/grievance-dashboard">
            <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Track Grievances</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View status of your reported issues</p>
              </CardContent>
            </Card>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

