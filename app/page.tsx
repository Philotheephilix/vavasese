import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, MapPin, Users } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-around w-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 justify-center flex ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Empowering Communities Through Civic Engagement
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Report local issues, track resolutions, and participate in community governance. Together, we can
                  build better neighborhoods.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="gap-1.5">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/landing_image.png"
                width={550}
                height={550}
                alt="Platform Overview"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted justify-center flex">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Making a Difference</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform connects citizens, workers, and local governance to solve community issues efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 bg-background">
              <div className="text-4xl font-bold">10,000+</div>
              <p className="text-sm text-muted-foreground">Issues Resolved</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 bg-background">
              <div className="text-4xl font-bold">5,000+</div>
              <p className="text-sm text-muted-foreground">Active Citizens</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 bg-background">
              <div className="text-4xl font-bold">1,200+</div>
              <p className="text-sm text-muted-foreground">Verified Workers</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-4 bg-background">
              <div className="text-4xl font-bold">$2.5M</div>
              <p className="text-sm text-muted-foreground">Community Funds Allocated</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 justify-center flex">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform connects citizens, workers, and local governance to solve community issues efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Report Issues</h3>
              <p className="text-center text-muted-foreground">
                Citizens report local issues with photos, descriptions, and location data.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Community Voting</h3>
              <p className="text-center text-muted-foreground">
                Participate in quadratic voting to prioritize issues and allocate resources.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Transparent Resolution</h3>
              <p className="text-center text-muted-foreground">
                Track progress, verify completion, and rate the quality of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted justify-center flex">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Community</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Be part of the solution. Sign up today and help improve your neighborhood.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

