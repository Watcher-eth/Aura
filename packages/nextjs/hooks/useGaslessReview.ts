// hooks/useGaslessReview.ts
import { useWalletClient } from "wagmi";
import { getPaymasterParams } from "../utils/paymaster";
import { createPublicClient, http, parseAbi } from "viem";
import { chains } from "@lens-network/sdk/viem";
import { ReviewRegistryAbi, ReviewRegistryAddress } from "~~/lib/foundryGenerated";




export function useGaslessReview() {
  const { data: walletClient } = useWalletClient();
  // Create a viem PublicClient for simulation & sending
  const publicClient = createPublicClient({
    chain: chains.testnet,
    transport: http("https://rpc.testnet.lens.dev"),
  });
  /**
   * Calls `ReviewRegistry.addReview` using your Gasless Paymaster
   */
  async function addReviewGasless(
    metadataURI: string,
    contractAddressToReview: `0x${string}`,
    rating: number
  ) {

    if (!walletClient) {
      throw new Error("No wallet client available. Connect a wallet first!");
    }

    try{
    // 1. Generate paymaster parameters
    const paymasterParams = await getPaymasterParams("0x2F94A64652c950e6782F2382318d715f5E74B975");

    // 2. Encode your addReview call data
    //    viem supports `encodeFunctionData` or we can do it manually:
    const { encodeFunctionData } = await import("viem");
    const data = encodeFunctionData({
      abi: ReviewRegistryAbi,
      functionName: "addReview",
      args: [metadataURI, contractAddressToReview, rating],
    });

    // 3. Optionally get the current gas price
    const gasPrice = await publicClient.getGasPrice();

    // 4. Attach the customData with your paymaster
    //    Example: set gasPerPubdata to ~20k if needed
    const customData = {
      gasPerPubdata: 20000n,
      paymasterParams,
    };

    // 5. Send the transaction
    //    This uses the wallet client from wagmi,
    //    which has a built-in account for signing
    const txHash = await walletClient.sendTransaction({
      to: ReviewRegistryAddress[37111],
      data,
      gasPrice,
      customData,
    });

    // 6. Wait for receipt if desired
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    return { txHash, receipt };}
    catch(err){
      console.log(err);
    }
  }

  return { addReviewGasless };
}
