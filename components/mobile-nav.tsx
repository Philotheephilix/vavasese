"use client"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-4 py-4">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium transition-colors hover:text-foreground/80">
            How It Works
          </Link>
          <Link href="/public-tracker" className="text-sm font-medium transition-colors hover:text-foreground/80">
            Public Tracker
          </Link>
          <Link href="/faq" className="text-sm font-medium transition-colors hover:text-foreground/80">
            FAQ
          </Link>
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full">Sign up</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

