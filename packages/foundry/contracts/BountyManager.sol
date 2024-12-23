// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ReviewRegistry.sol";

contract BountyManager {
    ReviewRegistry public reviewRegistry;

    struct Bounty {
        string contractName;
        uint256 rewardPool;
        uint256 totalClaims;
        bool active;
    }

    // Mapping from bounty ID to Bounty
    mapping(uint256 => Bounty) public bounties;

    // Mapping from bounty ID to user address to claim status
    mapping(uint256 => mapping(address => bool)) public hasClaimed;

    uint256 public bountyCount;

    event BountyCreated(uint256 indexed bountyId, string contractName, uint256 rewardPool);
    event BountyClaimed(uint256 indexed bountyId, address indexed claimant, uint256 reward);

    /// @param _reviewRegistry Address of the deployed ReviewRegistry contract.
    constructor(address _reviewRegistry) {
        reviewRegistry = ReviewRegistry(_reviewRegistry);
    }

    /// @notice Creates a new bounty for a specific contract.
    /// @param contractName Name of the contract for which the bounty is created.
    function createBounty(string calldata contractName) external payable {
        require(msg.value > 0, "Reward pool must be greater than zero");

        bounties[bountyCount] = Bounty({
            contractName: contractName,
            rewardPool: msg.value,
            totalClaims: 0,
            active: true
        });

        emit BountyCreated(bountyCount, contractName, msg.value);
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
            (string memory metadataURI, string memory contractName,, address createdBy, ) = getReviewDetails(i);
            if (keccak256(bytes(contractName)) == keccak256(bytes(bounty.contractName)) && createdBy == msg.sender) {
                hasReviewed = true;
                break;
            }
        }
        require(hasReviewed, "No eligible review found for this bounty");

        // Mark as claimed
        hasClaimed[bountyId][msg.sender] = true;
        bounty.totalClaims++;

        // Calculate reward share (simple division, can be improved)
        uint256 reward = bounty.rewardPool / 10; // Example: each claim gets 10% of the pool

        // Transfer the reward
        require(address(this).balance >= reward, "Insufficient bounty pool");
        payable(msg.sender).transfer(reward);

        emit BountyClaimed(bountyId, msg.sender, reward);
    }

    /// @dev Internal function to fetch review details from the ReviewRegistry.
    /// @param reviewId The ID of the review to fetch.
    /// @return metadataURI, contractName, createdAt, createdBy, rating
    function getReviewDetails(uint256 reviewId) internal view returns (
        string memory metadataURI,
        string memory contractName,
        uint256 createdAt,
        address createdBy,
        uint8 rating
    ) {
        ReviewRegistry.Review memory review = reviewRegistry.getReview(reviewId);
        return (review.metadataURI, review.contractName, review.createdAt, review.createdBy, review.rating);
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
