"use client"

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// Update the component to handle string dates
export function TaskTimer({ deadline }: { deadline: Date | string }) {
    const [timeLeft, setTimeLeft] = useState("Calculating...")
    const [validDeadline, setValidDeadline] = useState<Date | null>(null)
  
    useEffect(() => {
      try {
        const date = new Date(deadline)
        if (isNaN(date.getTime())) throw new Error("Invalid date")
        setValidDeadline(date)
      } catch (error) {
        setTimeLeft("Invalid deadline")
      }
    }, [deadline])
  
    useEffect(() => {
      if (!validDeadline) return
  
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const distance = validDeadline.getTime() - now
        
        if (distance < 0) {
          setTimeLeft("Expired")
          clearInterval(timer)
          return
        }
  
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        setTimeLeft(`${days}d ${hours}h`)
      }, 1000)
  
      return () => clearInterval(timer)
    }, [validDeadline])
  
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        <span>{timeLeft}</span>
      </Badge>
    )
  }