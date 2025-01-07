import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { chains } from '@lens-network/sdk/viem';

async function fundPaymaster() {
  // Create clients
  const publicClient = createPublicClient({
    chain: chains.testnet,
    transport: http('https://rpc.testnet.lens.dev'),
  });

  // Load private key from env
  const privateKey = process.env.PK as `0x${string}`;
  const account = privateKeyToAccount(privateKey);

  // Create wallet client
  const walletClient = createWalletClient({
    account,
    chain: chains.testnet,
    transport: http('https://rpc.testnet.lens.dev'),
  });

  const paymasterAddress = '0x2F94A64652c950e6782F2382318d715f5E74B975';
  const fundingAmount = parseEther('0.001');

  try {
    // Get current balances
    const accountBalance = await publicClient.getBalance({ address: account.address });
    const paymasterBalance = await publicClient.getBalance({ address: paymasterAddress });

    console.log(`Account address: ${account.address}`);
    console.log(`Account balance: ${accountBalance} wei`);
    console.log(`Paymaster balance: ${paymasterBalance} wei`);
    console.log(`Attempting to send: ${fundingAmount} wei`);

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();
    console.log(`Current gas price: ${gasPrice} wei`);

    // Send transaction with GRASS as gas token
    const hash = await walletClient.sendTransaction({
      to: paymasterAddress,
      value: fundingAmount,
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: gasPrice,
    });

    console.log('Transaction hash:', hash);

    // Wait for transaction
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log('Transaction confirmed in block:', receipt.blockNumber);

    // Get new balance
    const newPaymasterBalance = await publicClient.getBalance({ address: paymasterAddress });
    console.log(`New paymaster balance: ${newPaymasterBalance} wei`);

  } catch (error) {
    console.error('Error:', error);
  }
}

fundPaymaster().catch(console.error);
