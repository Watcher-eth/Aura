"use client"

import { Search } from 'lucide-react'
import { Input } from '~~/@/components/ui/input'
import { cn } from '~~/utils/cn'
import { useState, useEffect, useCallback } from 'react'
import { searchContracts, type SearchResult } from '~~/utils/search'
import { debounce } from 'lodash'

export default function GlowingSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        setIsLoading(true);
        searchContracts(query, (results) => {
          setSearchResults(results);
          setIsLoading(false);
          console.log(results)
        });
      } else {
        setSearchResults([]);
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearching(false)
        setSearchValue("")
        setSearchResults([])
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <>
      {/* Blurred backdrop */}
      {(isSearching && searchValue) && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => {
            setIsSearching(false)
            setSearchValue("")
            setSearchResults([])
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
          <div className="relative rounded-full p-[1px]">
            <div className="relative bg-white/20 backdrop-blur-lg border-2 border-[#eeeeee]/90 rounded-full shadow-sm">
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
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearching(true)}
              />
            </div>
          </div>
        </div>
        
        {/* Search results dialog */}
        {(isSearching && searchValue) && (
          <div className="absolute top-full left-0 min-h-[35vh] right-0 mt-2 bg-white/20 backdrop-blur-lg border-2 border-[#ededed]/40 rounded-lg shadow-lg p-4 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <div key={`${result.chainId}-${result.address}`} 
                       className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10">
                      {result.imageUrl ? (
                        <img 
                          src={result.imageUrl ?? "https://cdn-icons-png.flaticon.com/512/6681/6681925.png"} 
                          alt={result.name || 'Token'} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                          <Search className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {result.name || 'Unknown Contract'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {result.address.slice(0, 6)}...{result.address.slice(-4)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {result.type || 'Contract'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {result.chainId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm text-center py-4">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
