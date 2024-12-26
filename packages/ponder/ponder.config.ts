import { createConfig } from "@ponder/core"
import { loadBalance } from "@ponder/utils"
import { http, parseAbiItem } from "viem"



import {
  ReviewRegistryConfig, BountyManagerConfig} from "./lib/generated"

  import { chains } from "@lens-network/sdk/viem";

export const DEFAULT_CHAIN = chains.testnet// baseSepolia
export const NETWORK_NAME = "base" //DEFAULT_CHAIN.network //"baseSepolia"
export const DEFAULT_CHAIN_ID = 37111


const DEFAULT_START_BLOCK = 96734 //15302654 // 13937650 //9097600 //12000000
//9097620 //11230080 // 11230082

const BASE_RPC_URL =
  "https://base-mainnet.g.alchemy.com/v2/zBh4KLxjpr1p3LncaGuHwgOA_X3J0b5F"
  // "https://base-sepolia.g.alchemy.com/v2/uoulk1rWzqeAL3tHK_QSEuNqiqb4l3xd"



//"https://base-sepolia.g.alchemy.com/v2/zBh4KLxjpr1p3LncaGuHwgOA_X3J0b5F"
export default createConfig({
  networks: {
    [NETWORK_NAME]: {
      chainId: DEFAULT_CHAIN_ID,
      transport: http(BASE_RPC_URL),
      // Swap existing transport for the below when we have more than one RPC
      // to loadBalance btwn
      // loadBalance([
      //   http(BASE_RPC_URL)
      // ])
    },
  },
  blocks: {
    LpPositionUpdate: {
      network: NETWORK_NAME,
      startBlock: DEFAULT_START_BLOCK,
      interval: 240, // 60 //60 / 12, // Every 60 seconds
    },
  },
  contracts: {
    ReviewRegistry: {
      abi: ReviewRegistryConfig.abi,
      address: ReviewRegistryConfig.address[DEFAULT_CHAIN_ID],
      network: NETWORK_NAME,
      startBlock: DEFAULT_START_BLOCK,
    },
    BountyManager: {
      abi: BountyManagerConfig.abi,
      address: BountyManagerConfig.address[DEFAULT_CHAIN_ID],
      network: NETWORK_NAME,
      startBlock: DEFAULT_START_BLOCK,
    },
  },
})