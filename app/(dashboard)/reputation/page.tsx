import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Star, ThumbsUp, Clock, UserCheck, Briefcase, Shield, Medal } from "lucide-react"

export default function ReputationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reputation Profile</h1>
        <p className="text-muted-foreground">Manage and improve your worker reputation score</p>
      </div>

      <div className="grid gap-6 ">
        <div className="space-y-6">
          <Tabs defaultValue="reviews" className="space-y-4">
            <TabsList>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="skills">Skills & Certifications</TabsTrigger>
              <TabsTrigger value="history">Work History</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                  <CardDescription>What others are saying about your work</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="text-xs text-muted-foreground">
                                  {
                                    [
                                      "May 12, 2023",
                                      "May 3, 2023",
                                      "April 28, 2023",
                                      "April 15, 2023",
                                      "March 30, 2023",
                                    ][i]
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star < [5, 4, 5, 5, 4][i] ? "fill-yellow-400 text-yellow-400" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-sm">
                            {
                              [
                                "John did an excellent job repairing the pothole on Main Street. He was prompt, professional, and the quality of work was outstanding. Would definitely recommend!",
                                "Very responsive and completed the work ahead of schedule. The street light is working perfectly now.",
                                "Did amazing work fixing the broken bench in the park. Attention to detail was impressive.",
                                "John was able to assess and fix the water leak quickly. Very knowledgeable and efficient.",
                                "Good work on the graffiti removal. Restored the wall to its original condition with no trace of the graffiti.",
                              ][i]
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Your verified skills and certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Primary Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Road Repair",
                          "Asphalt Work",
                          "Construction",
                          "Infrastructure Maintenance",
                          "Equipment Operation",
                          "Project Management",
                        ].map((skill, i) => (
                          <Badge key={i} className="bg-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Secondary Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Electrical Work",
                          "Plumbing",
                          "Concrete Work",
                          "Heavy Lifting",
                          "Site Safety",
                          "Traffic Management",
                        ].map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Certifications</h3>
                      <div className="space-y-3">
                        {[
                          {
                            name: "Certified Road Construction Technician",
                            issuer: "American Road & Transportation Builders Association",
                            date: "April 2022",
                          },
                          {
                            name: "Heavy Equipment Operator License",
                            issuer: "Department of Labor",
                            date: "June 2021",
                          },
                          {
                            name: "Workplace Safety Certificate",
                            issuer: "Occupational Safety and Health Administration",
                            date: "January 2023",
                          },
                          {
                            name: "Traffic Control Technician",
                            issuer: "American Traffic Safety Services Association",
                            date: "August 2022",
                          },
                        ].map((cert, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                            <Shield className="h-5 w-5 text-primary" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{cert.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {cert.issuer} • {cert.date}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            >
                              Verified
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline">Add New Certification</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Work History</CardTitle>
                  <CardDescription>Record of your completed tasks and projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left text-sm font-medium">Task</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Client</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Completion Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Rating</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 8 }).map((_, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="px-4 py-2 text-sm font-medium">
                                {
                                  [
                                    "Pothole Repair on Oak St",
                                    "Street Light Replacement on Main St",
                                    "Park Bench Repair at Central Park",
                                    "Sidewalk Repair on Elm St",
                                    "Fallen Tree Removal on Pine St",
                                    "Graffiti Removal at Community Center",
                                    "Water Leak Fix on Maple Ave",
                                    "Playground Equipment Repair",
                                  ][i]
                                }
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {
                                  [
                                    "City Public Works",
                                    "Sarah Miller",
                                    "Parks Department",
                                    "Tom Johnson",
                                    "Emergency Services",
                                    "Community Center",
                                    "Water Utility",
                                    "Parks Department",
                                  ][i]
                                }
                              </td>
                              <td className="px-4 py-2 text-sm">
                                {
                                  [
                                    "May 10, 2023",
                                    "April 28, 2023",
                                    "April 15, 2023",
                                    "April 5, 2023",
                                    "March 30, 2023",
                                    "March 22, 2023",
                                    "March 10, 2023",
                                    "February 28, 2023",
                                  ][i]
                                }
                              </td>
                              <td className="px-4 py-2 text-sm">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, star) => (
                                    <Star
                                      key={star}
                                      className={`h-3 w-3 ${
                                        star < [5, 4, 5, 5, 4, 5, 5, 4][i]
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-2 text-sm">${[450, 350, 200, 300, 600, 300, 350, 250][i]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-center">
                      <Button variant="outline">View All History</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Improve Your Reputation</CardTitle>
              <CardDescription>Tips and actions to enhance your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-sm font-medium flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-primary" />
                    Recommended Actions
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                      <span>
                        Complete your remaining 2 active tasks ahead of schedule to improve your on-time rating
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                      <span>Add photos of your recent completed work to showcase quality and attention to detail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                      <span>Renew your Traffic Safety certification which expires next month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-primary"></span>
                      <span>Request feedback from clients who haven't left reviews yet</span>
                    </li>
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h3 className="text-sm font-medium">Skill Development</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Take recommended courses to expand your qualifications and increase your task eligibility.
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                      View Courses
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-primary" />
                      <h3 className="text-sm font-medium">Request Endorsements</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Ask previous clients or fellow workers to endorse your skills and work quality.
                    </p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-sm">
                      Request Endorsement
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

