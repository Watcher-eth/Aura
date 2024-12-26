// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ReviewRegistry {
    struct Review {
        string metadataURI;
        address contractAddress;
        uint256 createdAt;
        address createdBy;
        uint8 rating; // 1-5
    }

    // Array to store reviews
    Review[] private reviews;

    event ReviewAdded(uint256 indexed reviewId, address indexed reviewer, address contractName, uint8 rating);

    /// @notice Adds a new review to the registry.
    /// @param metadataURI URI pointing to the review metadata.
    /// @param contractAddress Name of the contract being reviewed.
    /// @param rating Rating between 1 to 5.
    function addReview(string calldata metadataURI, address contractAddress, uint8 rating) external {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        Review memory newReview = Review({
            metadataURI: metadataURI,
            contractAddress: contractAddress,
            createdAt: block.timestamp,
            createdBy: msg.sender,
            rating: rating
        });

        // Add the review to the array
        reviews.push(newReview);

        emit ReviewAdded(reviews.length - 1, msg.sender, contractAddress, rating);
    }

    /// @notice Retrieves a review by its ID.
    /// @param reviewId The ID of the review to retrieve.
    /// @return Review struct containing the review details.
    function getReview(uint256 reviewId) external view returns (Review memory) {
        require(reviewId < reviews.length, "Review ID out of bounds");
        return reviews[reviewId];
    }

    /// @notice Returns the total number of reviews.
    /// @return The count of reviews.
    function getTotalReviews() external view returns (uint256) {
        return reviews.length;
    }
}
