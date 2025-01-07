# Aura - Community-Driven Smart Contract Reviews

## Project Overview
Aura is your gateway to understanding smart contracts through the eyes of the community. In the fast-paced world of blockchain, where new contracts and tokens emerge daily, Aura provides a crucial layer of transparency and trust through user-generated reviews.

Think of Aura as your blockchain compass – a platform where users can share their experiences, insights, and assessments of any smart contract across multiple blockchains. Whether you're evaluating a new memecoin, considering a DeFi protocol, or researching a potential investment, Aura gives you access to real user experiences and opinions.

## What Aura Solves
- **Trust Gap**: In the blockchain space, it's often difficult to distinguish legitimate projects from questionable ones. Aura bridges this gap by providing real user experiences and reviews.
- **Information Asymmetry**: While contract code might be visible on-chain, understanding its real-world impact and reliability often isn't. Aura's community reviews provide practical insights beyond the code.
- **Community Wisdom**: By aggregating user reviews and ratings, Aura helps surface community consensus about contract reliability and functionality.
- **Social Discovery**: For new projects and memecoins, Aura serves as a discovery platform where communities can form and share insights about emerging contracts.

## Key Features
- Review and rate any smart contract across major blockchain networks
- Access community insights before interacting with contracts
- Gasless reviews powered by Lens Network
- Permanent, tamper-proof review storage
- Easy integration for developers and platforms

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
- Source Code: https://github.com/watchereth/Aura
- Preview: [Demo Link]
- Documentation: [Docs Link]
