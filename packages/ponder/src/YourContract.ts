import { ponder } from "@/generated";

// ReviewRegistry Events
ponder.on("ReviewRegistry:ReviewAdded", async ({ event, context }) => {
  await context.db.Reviews.create({
    id: event.log.id,
    data: {
    metadataURI: "",
      createdBy: event.args.reviewer,
      contractAddress: event.args.contractName,
      rating: event.args.rating,
      createdAt: Number(event.block.timestamp),
    },
  });
});

// BountyManager Events
ponder.on("BountyManager:BountyCreated", async ({ event, context }) => {
  await context.db.Bounties.create({
    id: event.args.bountyId.toString(),
    data: {
      contractAddress: event.args.contractAddress,
      rewardPool: event.args.rewardPool,
      createdAt: Number(event.block.timestamp),
      totalClaims: 0,
      updatedAt: Number(event.block.timestamp),
      active: true,
    },
  });
});

// ponder.on("BountyManager:BountyClaimed", async ({ event, context }) => {
//   await context.db.Bounties.update({
//     id: event.args.bountyId,
//     data: {
      
//         rewardPool: event.args.rewardPool -,
//         createdAt: Number(event.block.timestamp),
//         totalClaims: 0,
//         updatedAt: Number(event.block.timestamp),
//         active: true,
//     },
//   });
// });