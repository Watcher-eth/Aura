// @ts-nocheck

import { wagmiConnectors } from "./wagmiConnectors";
import { Chain, createClient, fallback, http } from "viem";
import { hardhat, mainnet } from "viem/chains";
import { createConfig } from "wagmi";
import scaffoldConfig, { DEFAULT_ALCHEMY_API_KEY } from "~~/scaffold.config";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";
import { chains as LensChain } from "@lens-network/sdk/viem";

const { targetNetworks } = scaffoldConfig;

// Use LensChain.testnet and set the RPC URL
const enabledChains = ([
  {
    ...LensChain.testnet,
    rpcUrls: {
      default: "https://rpc.testnet.lens.dev",
    },
    nativeCurrency: {
      name: "GRASS",
      symbol: "GRASS",
      decimals: 18,
    },
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ekUwQwFzIM_DFTtHjn-511RtTjdKX9rTwZXPH1ID7u-8bEzaFRgmCX7k3zavbVcqvOc&usqp=CAU", // Replace with actual URL
  },
  ...targetNetworks,
  mainnet,
] as const)

export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    let rpcFallbacks = [http()];

    const alchemyHttpUrl = getAlchemyHttpUrl(chain.id);
    if (alchemyHttpUrl) {
      const isUsingDefaultKey = scaffoldConfig.alchemyApiKey === DEFAULT_ALCHEMY_API_KEY;
      // If using default Scaffold-ETH 2 API key, we prioritize the default RPC
      rpcFallbacks = isUsingDefaultKey ? [http(), http(alchemyHttpUrl)] : [http(alchemyHttpUrl), http()];
    }

    return createClient({
      chain,
      // transport: http(chain.rpcUrls.default),
      transport: fallback(rpcFallbacks),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});
