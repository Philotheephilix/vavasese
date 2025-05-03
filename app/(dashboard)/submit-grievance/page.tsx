"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Camera, MapPin, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SubmitGrievancePage() {
  const [step, setStep] = useState(1)
  const [urgency, setUrgency] = useState<string | null>(null)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    alert("Grievance submitted successfully!")
    setStep(1)
  }

  const simulateAIAnalysis = () => {
    // Simulate AI analysis
    setTimeout(() => {
      setUrgency("High Priority: Pothole on Main St")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Submit a Grievance</h1>
        <p className="text-muted-foreground">Report local issues and track their resolution</p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>New Grievance</CardTitle>
              <CardDescription>Provide details about the issue you're reporting</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={step >= 1 ? "default" : "outline"}>Details</Badge>
              <Badge variant={step >= 2 ? "default" : "outline"}>Location</Badge>
              <Badge variant={step >= 3 ? "default" : "outline"}>Review</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="E.g., Pothole on Main Street" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the issue in detail..." rows={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                    <SelectItem value="safety">Public Safety</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Media</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted/50">
                    <Camera className="mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-medium">Take Photo</p>
                    <p className="text-xs text-muted-foreground">Use your camera to capture the issue</p>
                  </div>
                  <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted/50">
                    <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-medium">Upload Files</p>
                    <p className="text-xs text-muted-foreground">Upload photos or videos</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter the street address" />
              </div>
              <div className="space-y-2">
                <Label>Pin Location</Label>
                <div className="h-64 rounded-lg border bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Map integration would go here</p>
                    <p className="text-xs text-muted-foreground">Click on the map to pin the exact location</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="landmark">Nearby Landmark (Optional)</Label>
                <Input id="landmark" placeholder="E.g., Next to City Park" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">AI Analysis</h3>
                {!urgency ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border p-6">
                    <p className="mb-4 text-center text-sm text-muted-foreground">
                      Our AI will analyze your submission to determine urgency and suggest appropriate actions.
                    </p>
                    <Button onClick={simulateAIAnalysis}>Run AI Analysis</Button>
                  </div>
                ) : (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <span className="font-medium text-destructive">{urgency}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This issue has been classified as high priority due to safety concerns. Estimated response time:
                      24-48 hours.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium">Submission Summary</h3>
                <Separator className="my-2" />
                <dl className="space-y-4 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Title:</dt>
                    <dd className="col-span-2">Pothole on Main Street</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Category:</dt>
                    <dd className="col-span-2">Infrastructure</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Location:</dt>
                    <dd className="col-span-2">123 Main St, Anytown</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Description:</dt>
                    <dd className="col-span-2">
                      Large pothole approximately 2 feet wide causing traffic hazards and potential vehicle damage.
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Media:</dt>
                    <dd className="col-span-2">2 photos uploaded</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          {step < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit Grievance</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

