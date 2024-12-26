// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ReviewRegistry.sol";

contract BountyManager {
    ReviewRegistry public reviewRegistry;

    struct Bounty {
        address contractAddress;
        uint256 rewardPool;
        uint256 totalClaims;
        uint256 participants;
        bool active;
    }

    // Fee address for collecting platform fees
    address public feeAddress;

    // Mapping from bounty ID to Bounty
    mapping(uint256 => Bounty) public bounties;

    // Mapping from bounty ID to user address to claim status
    mapping(uint256 => mapping(address => bool)) public hasClaimed;

    uint256 public bountyCount;

    event BountyCreated(uint256 indexed bountyId, address contractAddress, uint256 rewardPool, uint256 participants);
    event BountyClaimed(uint256 indexed bountyId, address indexed claimant, uint256 reward, uint256 fee);

    /// @param _reviewRegistry Address of the deployed ReviewRegistry contract.
    /// @param _feeAddress Address to receive platform fees.
    constructor(address _reviewRegistry, address _feeAddress) {
        reviewRegistry = ReviewRegistry(_reviewRegistry);
        feeAddress = _feeAddress;
    }

    /// @notice Creates a new bounty for a specific contract.
    /// @param contractAddress Name of the contract for which the bounty is created.
    /// @param participants Number of expected participants to divide the bounty.
    function createBounty(address contractAddress, uint256 participants) external payable {
        require(msg.value > 0, "Reward pool must be greater than zero");
        require(participants > 0, "Participants must be greater than zero");

        bounties[bountyCount] = Bounty({
            contractAddress: contractAddress,
            rewardPool: msg.value,
            totalClaims: 0,
            participants: participants,
            active: true
        });

        emit BountyCreated(bountyCount, contractAddress, msg.value, participants);
        bountyCount++;
    }

    /// @notice Allows eligible users to claim their share of the bounty.
    /// @param bountyId The ID of the bounty to claim from.
    function claimBounty(uint256 bountyId) external {
        Bounty storage bounty = bounties[bountyId];
        require(bounty.active, "Bounty is not active");

        // Check if the user has already claimed
        require(!hasClaimed[bountyId][msg.sender], "Bounty already claimed");

        // Verify that the user has submitted a review for the specified contract
        bool hasReviewed = false;
        uint256 totalReviews = reviewRegistry.getTotalReviews();
        for (uint256 i = 0; i < totalReviews; i++) {
            (string memory metadataURI, address contractAddress,, address createdBy, ) = getReviewDetails(i);
            if (contractAddress == bounty.contractAddress && createdBy == msg.sender) {
                hasReviewed = true;
                break;
            }
        }
        require(hasReviewed, "No eligible review found for this bounty");

        // Mark as claimed
        hasClaimed[bountyId][msg.sender] = true;
        bounty.totalClaims++;

        // Calculate reward share
        uint256 totalRewardPool = bounty.rewardPool;
        uint256 rewardShare = totalRewardPool / bounty.participants;
        
        // Calculate platform fee (2.5%)
        uint256 platformFee = (rewardShare * 25) / 1000; // 2.5% = 25/1000
        uint256 netReward = rewardShare - platformFee;

        // Transfer the reward
        require(address(this).balance >= rewardShare, "Insufficient bounty pool");
        payable(msg.sender).transfer(netReward);
        payable(feeAddress).transfer(platformFee);

        emit BountyClaimed(bountyId, msg.sender, netReward, platformFee);
    }

    function getReviewDetails(uint256 reviewId) internal view returns (
        string memory metadataURI,
        address contractAddress,
        uint256 createdAt,
        address createdBy,
        uint8 rating
    ) {
        ReviewRegistry.Review memory review = reviewRegistry.getReview(reviewId);
        return (review.metadataURI, review.contractAddress, review.createdAt, review.createdBy, review.rating);
    }

    /// @notice Allows the contract owner to withdraw any remaining funds.
    /// @param to The address to send the funds to.
    /// @param amount The amount to withdraw.
    function withdraw(address payable to, uint256 amount) external {
        // Implement access control as needed (e.g., onlyOwner)
        require(to != address(0), "Invalid address");
        require(amount <= address(this).balance, "Insufficient balance");
        to.transfer(amount);
    }

    // Fallback functions to accept Ether
    receive() external payable {}
    fallback() external payable {}
}
