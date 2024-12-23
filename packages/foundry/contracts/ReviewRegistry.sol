// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../lib/SSTORE2.sol";

contract ReviewRegistry {
    using SSTORE2 for bytes;

    struct Review {
        string metadataURI;
        string contractName;
        uint256 createdAt;
        address createdBy;
        uint8 rating; // 1-5
    }

    // Array of pointers to stored reviews
    address[] private reviewPointers;

    event ReviewAdded(uint256 indexed reviewId, address indexed reviewer, string contractName, uint8 rating);

    /// @notice Adds a new review to the registry.
    /// @param metadataURI URI pointing to the review metadata.
    /// @param contractName Name of the contract being reviewed.
    /// @param rating Rating between 1 to 5.
    function addReview(string calldata metadataURI, string calldata contractName, uint8 rating) external {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        Review memory newReview = Review({
            metadataURI: metadataURI,
            contractName: contractName,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            rating: rating
        });

        // Serialize the review data
        bytes memory encodedReview = abi.encode(newReview);

        // Store the review using SSTORE2
        address pointer = SSTORE2.write(encodedReview);

        // Add the pointer to the array
        reviewPointers.push(pointer);

        emit ReviewAdded(reviewPointers.length - 1, msg.sender, contractName, rating);
    }

    /// @notice Retrieves a review by its ID.
    /// @param reviewId The ID of the review to retrieve.
    /// @return Review struct containing the review details.
    function getReview(uint256 reviewId) external view returns (Review memory) {
        require(reviewId < reviewPointers.length, "Review ID out of bounds");

        address pointer = reviewPointers[reviewId];
        bytes memory encodedReview = SSTORE2.read(pointer);
        Review memory review = abi.decode(encodedReview, (Review));
        return review;
    }

    /// @notice Returns the total number of reviews.
    /// @return The count of reviews.
    function getTotalReviews() external view returns (uint256) {
        return reviewPointers.length;
    }

    /// @notice Retrieves all review pointers. Useful for off-chain indexing.
    /// @return Array of addresses pointing to stored reviews.
    function getAllReviewPointers() external view returns (address[] memory) {
        return reviewPointers;
    }
}
