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

ponder.on("BountyManager:BountyClaimed", async ({ event, context }) => {
  const bounty = await context.db.Bounties.findUnique({
    id: event.args.bountyId.toString(),
  });

  if (bounty) {
    const newTotalClaims = bounty.totalClaims + 1;
    const newRewardPool = bounty.rewardPool - (event.args.reward + event.args.fee);
    
    await context.db.Bounties.update({
      id: event.args.bountyId.toString(),
      data: {
        rewardPool: newRewardPool,
        totalClaims: newTotalClaims,
        updatedAt: Number(event.block.timestamp),
        active: newRewardPool > 0,
      },
    });

    await context.db.BountyClaim.create({
      id: event.log.id,
      data: {
        bountyId: event.args.bountyId,
        claimant: event.args.claimant,
        reward: event.args.reward,
        fee: event.args.fee,
        timestamp: Number(event.block.timestamp),
        blockNumber: Number(event.block.number),
        transactionHash: event.transaction.hash,
      },
    });
  }
});