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
import { useToast } from "@/components/ui/use-toast"

export default function SubmitGrievancePage() {
  const [step, setStep] = useState(1)
  const [urgency, setUrgency] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    address: "",
    landmark: "",
    mediaFiles: [] as File[],
  })

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData(prev => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, ...files]
      }))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const formPayload = new FormData()
      
      // Append form data
      formPayload.append('title', formData.title)
      formPayload.append('description', formData.description)
      formPayload.append('category', formData.category)
      formPayload.append('location', `${formData.address} ${formData.landmark}`)
      
      // Append image files
      formData.mediaFiles.forEach((file, index) => {
        formPayload.append(`image`, file)
      })

      const response = await fetch('https://cdp-agent.vercel.app/submit_grievance', {
        method: 'POST',
        body: formPayload
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      const result = await response.json()
      
      toast({
        title: "Grievance Submitted",
        description: "Your report has been successfully submitted to the blockchain",
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        address: "",
        landmark: "",
        mediaFiles: [],
      })
      setStep(1)
      setUrgency(null)

    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your grievance",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
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
                <Input 
                  id="title" 
                  placeholder="E.g., Pothole on Main Street" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the issue in detail..." 
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
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
                  <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted/50">
                    <Camera className="mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-medium">Take Photo</p>
                    <p className="text-xs text-muted-foreground">Use your camera to capture the issue</p>
                    <input 
                      type="file" 
                      className="hidden"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted/50">
                    <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-medium">Upload Files</p>
                    <p className="text-xs text-muted-foreground">Upload photos or videos</p>
                    <input 
                      type="file" 
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                {formData.mediaFiles.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {formData.mediaFiles.length} file(s) selected
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  placeholder="Enter the street address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
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
                <Input 
                  id="landmark" 
                  placeholder="E.g., Next to City Park"
                  value={formData.landmark}
                  onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Submission Summary</h3>
                <Separator className="my-2" />
                <dl className="space-y-4 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Title:</dt>
                    <dd className="col-span-2">{formData.title || "-"}</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Category:</dt>
                    <dd className="col-span-2">{formData.category || "-"}</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Location:</dt>
                    <dd className="col-span-2">
                      {[formData.address, formData.landmark].filter(Boolean).join(" - ")}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Description:</dt>
                    <dd className="col-span-2">{formData.description || "-"}</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="font-medium text-muted-foreground">Media:</dt>
                    <dd className="col-span-2">
                      {formData.mediaFiles.length} file(s) uploaded
                    </dd>
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
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Grievance"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}