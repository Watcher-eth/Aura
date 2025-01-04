"use client"

import { Search } from 'lucide-react'
import { Input } from '~~/@/components/ui/input'
import { cn } from '~~/utils/cn'
import { useState, useEffect, useCallback } from 'react'
import { searchContracts } from '~~/hooks/func/Covalent'
import { debounce } from 'lodash'
import Link from 'next/link'
import { SUPPORTED_CHAINS } from '~~/hooks/func/Covalent'
import { shortenAddress } from '~~/utils/address'

const CHAIN_INFO: { [key: number]: { name: string; icon: string } } = {
  1: {
    name: "Ethereum",
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  56: {
    name: "BNB Smart Chain",
    icon: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  },
  137: {
    name: "Polygon",
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  },
  42161: {
    name: "Arbitrum",
    icon: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  },
  10: {
    name: "Optimism",
    icon: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
  },
  8453: {
    name: "Base",
    icon: "https://assets.coingecko.com/coins/images/28892/small/base-token.png",
  },
  324: {
    name: "zkSync Era",
    icon: "https://assets.coingecko.com/coins/images/28137/small/zksync.png",
  },
  37111: {
    name: "Lens Testnet",
    icon: "https://assets.coingecko.com/coins/images/28561/small/lens.png",
  },
};

interface SearchResult {
  chain: number;
  address: string;
  name: string;
  ticker: string;
  type: string;
  balance?: string;
  quote?: number;
  lastTransferredAt?: string;
}

export default function GlowingSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const results = await searchContracts(query);
          setSearchResults(results);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
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

  console.log("searchResults: ", searchResults)
  return (
<div className="relative w-full">      {/* Blurred backdrop */}
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
            <div className="relative bg-white  border-2 border-[#eeeeee]/90 rounded-full shadow-sm">
              <Search strokeWidth={2} className="absolute text-gray-400 left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search any Contract, Coin or Address..."
                className={cn(
                  "pl-9   hover:scale-102 rounded-full",
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
          <div className="absolute top-full left-0 min-h-[35vh] right-0 mt-2 bg-white/20 backdrop-blur-lg border-2 border-[#ededed]/40 rounded-lg shadow-lg p-4 max-h-[60vh] overflow-y-auto w-full">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4 w-full">
                {searchResults.map((result, index) => (
                  <Link 
                    href={`/r/${result.chain}/${result.address}`} 
                    key={index} 
                    className="block w-full"
                  >
                    <div 
                      key={`${result.chain}-${result.contractAddress}`} 
                      className="flex items-center space-x-4 p-3 rounded-sm hover:bg-white/10 transition-colors w-full"
                    >
                      <div className="flex-shrink-0 w-11 h-11 relative">
                        <img 
                          src={result?.image || CHAIN_INFO[result.chain]?.icon || "https://cdn-icons-png.flaticon.com/512/6681/6681925.png"} 
                          alt={result.name || 'Contract'} 
                          className="w-full h-full rounded-full object-cover"
                        />
                           <img 
                          src={CHAIN_INFO[result.chain]?.icon || "https://cdn-icons-png.flaticon.com/512/6681/6681925.png"} 
                          alt={result.name || 'Contract'} 
                          className="h-5 w-5 bg-white rounded-sm absolute -bottom-1 -right-1 object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-md font-medium text-gray-900 truncate">
                          {result.name || 'Unknown Contract'}
                        </p>
                        <p className="text-sm text-[lightgray] truncate">
                          {result?.address}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${result.ticker || 'Unknown Chain'}
                        </p>
                        {result.type && (
                          <p className="text-xs text-[lightgray]">
                            {result.type.toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
