import { encodeFunctionData, encodeAbiParameters, parseAbiParameters } from "viem";

export interface PaymasterParams {
  type: "General";
  innerInput: Uint8Array;
  paymasterInput: string;
}

// The general paymaster flow selector from IPaymasterFlow interface
const PAYMASTER_GENERAL_SELECTOR = "0xc2722916";

export async function getPaymasterParams(paymasterAddress: string): Promise<PaymasterParams> {
  // Empty bytes for general flow - no additional parameters needed
  const paymasterInput = PAYMASTER_GENERAL_SELECTOR;

  return {
    type: "General",
    innerInput: new Uint8Array(),
    paymasterInput
  };
}
