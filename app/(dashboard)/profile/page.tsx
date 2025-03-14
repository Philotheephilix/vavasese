"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, BarChart3, Bell, CheckCircle, Edit, Lock, MapPin, Shield, Wallet } from "lucide-react"

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account and contributions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Overview</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setEditMode(!editMode)}>
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h3 className="text-lg font-medium">Jane Doe</h3>
                <p className="text-sm text-muted-foreground">Joined January 2023</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Reputation Score</span>
                <Badge>4.8/5</Badge>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-muted-foreground">Based on reporting accuracy and voting activity</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Token Balance</span>
                <Badge variant="outline">250 Tokens</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3" />
                <span>Earned via submissions and voting</span>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Connected Wallet</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">0x1a2...3b4c</p>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <Shield className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Smart Wallet Integration</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  <span>Top Reporter</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Verified Citizen</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  <span>Active Voter</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Account Details</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" defaultValue="Jane" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" defaultValue="123 Main St, Anytown, USA" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">First Name</p>
                          <p>Jane</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                          <p>Doe</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>jane.doe@example.com</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p>(555) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                        <p>123 Main St, Anytown, USA</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {editMode && (
                    <div className="flex w-full gap-2">
                      <Button className="flex-1" onClick={() => setEditMode(false)}>
                        Save Changes
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Identity Verification</CardTitle>
                  <CardDescription>Verify your identity for enhanced platform access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Email Verification</p>
                        <p className="text-sm text-muted-foreground">Your email has been verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Phone Verification</p>
                        <p className="text-sm text-muted-foreground">Your phone number has been verified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">ID Verification</p>
                        <p className="text-sm text-muted-foreground">Your government ID has been verified</p>
                      </div>
                      <Badge>Verified</Badge>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">ZKP-based Anonymity</p>
                        <p className="text-sm text-muted-foreground">Enable privacy-preserving verification</p>
                      </div>
                      <Button size="sm">Enable</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {
                            [
                              <MapPin key={0} className="h-5 w-5 text-primary" />,
                              <BarChart3 key={1} className="h-5 w-5 text-primary" />,
                              <CheckCircle key={2} className="h-5 w-5 text-primary" />,
                              <Award key={3} className="h-5 w-5 text-primary" />,
                              <Wallet key={4} className="h-5 w-5 text-primary" />,
                            ][i]
                          }
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {
                              [
                                "Submitted a new grievance",
                                "Voted on Park Renovation Funding",
                                "Received a resolution for Broken Street Light",
                                "Earned 'Top Reporter' badge",
                                "Received 25 tokens for community contribution",
                              ][i]
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {["2 days ago", "1 week ago", "2 weeks ago", "1 month ago", "1 month ago"][i]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                  <CardDescription>Your contribution to community improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-2xl font-bold">16</div>
                      <p className="text-sm text-muted-foreground">Issues Reported</p>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-sm text-muted-foreground">Votes Cast</p>
                    </div>
                    <div className="rounded-lg border p-4 text-center">
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-sm text-muted-foreground">Issues Resolved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates about your grievances via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive text messages for urgent updates</p>
                      </div>
                      <Switch id="sms-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                      </div>
                      <Switch id="push-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="voting-reminders">Voting Reminders</Label>
                        <p className="text-sm text-muted-foreground">Get reminders about active voting sessions</p>
                      </div>
                      <Switch id="voting-reminders" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your data and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to see your profile and contributions
                        </p>
                      </div>
                      <Switch id="public-profile" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="anonymous-voting">Anonymous Voting</Label>
                        <p className="text-sm text-muted-foreground">Hide your identity when participating in votes</p>
                      </div>
                      <Switch id="anonymous-voting" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-sharing">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">Share anonymized data for community analytics</p>
                      </div>
                      <Switch id="data-sharing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="zkp-privacy">ZKP-based Privacy</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable zero-knowledge proofs for enhanced privacy
                        </p>
                      </div>
                      <Switch id="zkp-privacy" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Change Password</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Two-Factor Authentication</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Login Alerts</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

