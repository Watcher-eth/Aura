"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function GlowingSearch() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative group">
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 
          rounded-lg blur opacity-0 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-1000
          group-hover:duration-200 animate-tilt"
        />
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className={cn(
              "pl-9 bg-background rounded-full",
              "border-none shadow-xl",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "transition duration-200"
            )}
          />
        </div>
      </div>
    </div>
  )
}

