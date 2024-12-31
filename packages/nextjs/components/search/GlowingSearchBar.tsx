"use client"

import { Search } from 'lucide-react'
import { Input } from '~~/@/components/ui/input'
import { cn } from '~~/utils/cn'
import { useState, useEffect } from 'react'

export default function GlowingSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearching(false)
        setSearchValue("")
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* Blurred backdrop */}
      {(isSearching && searchValue) && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => {
            setIsSearching(false)
            setSearchValue("")
          }}
        />
      )}
      
      <div className={cn(
        "w-full max-w-md mx-auto min-w-[25vw] hover:scale-102 transition-all duration-300",
        isSearching && "fixed top-7 left-1/2 -translate-x-1/2 z-50",
        (isSearching && searchValue) && "max-w-xl"
      )}>
        <div className="relative group hover:scale-102">
          <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-300 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 blur-sm" />
          <div className="relative  rounded-full p-[1px]">
            <div className="relative bg-white/20 backdrop-blur-lg border-2 border-[#eeeeee]/90 rounded-full  shadow-sm">
              <Search strokeWidth={2} className="absolute text-gray-400 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search any Contract, Coin or Address..."
                className={cn(
                  "pl-9 bg-white/20 backdrop-blur-lg hover:scale-102 rounded-full",
                  "border-none",
                  "shadow-sm",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "transition duration-300"
                )}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearching(true)}
              />
            </div>
          </div>
        </div>
        
        {/* Search results dialog */}
        {(isSearching && searchValue) && (
          <div className="absolute top-full left-0 min-h-[35vh] right-0 mt-2 bg-white/20 backdrop-blur-lg border-2 border-[#ededed]/40 rounded-lg shadow-lg border border-gray-200 p-4 max-h-[60vh] overflow-y-auto">
            {/* Add your search results here */}
            <div className="text-gray-500 text-sm">
              Start typing to see search results...
            </div>
          </div>
        )}
      </div>
    </>
  )
}
