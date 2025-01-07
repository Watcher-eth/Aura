import { encodeFunctionData } from "viem";

export interface PaymasterParams {
  type: "General";
  innerInput: Uint8Array;
  paymasterInput: string;
}

// The general paymaster flow selector from IPaymasterFlow
const GENERAL_SELECTOR = "0x4E9E0eA7";

export async function getPaymasterParams(paymasterAddress: string): Promise<PaymasterParams> {
  return {
    type: "General",
    innerInput: new Uint8Array(),
    paymasterInput: GENERAL_SELECTOR
  };
}
