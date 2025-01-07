import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BountyManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const bountyManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_reviewRegistry', internalType: 'address', type: 'address' },
      { name: '_feeAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'bounties',
    outputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'rewardPool', internalType: 'uint256', type: 'uint256' },
      { name: 'totalClaims', internalType: 'uint256', type: 'uint256' },
      { name: 'participants', internalType: 'uint256', type: 'uint256' },
      { name: 'active', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bountyCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'bountyId', internalType: 'uint256', type: 'uint256' }],
    name: 'claimBounty',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'participants', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createBounty',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'hasClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'reviewRegistry',
    outputs: [
      { name: '', internalType: 'contract ReviewRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address payable', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bountyId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'claimant',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'reward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BountyClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bountyId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'rewardPool',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'participants',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BountyCreated',
  },
] as const

/**
 *
 */
export const bountyManagerAddress = {
  37111: '0xEfaF4F9683F44Fb9634279455944e755F45694E2',
} as const

/**
 *
 */
export const bountyManagerConfig = {
  address: bountyManagerAddress,
  abi: bountyManagerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GaslessPaymaster
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gaslessPaymasterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_context', internalType: 'bytes', type: 'bytes' },
      {
        name: '_transaction',
        internalType: 'struct Transaction',
        type: 'tuple',
        components: [
          { name: 'txType', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'gasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'gasPerPubdataByteLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymaster', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'reserved', internalType: 'uint256[4]', type: 'uint256[4]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'factoryDeps', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'paymasterInput', internalType: 'bytes', type: 'bytes' },
          { name: 'reservedDynamic', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_txResult',
        internalType: 'enum ExecutionResult',
        type: 'uint8',
      },
      { name: '_maxRefundedGas', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'postTransaction',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_transaction',
        internalType: 'struct Transaction',
        type: 'tuple',
        components: [
          { name: 'txType', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'gasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'gasPerPubdataByteLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymaster', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'reserved', internalType: 'uint256[4]', type: 'uint256[4]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'factoryDeps', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'paymasterInput', internalType: 'bytes', type: 'bytes' },
          { name: 'reservedDynamic', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'validateAndPayForPaymasterTransaction',
    outputs: [
      { name: 'magic', internalType: 'bytes4', type: 'bytes4' },
      { name: 'context', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_to', internalType: 'address payable', type: 'address' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccountCodeStorage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAccountCodeStorageAbi = [
  {
    type: 'function',
    inputs: [{ name: '_input', internalType: 'uint256', type: 'uint256' }],
    name: 'getCodeHash',
    outputs: [{ name: 'codeHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_input', internalType: 'uint256', type: 'uint256' }],
    name: 'getCodeSize',
    outputs: [{ name: 'codeSize', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'getRawCodeHash',
    outputs: [{ name: 'codeHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'markAccountCodeHashAsConstructed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'storeAccountConstructedCodeHash',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'storeAccountConstructingCodeHash',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBaseToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBaseTokenAbi = [
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFromTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_l1Receiver', internalType: 'address', type: 'address' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_l1Receiver', internalType: 'address', type: 'address' },
      { name: '_additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'withdrawWithMessage',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_l2Sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_l1Receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_l2Sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_l1Receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_additionalData',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'WithdrawalWithMessage',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBootloaderUtilities
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBootloaderUtilitiesAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: '_transaction',
        internalType: 'struct Transaction',
        type: 'tuple',
        components: [
          { name: 'txType', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'gasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'gasPerPubdataByteLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymaster', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'reserved', internalType: 'uint256[4]', type: 'uint256[4]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'factoryDeps', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'paymasterInput', internalType: 'bytes', type: 'bytes' },
          { name: 'reservedDynamic', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'getTransactionHashes',
    outputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signedTxHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IComplexUpgrader
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iComplexUpgraderAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_delegateTo', internalType: 'address', type: 'address' },
      { name: '_calldata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgrade',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICompressor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iCompressorAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_bytecode', internalType: 'bytes', type: 'bytes' },
      { name: '_rawCompressedData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'publishCompressedBytecode',
    outputs: [
      { name: 'bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_numberOfStateDiffs', internalType: 'uint256', type: 'uint256' },
      {
        name: '_enumerationIndexSize',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_stateDiffs', internalType: 'bytes', type: 'bytes' },
      { name: '_compressedStateDiffs', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyCompressedStateDiffs',
    outputs: [
      { name: 'stateDiffHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IContractDeployer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iContractDeployerAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
      { name: '_bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_input', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'create',
    outputs: [{ name: 'newAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
      { name: '_bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_input', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'create2',
    outputs: [{ name: 'newAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
      { name: '_bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_input', internalType: 'bytes', type: 'bytes' },
      {
        name: '_aaVersion',
        internalType: 'enum IContractDeployer.AccountAbstractionVersion',
        type: 'uint8',
      },
    ],
    name: 'create2Account',
    outputs: [{ name: 'newAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
      { name: '_bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_input', internalType: 'bytes', type: 'bytes' },
      {
        name: '_aaVersion',
        internalType: 'enum IContractDeployer.AccountAbstractionVersion',
        type: 'uint8',
      },
    ],
    name: 'createAccount',
    outputs: [{ name: 'newAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'getAccountInfo',
    outputs: [
      {
        name: 'info',
        internalType: 'struct IContractDeployer.AccountInfo',
        type: 'tuple',
        components: [
          {
            name: 'supportedAAVersion',
            internalType: 'enum IContractDeployer.AccountAbstractionVersion',
            type: 'uint8',
          },
          {
            name: 'nonceOrdering',
            internalType: 'enum IContractDeployer.AccountNonceOrdering',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_sender', internalType: 'address', type: 'address' },
      { name: '_senderNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getNewAddressCreate',
    outputs: [{ name: 'newAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_sender', internalType: 'address', type: 'address' },
      { name: '_bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
      { name: '_input', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'getNewAddressCreate2',
    outputs: [{ name: 'newAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_version',
        internalType: 'enum IContractDeployer.AccountAbstractionVersion',
        type: 'uint8',
      },
    ],
    name: 'updateAccountVersion',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_nonceOrdering',
        internalType: 'enum IContractDeployer.AccountNonceOrdering',
        type: 'uint8',
      },
    ],
    name: 'updateNonceOrdering',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'accountAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonceOrdering',
        internalType: 'enum IContractDeployer.AccountNonceOrdering',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'AccountNonceOrderingUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'accountAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'aaVersion',
        internalType: 'enum IContractDeployer.AccountAbstractionVersion',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'AccountVersionUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'deployerAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'bytecodeHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ContractDeployed',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721Abi = [
  {
    type: 'function',
    inputs: [
      { name: '_approved', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_from',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_to', internalType: 'address', type: 'address', indexed: true },
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721EnumerableAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_approved', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_from',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_to', internalType: 'address', type: 'address', indexed: true },
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_approved', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '_name', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '_symbol', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_from',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: '_to', internalType: 'address', type: 'address', indexed: true },
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721TokenReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IImmutableSimulator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iImmutableSimulatorAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_dest', internalType: 'address', type: 'address' },
      { name: '_index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getImmutable',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_dest', internalType: 'address', type: 'address' },
      {
        name: '_immutables',
        internalType: 'struct ImmutableData[]',
        type: 'tuple[]',
        components: [
          { name: 'index', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'bytes32', type: 'bytes32' },
        ],
      },
    ],
    name: 'setImmutables',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IKnownCodesStorage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iKnownCodesStorageAbi = [
  {
    type: 'function',
    inputs: [{ name: '_hash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getMarker',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'markBytecodeAsPublished',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_shouldSendToL1', internalType: 'bool', type: 'bool' },
      { name: '_hashes', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'markFactoryDeps',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bytecodeHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sendBytecodeToL1',
        internalType: 'bool',
        type: 'bool',
        indexed: true,
      },
    ],
    name: 'MarkedAsKnown',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IL1Messenger
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const il1MessengerAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'requestBytecodeL1Publication',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_isService', internalType: 'bool', type: 'bool' },
      { name: '_key', internalType: 'bytes32', type: 'bytes32' },
      { name: '_value', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'sendL2ToL1Log',
    outputs: [
      { name: 'logIdInMerkleTree', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_message', internalType: 'bytes', type: 'bytes' }],
    name: 'sendToL1',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_bytecodeHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'BytecodeL1PublicationRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: '_hash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: '_message',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'L1MessageSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_l2log',
        internalType: 'struct L2ToL1Log',
        type: 'tuple',
        components: [
          { name: 'l2ShardId', internalType: 'uint8', type: 'uint8' },
          { name: 'isService', internalType: 'bool', type: 'bool' },
          { name: 'txNumberInBlock', internalType: 'uint16', type: 'uint16' },
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'key', internalType: 'bytes32', type: 'bytes32' },
          { name: 'value', internalType: 'bytes32', type: 'bytes32' },
        ],
        indexed: false,
      },
    ],
    name: 'L2ToL1LogSent',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INonceHolder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iNonceHolderAbi = [
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'getDeploymentNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'getMinNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'getRawNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_key', internalType: 'uint256', type: 'uint256' }],
    name: 'getValueUnderNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'increaseMinNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'incrementDeploymentNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_expectedNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'incrementMinNonceIfEquals',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isNonceUsed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_key', internalType: 'uint256', type: 'uint256' },
      { name: '_value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setValueUnderNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_key', internalType: 'uint256', type: 'uint256' },
      { name: '_shouldBeUsed', internalType: 'bool', type: 'bool' },
    ],
    name: 'validateNonceUsage',
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'accountAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'key', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ValueSetUnderNonce',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPaymaster
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPaymasterAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_context', internalType: 'bytes', type: 'bytes' },
      {
        name: '_transaction',
        internalType: 'struct Transaction',
        type: 'tuple',
        components: [
          { name: 'txType', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'gasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'gasPerPubdataByteLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymaster', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'reserved', internalType: 'uint256[4]', type: 'uint256[4]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'factoryDeps', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'paymasterInput', internalType: 'bytes', type: 'bytes' },
          { name: 'reservedDynamic', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: '_txHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_suggestedSignedHash',
        internalType: 'bytes32',
        type: 'bytes32',
      },
      {
        name: '_txResult',
        internalType: 'enum ExecutionResult',
        type: 'uint8',
      },
      { name: '_maxRefundedGas', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'postTransaction',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_txHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_suggestedSignedHash',
        internalType: 'bytes32',
        type: 'bytes32',
      },
      {
        name: '_transaction',
        internalType: 'struct Transaction',
        type: 'tuple',
        components: [
          { name: 'txType', internalType: 'uint256', type: 'uint256' },
          { name: 'from', internalType: 'uint256', type: 'uint256' },
          { name: 'to', internalType: 'uint256', type: 'uint256' },
          { name: 'gasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'gasPerPubdataByteLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymaster', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'reserved', internalType: 'uint256[4]', type: 'uint256[4]' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
          { name: 'factoryDeps', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'paymasterInput', internalType: 'bytes', type: 'bytes' },
          { name: 'reservedDynamic', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'validateAndPayForPaymasterTransaction',
    outputs: [
      { name: 'magic', internalType: 'bytes4', type: 'bytes4' },
      { name: 'context', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPaymasterFlow
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPaymasterFlowAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_minAllowance', internalType: 'uint256', type: 'uint256' },
      { name: '_innerInput', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'approvalBased',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'input', internalType: 'bytes', type: 'bytes' }],
    name: 'general',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPubdataChunkPublisher
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPubdataChunkPublisherAbi = [
  {
    type: 'function',
    inputs: [{ name: '_pubdata', internalType: 'bytes', type: 'bytes' }],
    name: 'chunkAndPublishPubdata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISystemContext
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSystemContextAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'baseFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'blockGasLimit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'chainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'coinbase',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'difficulty',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gasPerPubdataByte',
    outputs: [
      { name: 'gasPerPubdataByte', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'gasPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_batchNumber', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getBatchHash',
    outputs: [{ name: 'hash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBatchNumberAndTimestamp',
    outputs: [
      { name: 'blockNumber', internalType: 'uint128', type: 'uint128' },
      { name: 'blockTimestamp', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_block', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHashEVM',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockTimestamp',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentPubdataSpent',
    outputs: [
      { name: 'currentPubdataSpent', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getL2BlockNumberAndTimestamp',
    outputs: [
      { name: 'blockNumber', internalType: 'uint128', type: 'uint128' },
      { name: 'blockTimestamp', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'origin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'txNumberInBlock',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReviewRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const reviewRegistryAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'rating', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'addReview',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'reviewId', internalType: 'uint256', type: 'uint256' }],
    name: 'getReview',
    outputs: [
      {
        name: '',
        internalType: 'struct ReviewRegistry.Review',
        type: 'tuple',
        components: [
          { name: 'metadataURI', internalType: 'string', type: 'string' },
          { name: 'contractAddress', internalType: 'address', type: 'address' },
          { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
          { name: 'createdBy', internalType: 'address', type: 'address' },
          { name: 'rating', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalReviews',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reviewId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'reviewer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'contractName',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'rating', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'ReviewAdded',
  },
] as const

/**
 *
 */
export const reviewRegistryAddress = {
  37111: '0xBaf1813cFE54193D611fAB1a52A72c8BCC65c436',
} as const

/**
 *
 */
export const reviewRegistryConfig = {
  address: reviewRegistryAddress,
  abi: reviewRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const scriptAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'IS_SCRIPT',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bountyManagerAbi}__
 *
 *
 */
export const useReadBountyManager = /*#__PURE__*/ createUseReadContract({
  abi: bountyManagerAbi,
  address: bountyManagerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"bounties"`
 *
 *
 */
export const useReadBountyManagerBounties = /*#__PURE__*/ createUseReadContract(
  {
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'bounties',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"bountyCount"`
 *
 *
 */
export const useReadBountyManagerBountyCount =
  /*#__PURE__*/ createUseReadContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'bountyCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"feeAddress"`
 *
 *
 */
export const useReadBountyManagerFeeAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'feeAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"hasClaimed"`
 *
 *
 */
export const useReadBountyManagerHasClaimed =
  /*#__PURE__*/ createUseReadContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'hasClaimed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"reviewRegistry"`
 *
 *
 */
export const useReadBountyManagerReviewRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'reviewRegistry',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bountyManagerAbi}__
 *
 *
 */
export const useWriteBountyManager = /*#__PURE__*/ createUseWriteContract({
  abi: bountyManagerAbi,
  address: bountyManagerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"claimBounty"`
 *
 *
 */
export const useWriteBountyManagerClaimBounty =
  /*#__PURE__*/ createUseWriteContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'claimBounty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"createBounty"`
 *
 *
 */
export const useWriteBountyManagerCreateBounty =
  /*#__PURE__*/ createUseWriteContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'createBounty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"withdraw"`
 *
 *
 */
export const useWriteBountyManagerWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bountyManagerAbi}__
 *
 *
 */
export const useSimulateBountyManager = /*#__PURE__*/ createUseSimulateContract(
  { abi: bountyManagerAbi, address: bountyManagerAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"claimBounty"`
 *
 *
 */
export const useSimulateBountyManagerClaimBounty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'claimBounty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"createBounty"`
 *
 *
 */
export const useSimulateBountyManagerCreateBounty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'createBounty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bountyManagerAbi}__ and `functionName` set to `"withdraw"`
 *
 *
 */
export const useSimulateBountyManagerWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bountyManagerAbi}__
 *
 *
 */
export const useWatchBountyManagerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bountyManagerAbi}__ and `eventName` set to `"BountyClaimed"`
 *
 *
 */
export const useWatchBountyManagerBountyClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    eventName: 'BountyClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bountyManagerAbi}__ and `eventName` set to `"BountyCreated"`
 *
 *
 */
export const useWatchBountyManagerBountyCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bountyManagerAbi,
    address: bountyManagerAddress,
    eventName: 'BountyCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__
 */
export const useReadGaslessPaymaster = /*#__PURE__*/ createUseReadContract({
  abi: gaslessPaymasterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadGaslessPaymasterOwner = /*#__PURE__*/ createUseReadContract(
  { abi: gaslessPaymasterAbi, functionName: 'owner' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__
 */
export const useWriteGaslessPaymaster = /*#__PURE__*/ createUseWriteContract({
  abi: gaslessPaymasterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"postTransaction"`
 */
export const useWriteGaslessPaymasterPostTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: gaslessPaymasterAbi,
    functionName: 'postTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteGaslessPaymasterRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: gaslessPaymasterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteGaslessPaymasterTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: gaslessPaymasterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useWriteGaslessPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: gaslessPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteGaslessPaymasterWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: gaslessPaymasterAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__
 */
export const useSimulateGaslessPaymaster =
  /*#__PURE__*/ createUseSimulateContract({ abi: gaslessPaymasterAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"postTransaction"`
 */
export const useSimulateGaslessPaymasterPostTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gaslessPaymasterAbi,
    functionName: 'postTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateGaslessPaymasterRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gaslessPaymasterAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateGaslessPaymasterTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gaslessPaymasterAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useSimulateGaslessPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gaslessPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateGaslessPaymasterWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gaslessPaymasterAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gaslessPaymasterAbi}__
 */
export const useWatchGaslessPaymasterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: gaslessPaymasterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link gaslessPaymasterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchGaslessPaymasterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: gaslessPaymasterAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__
 */
export const useReadIAccountCodeStorage = /*#__PURE__*/ createUseReadContract({
  abi: iAccountCodeStorageAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"getCodeHash"`
 */
export const useReadIAccountCodeStorageGetCodeHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'getCodeHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"getCodeSize"`
 */
export const useReadIAccountCodeStorageGetCodeSize =
  /*#__PURE__*/ createUseReadContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'getCodeSize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"getRawCodeHash"`
 */
export const useReadIAccountCodeStorageGetRawCodeHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'getRawCodeHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__
 */
export const useWriteIAccountCodeStorage = /*#__PURE__*/ createUseWriteContract(
  { abi: iAccountCodeStorageAbi },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"markAccountCodeHashAsConstructed"`
 */
export const useWriteIAccountCodeStorageMarkAccountCodeHashAsConstructed =
  /*#__PURE__*/ createUseWriteContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'markAccountCodeHashAsConstructed',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"storeAccountConstructedCodeHash"`
 */
export const useWriteIAccountCodeStorageStoreAccountConstructedCodeHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'storeAccountConstructedCodeHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"storeAccountConstructingCodeHash"`
 */
export const useWriteIAccountCodeStorageStoreAccountConstructingCodeHash =
  /*#__PURE__*/ createUseWriteContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'storeAccountConstructingCodeHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__
 */
export const useSimulateIAccountCodeStorage =
  /*#__PURE__*/ createUseSimulateContract({ abi: iAccountCodeStorageAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"markAccountCodeHashAsConstructed"`
 */
export const useSimulateIAccountCodeStorageMarkAccountCodeHashAsConstructed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'markAccountCodeHashAsConstructed',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"storeAccountConstructedCodeHash"`
 */
export const useSimulateIAccountCodeStorageStoreAccountConstructedCodeHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'storeAccountConstructedCodeHash',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iAccountCodeStorageAbi}__ and `functionName` set to `"storeAccountConstructingCodeHash"`
 */
export const useSimulateIAccountCodeStorageStoreAccountConstructingCodeHash =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iAccountCodeStorageAbi,
    functionName: 'storeAccountConstructingCodeHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBaseTokenAbi}__
 */
export const useReadIBaseToken = /*#__PURE__*/ createUseReadContract({
  abi: iBaseTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIBaseTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: iBaseTokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIBaseTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: iBaseTokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadIBaseTokenName = /*#__PURE__*/ createUseReadContract({
  abi: iBaseTokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIBaseTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: iBaseTokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIBaseTokenTotalSupply = /*#__PURE__*/ createUseReadContract(
  { abi: iBaseTokenAbi, functionName: 'totalSupply' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iBaseTokenAbi}__
 */
export const useWriteIBaseToken = /*#__PURE__*/ createUseWriteContract({
  abi: iBaseTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteIBaseTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: iBaseTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"transferFromTo"`
 */
export const useWriteIBaseTokenTransferFromTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: iBaseTokenAbi,
    functionName: 'transferFromTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteIBaseTokenWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: iBaseTokenAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"withdrawWithMessage"`
 */
export const useWriteIBaseTokenWithdrawWithMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: iBaseTokenAbi,
    functionName: 'withdrawWithMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iBaseTokenAbi}__
 */
export const useSimulateIBaseToken = /*#__PURE__*/ createUseSimulateContract({
  abi: iBaseTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIBaseTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iBaseTokenAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"transferFromTo"`
 */
export const useSimulateIBaseTokenTransferFromTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iBaseTokenAbi,
    functionName: 'transferFromTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateIBaseTokenWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iBaseTokenAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iBaseTokenAbi}__ and `functionName` set to `"withdrawWithMessage"`
 */
export const useSimulateIBaseTokenWithdrawWithMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iBaseTokenAbi,
    functionName: 'withdrawWithMessage',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iBaseTokenAbi}__
 */
export const useWatchIBaseTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: iBaseTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iBaseTokenAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchIBaseTokenMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iBaseTokenAbi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iBaseTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIBaseTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iBaseTokenAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iBaseTokenAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchIBaseTokenWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iBaseTokenAbi,
    eventName: 'Withdrawal',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iBaseTokenAbi}__ and `eventName` set to `"WithdrawalWithMessage"`
 */
export const useWatchIBaseTokenWithdrawalWithMessageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iBaseTokenAbi,
    eventName: 'WithdrawalWithMessage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBootloaderUtilitiesAbi}__
 */
export const useReadIBootloaderUtilities = /*#__PURE__*/ createUseReadContract({
  abi: iBootloaderUtilitiesAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBootloaderUtilitiesAbi}__ and `functionName` set to `"getTransactionHashes"`
 */
export const useReadIBootloaderUtilitiesGetTransactionHashes =
  /*#__PURE__*/ createUseReadContract({
    abi: iBootloaderUtilitiesAbi,
    functionName: 'getTransactionHashes',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iComplexUpgraderAbi}__
 */
export const useWriteIComplexUpgrader = /*#__PURE__*/ createUseWriteContract({
  abi: iComplexUpgraderAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iComplexUpgraderAbi}__ and `functionName` set to `"upgrade"`
 */
export const useWriteIComplexUpgraderUpgrade =
  /*#__PURE__*/ createUseWriteContract({
    abi: iComplexUpgraderAbi,
    functionName: 'upgrade',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iComplexUpgraderAbi}__
 */
export const useSimulateIComplexUpgrader =
  /*#__PURE__*/ createUseSimulateContract({ abi: iComplexUpgraderAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iComplexUpgraderAbi}__ and `functionName` set to `"upgrade"`
 */
export const useSimulateIComplexUpgraderUpgrade =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iComplexUpgraderAbi,
    functionName: 'upgrade',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCompressorAbi}__
 */
export const useWriteICompressor = /*#__PURE__*/ createUseWriteContract({
  abi: iCompressorAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCompressorAbi}__ and `functionName` set to `"publishCompressedBytecode"`
 */
export const useWriteICompressorPublishCompressedBytecode =
  /*#__PURE__*/ createUseWriteContract({
    abi: iCompressorAbi,
    functionName: 'publishCompressedBytecode',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iCompressorAbi}__ and `functionName` set to `"verifyCompressedStateDiffs"`
 */
export const useWriteICompressorVerifyCompressedStateDiffs =
  /*#__PURE__*/ createUseWriteContract({
    abi: iCompressorAbi,
    functionName: 'verifyCompressedStateDiffs',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCompressorAbi}__
 */
export const useSimulateICompressor = /*#__PURE__*/ createUseSimulateContract({
  abi: iCompressorAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCompressorAbi}__ and `functionName` set to `"publishCompressedBytecode"`
 */
export const useSimulateICompressorPublishCompressedBytecode =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCompressorAbi,
    functionName: 'publishCompressedBytecode',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iCompressorAbi}__ and `functionName` set to `"verifyCompressedStateDiffs"`
 */
export const useSimulateICompressorVerifyCompressedStateDiffs =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iCompressorAbi,
    functionName: 'verifyCompressedStateDiffs',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iContractDeployerAbi}__
 */
export const useReadIContractDeployer = /*#__PURE__*/ createUseReadContract({
  abi: iContractDeployerAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"getAccountInfo"`
 */
export const useReadIContractDeployerGetAccountInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: iContractDeployerAbi,
    functionName: 'getAccountInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"getNewAddressCreate"`
 */
export const useReadIContractDeployerGetNewAddressCreate =
  /*#__PURE__*/ createUseReadContract({
    abi: iContractDeployerAbi,
    functionName: 'getNewAddressCreate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"getNewAddressCreate2"`
 */
export const useReadIContractDeployerGetNewAddressCreate2 =
  /*#__PURE__*/ createUseReadContract({
    abi: iContractDeployerAbi,
    functionName: 'getNewAddressCreate2',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iContractDeployerAbi}__
 */
export const useWriteIContractDeployer = /*#__PURE__*/ createUseWriteContract({
  abi: iContractDeployerAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"create"`
 */
export const useWriteIContractDeployerCreate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iContractDeployerAbi,
    functionName: 'create',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"create2"`
 */
export const useWriteIContractDeployerCreate2 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iContractDeployerAbi,
    functionName: 'create2',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"create2Account"`
 */
export const useWriteIContractDeployerCreate2Account =
  /*#__PURE__*/ createUseWriteContract({
    abi: iContractDeployerAbi,
    functionName: 'create2Account',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"createAccount"`
 */
export const useWriteIContractDeployerCreateAccount =
  /*#__PURE__*/ createUseWriteContract({
    abi: iContractDeployerAbi,
    functionName: 'createAccount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"updateAccountVersion"`
 */
export const useWriteIContractDeployerUpdateAccountVersion =
  /*#__PURE__*/ createUseWriteContract({
    abi: iContractDeployerAbi,
    functionName: 'updateAccountVersion',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"updateNonceOrdering"`
 */
export const useWriteIContractDeployerUpdateNonceOrdering =
  /*#__PURE__*/ createUseWriteContract({
    abi: iContractDeployerAbi,
    functionName: 'updateNonceOrdering',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iContractDeployerAbi}__
 */
export const useSimulateIContractDeployer =
  /*#__PURE__*/ createUseSimulateContract({ abi: iContractDeployerAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"create"`
 */
export const useSimulateIContractDeployerCreate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iContractDeployerAbi,
    functionName: 'create',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"create2"`
 */
export const useSimulateIContractDeployerCreate2 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iContractDeployerAbi,
    functionName: 'create2',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"create2Account"`
 */
export const useSimulateIContractDeployerCreate2Account =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iContractDeployerAbi,
    functionName: 'create2Account',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"createAccount"`
 */
export const useSimulateIContractDeployerCreateAccount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iContractDeployerAbi,
    functionName: 'createAccount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"updateAccountVersion"`
 */
export const useSimulateIContractDeployerUpdateAccountVersion =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iContractDeployerAbi,
    functionName: 'updateAccountVersion',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iContractDeployerAbi}__ and `functionName` set to `"updateNonceOrdering"`
 */
export const useSimulateIContractDeployerUpdateNonceOrdering =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iContractDeployerAbi,
    functionName: 'updateNonceOrdering',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iContractDeployerAbi}__
 */
export const useWatchIContractDeployerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: iContractDeployerAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iContractDeployerAbi}__ and `eventName` set to `"AccountNonceOrderingUpdated"`
 */
export const useWatchIContractDeployerAccountNonceOrderingUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iContractDeployerAbi,
    eventName: 'AccountNonceOrderingUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iContractDeployerAbi}__ and `eventName` set to `"AccountVersionUpdated"`
 */
export const useWatchIContractDeployerAccountVersionUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iContractDeployerAbi,
    eventName: 'AccountVersionUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iContractDeployerAbi}__ and `eventName` set to `"ContractDeployed"`
 */
export const useWatchIContractDeployerContractDeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iContractDeployerAbi,
    eventName: 'ContractDeployed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useReadIerc20Permit = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadIerc20PermitDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc20PermitAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadIerc20PermitNonces = /*#__PURE__*/ createUseReadContract({
  abi: ierc20PermitAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useWriteIerc20Permit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteIerc20PermitPermit = /*#__PURE__*/ createUseWriteContract({
  abi: ierc20PermitAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const useSimulateIerc20Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateIerc20PermitPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc20PermitAbi,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useReadIerc721 = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721Abi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: ierc721Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721Abi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useWriteIerc721 = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721TransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: ierc721Abi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useSimulateIerc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__
 */
export const useWatchIerc721Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc721Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__
 */
export const useReadIerc721Enumerable = /*#__PURE__*/ createUseReadContract({
  abi: ierc721EnumerableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721EnumerableBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721EnumerableGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721EnumerableIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721EnumerableOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721EnumerableSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadIerc721EnumerableTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadIerc721EnumerableTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc721EnumerableTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721EnumerableAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__
 */
export const useWriteIerc721Enumerable = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721EnumerableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721EnumerableApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721EnumerableAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721EnumerableSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721EnumerableAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721EnumerableSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721EnumerableAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721EnumerableTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721EnumerableAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__
 */
export const useSimulateIerc721Enumerable =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc721EnumerableAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721EnumerableApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721EnumerableAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721EnumerableSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721EnumerableAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721EnumerableSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721EnumerableAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721EnumerableTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721EnumerableAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721EnumerableAbi}__
 */
export const useWatchIerc721EnumerableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc721EnumerableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721EnumerableApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721EnumerableAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721EnumerableApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721EnumerableAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721EnumerableAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721EnumerableTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721EnumerableAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useReadIerc721Metadata = /*#__PURE__*/ createUseReadContract({
  abi: ierc721MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721MetadataGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721MetadataIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc721MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721MetadataOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721MetadataSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc721MetadataSymbol = /*#__PURE__*/ createUseReadContract(
  { abi: ierc721MetadataAbi, functionName: 'symbol' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadIerc721MetadataTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useWriteIerc721Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: ierc721MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useSimulateIerc721Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const useWatchIerc721MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721MetadataApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__
 */
export const useWriteIerc721TokenReceiver =
  /*#__PURE__*/ createUseWriteContract({ abi: ierc721TokenReceiverAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteIerc721TokenReceiverOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: ierc721TokenReceiverAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__
 */
export const useSimulateIerc721TokenReceiver =
  /*#__PURE__*/ createUseSimulateContract({ abi: ierc721TokenReceiverAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ierc721TokenReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateIerc721TokenReceiverOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ierc721TokenReceiverAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iImmutableSimulatorAbi}__
 */
export const useReadIImmutableSimulator = /*#__PURE__*/ createUseReadContract({
  abi: iImmutableSimulatorAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iImmutableSimulatorAbi}__ and `functionName` set to `"getImmutable"`
 */
export const useReadIImmutableSimulatorGetImmutable =
  /*#__PURE__*/ createUseReadContract({
    abi: iImmutableSimulatorAbi,
    functionName: 'getImmutable',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iImmutableSimulatorAbi}__
 */
export const useWriteIImmutableSimulator = /*#__PURE__*/ createUseWriteContract(
  { abi: iImmutableSimulatorAbi },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iImmutableSimulatorAbi}__ and `functionName` set to `"setImmutables"`
 */
export const useWriteIImmutableSimulatorSetImmutables =
  /*#__PURE__*/ createUseWriteContract({
    abi: iImmutableSimulatorAbi,
    functionName: 'setImmutables',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iImmutableSimulatorAbi}__
 */
export const useSimulateIImmutableSimulator =
  /*#__PURE__*/ createUseSimulateContract({ abi: iImmutableSimulatorAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iImmutableSimulatorAbi}__ and `functionName` set to `"setImmutables"`
 */
export const useSimulateIImmutableSimulatorSetImmutables =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iImmutableSimulatorAbi,
    functionName: 'setImmutables',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__
 */
export const useReadIKnownCodesStorage = /*#__PURE__*/ createUseReadContract({
  abi: iKnownCodesStorageAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__ and `functionName` set to `"getMarker"`
 */
export const useReadIKnownCodesStorageGetMarker =
  /*#__PURE__*/ createUseReadContract({
    abi: iKnownCodesStorageAbi,
    functionName: 'getMarker',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__
 */
export const useWriteIKnownCodesStorage = /*#__PURE__*/ createUseWriteContract({
  abi: iKnownCodesStorageAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__ and `functionName` set to `"markBytecodeAsPublished"`
 */
export const useWriteIKnownCodesStorageMarkBytecodeAsPublished =
  /*#__PURE__*/ createUseWriteContract({
    abi: iKnownCodesStorageAbi,
    functionName: 'markBytecodeAsPublished',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__ and `functionName` set to `"markFactoryDeps"`
 */
export const useWriteIKnownCodesStorageMarkFactoryDeps =
  /*#__PURE__*/ createUseWriteContract({
    abi: iKnownCodesStorageAbi,
    functionName: 'markFactoryDeps',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__
 */
export const useSimulateIKnownCodesStorage =
  /*#__PURE__*/ createUseSimulateContract({ abi: iKnownCodesStorageAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__ and `functionName` set to `"markBytecodeAsPublished"`
 */
export const useSimulateIKnownCodesStorageMarkBytecodeAsPublished =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iKnownCodesStorageAbi,
    functionName: 'markBytecodeAsPublished',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iKnownCodesStorageAbi}__ and `functionName` set to `"markFactoryDeps"`
 */
export const useSimulateIKnownCodesStorageMarkFactoryDeps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iKnownCodesStorageAbi,
    functionName: 'markFactoryDeps',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iKnownCodesStorageAbi}__
 */
export const useWatchIKnownCodesStorageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: iKnownCodesStorageAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iKnownCodesStorageAbi}__ and `eventName` set to `"MarkedAsKnown"`
 */
export const useWatchIKnownCodesStorageMarkedAsKnownEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iKnownCodesStorageAbi,
    eventName: 'MarkedAsKnown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link il1MessengerAbi}__
 */
export const useWriteIl1Messenger = /*#__PURE__*/ createUseWriteContract({
  abi: il1MessengerAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link il1MessengerAbi}__ and `functionName` set to `"requestBytecodeL1Publication"`
 */
export const useWriteIl1MessengerRequestBytecodeL1Publication =
  /*#__PURE__*/ createUseWriteContract({
    abi: il1MessengerAbi,
    functionName: 'requestBytecodeL1Publication',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link il1MessengerAbi}__ and `functionName` set to `"sendL2ToL1Log"`
 */
export const useWriteIl1MessengerSendL2ToL1Log =
  /*#__PURE__*/ createUseWriteContract({
    abi: il1MessengerAbi,
    functionName: 'sendL2ToL1Log',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link il1MessengerAbi}__ and `functionName` set to `"sendToL1"`
 */
export const useWriteIl1MessengerSendToL1 =
  /*#__PURE__*/ createUseWriteContract({
    abi: il1MessengerAbi,
    functionName: 'sendToL1',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link il1MessengerAbi}__
 */
export const useSimulateIl1Messenger = /*#__PURE__*/ createUseSimulateContract({
  abi: il1MessengerAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link il1MessengerAbi}__ and `functionName` set to `"requestBytecodeL1Publication"`
 */
export const useSimulateIl1MessengerRequestBytecodeL1Publication =
  /*#__PURE__*/ createUseSimulateContract({
    abi: il1MessengerAbi,
    functionName: 'requestBytecodeL1Publication',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link il1MessengerAbi}__ and `functionName` set to `"sendL2ToL1Log"`
 */
export const useSimulateIl1MessengerSendL2ToL1Log =
  /*#__PURE__*/ createUseSimulateContract({
    abi: il1MessengerAbi,
    functionName: 'sendL2ToL1Log',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link il1MessengerAbi}__ and `functionName` set to `"sendToL1"`
 */
export const useSimulateIl1MessengerSendToL1 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: il1MessengerAbi,
    functionName: 'sendToL1',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link il1MessengerAbi}__
 */
export const useWatchIl1MessengerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: il1MessengerAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link il1MessengerAbi}__ and `eventName` set to `"BytecodeL1PublicationRequested"`
 */
export const useWatchIl1MessengerBytecodeL1PublicationRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: il1MessengerAbi,
    eventName: 'BytecodeL1PublicationRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link il1MessengerAbi}__ and `eventName` set to `"L1MessageSent"`
 */
export const useWatchIl1MessengerL1MessageSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: il1MessengerAbi,
    eventName: 'L1MessageSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link il1MessengerAbi}__ and `eventName` set to `"L2ToL1LogSent"`
 */
export const useWatchIl1MessengerL2ToL1LogSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: il1MessengerAbi,
    eventName: 'L2ToL1LogSent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getBasefee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iMulticall3Abi, functionName: 'getChainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iMulticall3Abi,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNonceHolderAbi}__
 */
export const useReadINonceHolder = /*#__PURE__*/ createUseReadContract({
  abi: iNonceHolderAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"getDeploymentNonce"`
 */
export const useReadINonceHolderGetDeploymentNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: iNonceHolderAbi,
    functionName: 'getDeploymentNonce',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"getMinNonce"`
 */
export const useReadINonceHolderGetMinNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: iNonceHolderAbi,
    functionName: 'getMinNonce',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"getRawNonce"`
 */
export const useReadINonceHolderGetRawNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: iNonceHolderAbi,
    functionName: 'getRawNonce',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"getValueUnderNonce"`
 */
export const useReadINonceHolderGetValueUnderNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: iNonceHolderAbi,
    functionName: 'getValueUnderNonce',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"isNonceUsed"`
 */
export const useReadINonceHolderIsNonceUsed =
  /*#__PURE__*/ createUseReadContract({
    abi: iNonceHolderAbi,
    functionName: 'isNonceUsed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"validateNonceUsage"`
 */
export const useReadINonceHolderValidateNonceUsage =
  /*#__PURE__*/ createUseReadContract({
    abi: iNonceHolderAbi,
    functionName: 'validateNonceUsage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iNonceHolderAbi}__
 */
export const useWriteINonceHolder = /*#__PURE__*/ createUseWriteContract({
  abi: iNonceHolderAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"increaseMinNonce"`
 */
export const useWriteINonceHolderIncreaseMinNonce =
  /*#__PURE__*/ createUseWriteContract({
    abi: iNonceHolderAbi,
    functionName: 'increaseMinNonce',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"incrementDeploymentNonce"`
 */
export const useWriteINonceHolderIncrementDeploymentNonce =
  /*#__PURE__*/ createUseWriteContract({
    abi: iNonceHolderAbi,
    functionName: 'incrementDeploymentNonce',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"incrementMinNonceIfEquals"`
 */
export const useWriteINonceHolderIncrementMinNonceIfEquals =
  /*#__PURE__*/ createUseWriteContract({
    abi: iNonceHolderAbi,
    functionName: 'incrementMinNonceIfEquals',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"setValueUnderNonce"`
 */
export const useWriteINonceHolderSetValueUnderNonce =
  /*#__PURE__*/ createUseWriteContract({
    abi: iNonceHolderAbi,
    functionName: 'setValueUnderNonce',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iNonceHolderAbi}__
 */
export const useSimulateINonceHolder = /*#__PURE__*/ createUseSimulateContract({
  abi: iNonceHolderAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"increaseMinNonce"`
 */
export const useSimulateINonceHolderIncreaseMinNonce =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iNonceHolderAbi,
    functionName: 'increaseMinNonce',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"incrementDeploymentNonce"`
 */
export const useSimulateINonceHolderIncrementDeploymentNonce =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iNonceHolderAbi,
    functionName: 'incrementDeploymentNonce',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"incrementMinNonceIfEquals"`
 */
export const useSimulateINonceHolderIncrementMinNonceIfEquals =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iNonceHolderAbi,
    functionName: 'incrementMinNonceIfEquals',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iNonceHolderAbi}__ and `functionName` set to `"setValueUnderNonce"`
 */
export const useSimulateINonceHolderSetValueUnderNonce =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iNonceHolderAbi,
    functionName: 'setValueUnderNonce',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iNonceHolderAbi}__
 */
export const useWatchINonceHolderEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: iNonceHolderAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iNonceHolderAbi}__ and `eventName` set to `"ValueSetUnderNonce"`
 */
export const useWatchINonceHolderValueSetUnderNonceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iNonceHolderAbi,
    eventName: 'ValueSetUnderNonce',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPaymasterAbi}__
 */
export const useWriteIPaymaster = /*#__PURE__*/ createUseWriteContract({
  abi: iPaymasterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPaymasterAbi}__ and `functionName` set to `"postTransaction"`
 */
export const useWriteIPaymasterPostTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: iPaymasterAbi,
    functionName: 'postTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useWriteIPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: iPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPaymasterAbi}__
 */
export const useSimulateIPaymaster = /*#__PURE__*/ createUseSimulateContract({
  abi: iPaymasterAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPaymasterAbi}__ and `functionName` set to `"postTransaction"`
 */
export const useSimulateIPaymasterPostTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iPaymasterAbi,
    functionName: 'postTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPaymasterAbi}__ and `functionName` set to `"validateAndPayForPaymasterTransaction"`
 */
export const useSimulateIPaymasterValidateAndPayForPaymasterTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iPaymasterAbi,
    functionName: 'validateAndPayForPaymasterTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPaymasterFlowAbi}__
 */
export const useWriteIPaymasterFlow = /*#__PURE__*/ createUseWriteContract({
  abi: iPaymasterFlowAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPaymasterFlowAbi}__ and `functionName` set to `"approvalBased"`
 */
export const useWriteIPaymasterFlowApprovalBased =
  /*#__PURE__*/ createUseWriteContract({
    abi: iPaymasterFlowAbi,
    functionName: 'approvalBased',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPaymasterFlowAbi}__ and `functionName` set to `"general"`
 */
export const useWriteIPaymasterFlowGeneral =
  /*#__PURE__*/ createUseWriteContract({
    abi: iPaymasterFlowAbi,
    functionName: 'general',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPaymasterFlowAbi}__
 */
export const useSimulateIPaymasterFlow =
  /*#__PURE__*/ createUseSimulateContract({ abi: iPaymasterFlowAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPaymasterFlowAbi}__ and `functionName` set to `"approvalBased"`
 */
export const useSimulateIPaymasterFlowApprovalBased =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iPaymasterFlowAbi,
    functionName: 'approvalBased',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPaymasterFlowAbi}__ and `functionName` set to `"general"`
 */
export const useSimulateIPaymasterFlowGeneral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iPaymasterFlowAbi,
    functionName: 'general',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPubdataChunkPublisherAbi}__
 */
export const useWriteIPubdataChunkPublisher =
  /*#__PURE__*/ createUseWriteContract({ abi: iPubdataChunkPublisherAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iPubdataChunkPublisherAbi}__ and `functionName` set to `"chunkAndPublishPubdata"`
 */
export const useWriteIPubdataChunkPublisherChunkAndPublishPubdata =
  /*#__PURE__*/ createUseWriteContract({
    abi: iPubdataChunkPublisherAbi,
    functionName: 'chunkAndPublishPubdata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPubdataChunkPublisherAbi}__
 */
export const useSimulateIPubdataChunkPublisher =
  /*#__PURE__*/ createUseSimulateContract({ abi: iPubdataChunkPublisherAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iPubdataChunkPublisherAbi}__ and `functionName` set to `"chunkAndPublishPubdata"`
 */
export const useSimulateIPubdataChunkPublisherChunkAndPublishPubdata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iPubdataChunkPublisherAbi,
    functionName: 'chunkAndPublishPubdata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__
 */
export const useReadISystemContext = /*#__PURE__*/ createUseReadContract({
  abi: iSystemContextAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"baseFee"`
 */
export const useReadISystemContextBaseFee = /*#__PURE__*/ createUseReadContract(
  { abi: iSystemContextAbi, functionName: 'baseFee' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"blockGasLimit"`
 */
export const useReadISystemContextBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'blockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"chainId"`
 */
export const useReadISystemContextChainId = /*#__PURE__*/ createUseReadContract(
  { abi: iSystemContextAbi, functionName: 'chainId' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"coinbase"`
 */
export const useReadISystemContextCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'coinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"difficulty"`
 */
export const useReadISystemContextDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'difficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"gasPerPubdataByte"`
 */
export const useReadISystemContextGasPerPubdataByte =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'gasPerPubdataByte',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"gasPrice"`
 */
export const useReadISystemContextGasPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'gasPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"getBatchHash"`
 */
export const useReadISystemContextGetBatchHash =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'getBatchHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"getBatchNumberAndTimestamp"`
 */
export const useReadISystemContextGetBatchNumberAndTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'getBatchNumberAndTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"getBlockHashEVM"`
 */
export const useReadISystemContextGetBlockHashEvm =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'getBlockHashEVM',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadISystemContextGetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"getBlockTimestamp"`
 */
export const useReadISystemContextGetBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'getBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"getCurrentPubdataSpent"`
 */
export const useReadISystemContextGetCurrentPubdataSpent =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'getCurrentPubdataSpent',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"getL2BlockNumberAndTimestamp"`
 */
export const useReadISystemContextGetL2BlockNumberAndTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'getL2BlockNumberAndTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"origin"`
 */
export const useReadISystemContextOrigin = /*#__PURE__*/ createUseReadContract({
  abi: iSystemContextAbi,
  functionName: 'origin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iSystemContextAbi}__ and `functionName` set to `"txNumberInBlock"`
 */
export const useReadISystemContextTxNumberInBlock =
  /*#__PURE__*/ createUseReadContract({
    abi: iSystemContextAbi,
    functionName: 'txNumberInBlock',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reviewRegistryAbi}__
 *
 *
 */
export const useReadReviewRegistry = /*#__PURE__*/ createUseReadContract({
  abi: reviewRegistryAbi,
  address: reviewRegistryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reviewRegistryAbi}__ and `functionName` set to `"getReview"`
 *
 *
 */
export const useReadReviewRegistryGetReview =
  /*#__PURE__*/ createUseReadContract({
    abi: reviewRegistryAbi,
    address: reviewRegistryAddress,
    functionName: 'getReview',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link reviewRegistryAbi}__ and `functionName` set to `"getTotalReviews"`
 *
 *
 */
export const useReadReviewRegistryGetTotalReviews =
  /*#__PURE__*/ createUseReadContract({
    abi: reviewRegistryAbi,
    address: reviewRegistryAddress,
    functionName: 'getTotalReviews',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reviewRegistryAbi}__
 *
 *
 */
export const useWriteReviewRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: reviewRegistryAbi,
  address: reviewRegistryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link reviewRegistryAbi}__ and `functionName` set to `"addReview"`
 *
 *
 */
export const useWriteReviewRegistryAddReview =
  /*#__PURE__*/ createUseWriteContract({
    abi: reviewRegistryAbi,
    address: reviewRegistryAddress,
    functionName: 'addReview',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reviewRegistryAbi}__
 *
 *
 */
export const useSimulateReviewRegistry =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reviewRegistryAbi,
    address: reviewRegistryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link reviewRegistryAbi}__ and `functionName` set to `"addReview"`
 *
 *
 */
export const useSimulateReviewRegistryAddReview =
  /*#__PURE__*/ createUseSimulateContract({
    abi: reviewRegistryAbi,
    address: reviewRegistryAddress,
    functionName: 'addReview',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reviewRegistryAbi}__
 *
 *
 */
export const useWatchReviewRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reviewRegistryAbi,
    address: reviewRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link reviewRegistryAbi}__ and `eventName` set to `"ReviewAdded"`
 *
 *
 */
export const useWatchReviewRegistryReviewAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: reviewRegistryAbi,
    address: reviewRegistryAddress,
    eventName: 'ReviewAdded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scriptAbi}__
 */
export const useReadScript = /*#__PURE__*/ createUseReadContract({
  abi: scriptAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link scriptAbi}__ and `functionName` set to `"IS_SCRIPT"`
 */
export const useReadScriptIsScript = /*#__PURE__*/ createUseReadContract({
  abi: scriptAbi,
  functionName: 'IS_SCRIPT',
})
