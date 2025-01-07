# Aura - Smart Contract Review Platform

## Project Overview
Aura is a decentralized platform that enables users to rate and review any smart contract across EVM-compatible networks. Built on Lens Network, Aura leverages the network's low-cost transactions and native storage nodes to provide a gasless experience for users while maintaining full on-chain data availability.

## Team Members
Watcher 

## Project Description
Aura serves as a crucial tool in the blockchain ecosystem by providing user-generated reviews for smart contracts, helping users make informed decisions about contract safety and functionality. The platform is particularly valuable for:
- Evaluating contract safety and reliability
- Understanding contract functionality through user experiences
- Kickstarting memecoin projects and speculative contracts on Lens Network
- Embedding social layers into contract interactions

### Key Features
- Multi-chain support across major EVM networks
- Gasless transactions powered by Lens Network
- Fully on-chain reviews with metadata storage
- Easy integration through GraphQL API
- Extensible architecture for custom implementations

## Technical Architecture

### Frontend (packages/nextjs)
The frontend is built with Next.js and includes:
- Wagmi/Viem for contract interactions
- React Query for state management
- Lens Network integration
- Responsive UI with modern design

### Smart Contracts (packages/foundry)
- ReviewRegistry: Core contract for managing reviews
- GaslessPaymaster: Enables gasless transactions
- Deployment scripts and tests

### Indexing & API
- Ponder-based indexing solution
- GraphQL API endpoint: https://aura-production-c3e7.up.railway.app/
- Fully typed queries and contract interactions

## Getting Started

### Prerequisites
- Node.js (v16+)
- Yarn
- Foundry

### Installation

1. Clone the repository:
```bash
git clone https://github.com/watchereth/Aura.git
cd Aura
```

2. Install dependencies:
```bash
yarn install
```

### Frontend Commands (packages/nextjs)
```bash
# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Generate contract types
yarn wagmi generate
```

### Smart Contract Commands (packages/foundry)
```bash
# Compile contracts
forge build

# Run tests
forge test

# Deploy contracts
forge script script/Deploy.s.sol

# Generate contract bindings
forge bind
```

## API Integration Guide

### GraphQL Endpoint
```graphql
endpoint: https://aura-production-c3e7.up.railway.app/
```

### Example Query
```graphql
query GetContractReviews($contractAddress: String!) {
  reviews(where: { contractAddress: $contractAddress }) {
    id
    rating
    content
    reviewer
    timestamp
  }
}
```

### TypeScript Integration
1. Install dependencies:
```bash
yarn add @graphql-codegen/cli graphql
```

2. Generate types:
```bash
yarn gql-compile
```

## Deployment

### Frontend
The frontend can be deployed to Vercel:
```bash
yarn vercel
```

### Smart Contracts
1. Set up environment variables:
```bash
cp .env.example .env
# Add your private key and RPC URLs
```

2. Deploy contracts:
```bash
cd packages/foundry
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
[Add your license here]

## Links
- Source Code: [Repository Link]
- Preview: [Demo Link]
- Documentation: [Docs Link]
