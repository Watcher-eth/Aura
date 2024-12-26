// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {Test} from "forge-std/Test.sol";
import {ReviewRegistry} from "../contracts/ReviewRegistry.sol";

contract ReviewRegistryTest is Test {
    ReviewRegistry reviewRegistry;

    function setUp() public {
        reviewRegistry = new ReviewRegistry(); // Initialize your contract
    }

      function test_AddReview() public {
        reviewRegistry.addReview("ipfs://metadata", address(750000), 5);
        // Check that the review was added correctly
        // Implement retrieval logic and assertions here
    }

    function test_AddReviewWithInvalidRating() public {
        vm.expectRevert("Rating must be between 1 and 5");
        reviewRegistry.addReview("ipfs://metadata", address(750000), 6);
    }

    function test_RetrieveReview() public {
        reviewRegistry.addReview("ipfs://metadata", address(750000), 5);
        // Implement retrieval logic and assertions here
    }
}
