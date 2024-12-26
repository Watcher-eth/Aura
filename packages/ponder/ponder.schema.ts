import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Reviews: p.createTable({
    id: p.string(),
    metadataURI: p.string(),
    contractAddress: p.hex(),
    createdAt: p.int(),
    createdBy: p.hex(),
    rating: p.int(),
  }),
  Bounties: p.createTable({
    id: p.string(),
    contractAddress: p.hex(),
    rewardPool: p.bigint(),
    totalClaims: p.int(),
    active: p.boolean(),
    createdAt: p.int(),
    updatedAt: p.int(),
  }),
}));
