// hooks/useGaslessReview.ts
import { useWalletClient } from "wagmi";
import { getPaymasterParams } from "../utils/paymaster";
import { createPublicClient, http, encodeFunctionData } from "viem";
import { chains } from "@lens-network/sdk/viem";
import { ReviewRegistryAbi, ReviewRegistryAddress } from "~~/lib/foundryGenerated";
import { eip712WalletActions } from "viem/zksync";

export function useGaslessReview() {
  const { data: walletClient } = useWalletClient();
  const publicClient = createPublicClient({
    chain: chains.testnet,
    transport: http("https://rpc.testnet.lens.dev"),
  });

  async function addReviewGasless(
    metadataURI: string,
    contractAddressToReview: `0x${string}`,
    rating: number
  ) {
    if (!walletClient) {
      throw new Error("No wallet client available. Connect a wallet first!");
    }

    try {
      const paymasterAddress = "0x2F94A64652c950e6782F2382318d715f5E74B975";

      // Extend wallet client with zkSync actions
      const zkWalletClient = walletClient.extend(eip712WalletActions());

      // Send transaction with paymaster
      const txHash = await zkWalletClient.writeContract({
        address: ReviewRegistryAddress[37111],
        abi: ReviewRegistryAbi,
        functionName: "addReview",
        args: [metadataURI, contractAddressToReview, rating],
        paymaster: paymasterAddress,
        paymasterInput: "0xc2722916" // General paymaster flow selector
      });

      console.log("Transaction hash:", txHash);
      
      // Wait for receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
      return { txHash, receipt };
    } catch(err) {
      console.error("Error in addReviewGasless:", err);
      throw err;
    }
  }

  return { addReviewGasless };
}
