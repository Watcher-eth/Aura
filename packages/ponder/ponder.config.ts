import { createConfig } from "@ponder/core"
import { http } from "viem"
import {
  ReviewRegistryConfig,
  BountyManagerConfig
} from "./lib/generated"

export const DEFAULT_CHAIN_ID = 37111
const DEFAULT_START_BLOCK = 20506690
const NETWORK_NAME = "lens"

const RPC_URL = "https://rpc.testnet.lens.dev"

export default createConfig({
  networks: {
    [NETWORK_NAME]: {
      chainId: DEFAULT_CHAIN_ID,
      transport: http(RPC_URL),
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