// @ts-nocheck

import { encodeFunctionData, encodeAbiParameters, parseAbiParameters, getGeneralPaymasterInput } from "viem";

export interface PaymasterParams {
  type: "General";
  innerInput: Uint8Array;
  paymasterInput: string;
}

// Moved paymaster functionality to use viem/zksync's getGeneralPaymasterInput
export async function getPaymasterParams(paymasterAddress: string): Promise<PaymasterParams> {
  const paymasterInput = await getGeneralPaymasterInput();

  return {
    type: "General",
    innerInput: new Uint8Array(),
    paymasterInput
  };
}
