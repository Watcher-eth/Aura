"use client"

import { Search } from 'lucide-react'
import { Input } from '~~/@/components/ui/input'
import { cn } from '~~/utils/cn'
import { useState, useEffect, useCallback } from 'react'
import { searchContracts, type SearchResult } from '~~/utils/search'
import { debounce } from 'lodash'
import Link from 'next/link'

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
  43114: {
    name: "Avalanche",
    icon: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  },
  250: {
    name: "Fantom",
    icon: "https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png",
  },
  100: {
    name: "Gnosis",
    icon: "https://assets.coingecko.com/coins/images/662/small/logo_square_simple_300px.png",
  },
  1284: {
    name: "Moonbeam",
    icon: "https://assets.coingecko.com/coins/images/22459/small/glmr.png",
  },
  1285: {
    name: "Moonriver",
    icon: "https://assets.coingecko.com/coins/images/17984/small/9285.png",
  },
  25: {
    name: "Cronos",
    icon: "https://assets.coingecko.com/coins/images/7310/small/cro_token_logo.png",
  },
  42220: {
    name: "Celo",
    icon: "https://assets.coingecko.com/coins/images/11090/small/InjXBNx9_400x400.jpg",
  },
  1666600000: {
    name: "Harmony",
    icon: "https://assets.coingecko.com/coins/images/4344/small/Y88JAze.png",
  },
  1088: {
    name: "Metis",
    icon: "https://assets.coingecko.com/coins/images/15595/small/metis.PNG",
  },
  2222: {
    name: "Kava",
    icon: "https://assets.coingecko.com/coins/images/9761/small/kava.png",
  },
  1313161554: {
    name: "Aurora",
    icon: "https://assets.coingecko.com/coins/images/20582/small/aurora.jpeg",
  },
  8217: {
    name: "Klaytn",
    icon: "https://assets.coingecko.com/coins/images/9672/small/klaytn.png",
  },
  66: {
    name: "OKX Chain",
    icon: "https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png",
  },
  1101: {
    name: "Polygon zkEVM",
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  },
  324: {
    name: "zkSync Era",
    icon: "https://assets.coingecko.com/coins/images/28137/small/zksync.png",
  },
};

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
          <div className="absolute top-full left-0 min-h-[35vh] right-0 mt-2 bg-white/20 backdrop-blur-lg border-2 border-[#ededed]/40 rounded-lg shadow-lg p-4 max-h-[60vh] overflow-y-auto w-full">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4 w-full">
                {searchResults.map((result, index) => (
                  <Link 
                    href={`/r/${result.address}`} 
                    key={index} 
                    className="block w-full"
                  >
                    <div 
                      key={`${result.chainId}-${result.address}`} 
                      className="flex items-center space-x-4 p-3 rounded-sm hover:bg-white/10 transition-colors w-full"
                    >
                      <div className="flex-shrink-0 w-10 h-10">
                        {result.imageUrl ? (
                          <img 
                            src={result.type === "ERC20"?  "https://cdn-icons-png.flaticon.com/512/6681/6681925.png" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX48JYpPPow8zQXp34oKHyqRbECSs1dUpOdw&s"} 
                            alt={result.name || 'Token'} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
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
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/[12%] border-[0.05rem] border-blue-500 text-blue-500">
                          {result.type || 'Contract'}
                        </span>
                        
                        <div className="flex items-center space-x-0.5 mt-1">
                        
                          <span className="text-xs text-gray-500">
                            {CHAIN_INFO[result.chainId]?.name || `Chain ${result.chainId}`}
                          </span>
                          <img 
                            src={CHAIN_INFO[result.chainId]?.icon} 
                            alt={CHAIN_INFO[result.chainId]?.name || 'Chain'} 
                            className="w-4 h-4 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
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
