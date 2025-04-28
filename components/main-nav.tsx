"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex">
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Home
        </Link>
        <Link
          href="/how-it-works"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/how-it-works" ? "text-foreground" : "text-foreground/60",
          )}
        >
          How It Works
        </Link>
        <Link
          href="/public-tracker"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/public-tracker" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Public Tracker
        </Link>
        <Link
          href="/faq"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/faq" ? "text-foreground" : "text-foreground/60",
          )}
        >
          FAQ
        </Link>
      </nav>
    </div>
  )
}

