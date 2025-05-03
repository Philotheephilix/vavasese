"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Vote, Clock, Users, BarChart3, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export default function VotingPage() {
  const [votes, setVotes] = useState<Record<string, number>>({
    "park-renovation": 0,
    "road-repair": 0,
    "community-center": 0,
  })

  const [credits, setCredits] = useState(16)
  const maxCredits = 16

  const handleVoteChange = (id: string, value: number[]) => {
    const newValue = value[0]
    const oldValue = votes[id]
    const costDiff = Math.pow(newValue, 2) - Math.pow(oldValue, 2)

    if (credits - costDiff >= 0) {
      setVotes({ ...votes, [id]: newValue })
      setCredits(credits - costDiff)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Voting & Governance</h1>
        <p className="text-muted-foreground">Participate in quadratic voting to prioritize community issues</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Votes</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="history">Voting History</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quadratic Voting</CardTitle>
              <CardDescription>Your vote strength increases with the square root of credits spent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Available Credits:</span>
                    <Badge variant="outline">
                      {credits} of {maxCredits}
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
                          direction. Each additional vote on the same issue costs more credits.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Progress value={((maxCredits - credits) / maxCredits) * 100} />
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Park Renovation Funding</h3>
                      <p className="text-sm text-muted-foreground">Allocate funds for Central Park upgrades</p>
                    </div>
                    <Badge className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 3 days left
                    </Badge>
                  </div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        width={80}
                        height={80}
                        alt="Park"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        This proposal seeks to allocate $50,000 for renovating the Central Park playground, adding new
                        benches, and improving landscaping.
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>245 participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Vote className="h-3 w-3" />
                          <span>1,245 votes cast</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Your Vote: {votes["park-renovation"]}</span>
                      <span className="text-sm text-muted-foreground">
                        Cost: {Math.pow(votes["park-renovation"], 2)} credits
                      </span>
                    </div>
                    <Slider
                      value={[votes["park-renovation"]]}
                      max={4}
                      step={1}
                      onValueChange={(value) => handleVoteChange("park-renovation", value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Road Repair Prioritization</h3>
                      <p className="text-sm text-muted-foreground">Vote on which roads should be fixed first</p>
                    </div>
                    <Badge className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 5 days left
                    </Badge>
                  </div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        width={80}
                        height={80}
                        alt="Road"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Help decide which neighborhood roads should be prioritized for repair in the upcoming
                        infrastructure project.
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>178 participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Vote className="h-3 w-3" />
                          <span>890 votes cast</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Your Vote: {votes["road-repair"]}</span>
                      <span className="text-sm text-muted-foreground">
                        Cost: {Math.pow(votes["road-repair"], 2)} credits
                      </span>
                    </div>
                    <Slider
                      value={[votes["road-repair"]]}
                      max={4}
                      step={1}
                      onValueChange={(value) => handleVoteChange("road-repair", value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Community Center Programs</h3>
                      <p className="text-sm text-muted-foreground">Select new programs for the community center</p>
                    </div>
                    <Badge className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 1 week left
                    </Badge>
                  </div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        width={80}
                        height={80}
                        alt="Community Center"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Vote on which new programs should be added to the community center schedule, including youth
                        activities, senior programs, and educational workshops.
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>312 participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Vote className="h-3 w-3" />
                          <span>1,560 votes cast</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Your Vote: {votes["community-center"]}</span>
                      <span className="text-sm text-muted-foreground">
                        Cost: {Math.pow(votes["community-center"], 2)} credits
                      </span>
                    </div>
                    <Slider
                      value={[votes["community-center"]]}
                      max={4}
                      step={1}
                      onValueChange={(value) => handleVoteChange("community-center", value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit All Votes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voting Results</CardTitle>
              <CardDescription>Outcomes of recent community votes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Library Expansion Project</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        Approved
                      </Badge>
                      <span className="text-sm text-muted-foreground">Ended April 15, 2023</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Support</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Against</span>
                        <span>22%</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Total Participants: 432</span>
                      <span>Total Votes: 2,156</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Bike Lane Implementation</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        Approved
                      </Badge>
                      <span className="text-sm text-muted-foreground">Ended March 30, 2023</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Support</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Against</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Total Participants: 356</span>
                      <span>Total Votes: 1,780</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Public Art Installation</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                        Rejected
                      </Badge>
                      <span className="text-sm text-muted-foreground">Ended March 15, 2023</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Support</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Against</span>
                        <span>58%</span>
                      </div>
                      <Progress value={58} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Total Participants: 289</span>
                      <span>Total Votes: 1,445</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Voting History</CardTitle>
              <CardDescription>Record of your past votes and their impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left text-sm font-medium">Proposal</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Your Vote</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Outcome</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="px-4 py-2 text-sm font-medium">
                            {
                              [
                                "Library Expansion Project",
                                "Bike Lane Implementation",
                                "Public Art Installation",
                                "Community Garden Funding",
                                "Traffic Calming Measures",
                              ][i]
                            }
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {
                              [
                                "4 (Strong Support)",
                                "3 (Support)",
                                "1 (Weak Support)",
                                "0 (Neutral)",
                                "2 (Moderate Support)",
                              ][i]
                            }
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {i === 2 ? (
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
                            {
                              [
                                "April 15, 2023",
                                "March 30, 2023",
                                "March 15, 2023",
                                "February 28, 2023",
                                "February 15, 2023",
                              ][i]
                            }
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-4 w-4 text-muted-foreground" />
                              <span>{["High", "Medium", "Low", "None", "Medium"][i]}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-lg font-medium">Your Voting Impact</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">18</div>
                      <p className="text-sm text-muted-foreground">Votes Cast</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">72%</div>
                      <p className="text-sm text-muted-foreground">Alignment with Outcomes</p>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">4.2/5</div>
                      <p className="text-sm text-muted-foreground">Voting Reputation</p>
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

