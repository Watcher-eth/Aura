"use client"

import { Search } from 'lucide-react'
import { Input } from '~~/@/components/ui/input'
import { cn } from '~~/utils/cn'

export default function GlowingSearch() {
  return (
    <div className="w-full max-w-md mx-auto min-w-[25vw] ">
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-300 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 blur-sm" />
        <div className="relative bg-white rounded-full p-[1px]">
          <div className="relative bg-white rounded-full border border-gray-200 shadow-sm">
            <Search strokeWidth={2} className="absolute text-gray-400 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search any Contract, Coin or Address..."
              className={cn(
                "pl-9 bg-white rounded-full",
                "border-none",
                "shadow-sm",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "transition duration-300"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
