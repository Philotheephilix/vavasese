"use client"

import { useEffect } from "react"
import {create} from "zustand"
import { persist } from "zustand/middleware"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Vote, Clock, Users, BarChart3, Info, CheckCircle2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { toast } from "sonner"
import { useBidStore } from "@/lib/stores/bids"

interface Proposal {
  id: string
  title: string
  description: string
  image: string
  participants: number
  votesCast: number
  daysLeft: number
}

interface VotingState {
  credits: number
  votes: Record<string, number>
  proposals: Proposal[]
  submitted: boolean
  fetchProposals: () => Promise<void>
  handleVoteChange: (id: string, value: number) => void
  resetCredits: () => void
  submitVotes: () => void
}

const useStore = create<VotingState>()(
  persist(
    (set, get) => ({
      credits: 16,
      votes: {},
      proposals: [],
      submitted: false,
      fetchProposals: async () => {
        // Get approved bids from bid store
        const approvedBids = useBidStore.getState().bids.filter(bid => bid.status === 'approved')
        
        // Transform bids into proposals
        const proposals = approvedBids.map(bid => ({
          id: bid.id,
          title: bid.taskTitle,
          description: bid.proposal,
          image: "/placeholder.svg",
          participants: bid.days, // Using days as participants for example
          votesCast: bid.amount,  // Using amount as votes cast for example
          daysLeft: 7 // Default value for voting period
        }))

        set({ proposals })
      },
      handleVoteChange: (id, newValue) => {
        if (get().submitted) return
        
        const currentVotes = get().votes
        const oldValue = currentVotes[id] || 0
        const costDiff = Math.pow(newValue, 2) - Math.pow(oldValue, 2)
        
        if (get().credits - costDiff >= 0) {
          set({
            credits: get().credits - costDiff,
            votes: { ...currentVotes, [id]: newValue }
          })
        }
      },
      resetCredits: () => set({ credits: 16, votes: {}, submitted: false }),
      submitVotes: () => {
        if (get().submitted) return
        
        set({ submitted: true })
        toast.success("Votes submitted successfully!", {
          description: "Your votes have been recorded in the global storage.",
          icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
          position: "top-center"
        })
      }
    }),
    {
      name: "voting-storage",
      storage: {
        getItem: (name) => JSON.parse(localStorage.getItem(name) || 'null'),
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)

export default function VotingPage() {
  const {
    credits,
    votes,
    proposals,
    submitted,
    fetchProposals,
    handleVoteChange,
    resetCredits,
    submitVotes
  } = useStore()

  // Load approved bids on mount
  useEffect(() => {
    fetchProposals()
  }, [fetchProposals])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Voting & Governance</h1>
        <p className="text-muted-foreground">Participate in quadratic voting to prioritize community initiatives</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Votes</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Quadratic Voting
                {submitted && (
                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Votes Submitted
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {submitted 
                  ? "Your votes have been successfully recorded"
                  : "Your vote strength increases with the square root of credits spent"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <h3 className="text-xl font-semibold">Voting Complete</h3>
                  <p className="text-muted-foreground text-center">
                    Thank you for participating! Your votes have been permanently stored 
                    and cannot be modified.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Available Credits:</span>
                        <Badge variant="outline">
                          {credits} of 16
                        </Badge>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Voting Info</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Quadratic voting allows you to express the strength of your preferences, not just their
                              direction. Each additional vote on the same initiative costs more credits.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Progress value={((16 - credits) / 16) * 100} />
                  </div>

                  <div className="space-y-6">
                    {proposals.map((proposal) => (
                      <div key={proposal.id} className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{proposal.title}</h3>
                            <p className="text-sm text-muted-foreground">{proposal.description}</p>
                          </div>
                          <Badge className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {proposal.daysLeft} days left
                          </Badge>
                        </div>
                        <div className="mb-4 flex items-center gap-4">
                          <div className="h-20 w-20 overflow-hidden rounded-lg">
                            <Image
                              src={proposal.image}
                              width={80}
                              height={80}
                              alt={proposal.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{proposal.participants} participants</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Vote className="h-3 w-3" />
                                <span>{proposal.votesCast} votes cast</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Your Vote: {votes[proposal.id] || 0}</span>
                            <span className="text-sm text-muted-foreground">
                              Cost: {Math.pow(votes[proposal.id] || 0, 2)} credits
                            </span>
                          </div>
                          <Slider
                            value={[votes[proposal.id] || 0]}
                            max={4}
                            step={1}
                            onValueChange={(value) => handleVoteChange(proposal.id, value[0])}
                            disabled={submitted}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            {[0, 1, 2, 3, 4].map((num) => (
                              <span key={num}>{num}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
            {!submitted && (
              <CardFooter className="flex gap-2">
                <Button className="flex-1" onClick={resetCredits}>
                  Reset Votes
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={submitVotes}
                  disabled={Object.values(votes).every(v => v === 0)}
                >
                  Submit All Votes
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voting Results</CardTitle>
              <CardDescription>Historical results of community votes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">{proposal.title}</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span>Current Support</span>
                          <span>{votes[proposal.id] || 0} votes</span>
                        </div>
                        <Progress value={(votes[proposal.id] || 0) * 25} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Total Participants: {proposal.participants}</span>
                        <span>Total Votes: {proposal.votesCast}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}