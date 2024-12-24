// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {Test} from "forge-std/Test.sol";
import {BountyManager} from "../contracts/BountyManager.sol";
import {ReviewRegistry} from "../contracts/ReviewRegistry.sol";

contract BountyManagerTest is Test {
    BountyManager bountyManager;
    ReviewRegistry reviewRegistry;

    function setUp() public {
        reviewRegistry = new ReviewRegistry();
        bountyManager = new BountyManager(address(reviewRegistry));
    }


    function test_RevertCondition() public {
        // Test a condition that should revert
        vm.expectRevert();
        bountyManager.someFunctionThatShouldRevert();
    }

    function test_CreateBounty() public payable {
        uint256 initialBalance = address(this).balance;
        uint256 bountyAmount = 1 ether;

        // Create a bounty
        vm.deal(address(this), bountyAmount);
        bountyManager.createBounty{value: bountyAmount}("Test Contract");

        // Check bounty details
        (string memory contractName, uint256 rewardPool, uint256 totalClaims, bool active) = bountyManager.bounties(0);
        assertEq(contractName, "Test Contract");
        assertEq(rewardPool, bountyAmount);
        assertEq(totalClaims, 0);
        assertTrue(active);
    }

    function test_CreateBountyWithZeroReward() public {
        vm.expectRevert("Reward pool must be greater than zero");
        bountyManager.createBounty("Test Contract");
    }

    function test_ClaimBounty() public {
        uint256 bountyAmount = 1 ether;
        vm.deal(address(this), bountyAmount);
        bountyManager.createBounty{value: bountyAmount}("Test Contract");

        // Claim the bounty
        bountyManager.claimBounty(0);

        // Check that the bounty is no longer active
        (,,, bool active) = bountyManager.bounties(0);
        assertFalse(active);
    }

    function test_ClaimBountyAlreadyClaimed() public {
        uint256 bountyAmount = 1 ether;
        vm.deal(address(this), bountyAmount);
        bountyManager.createBounty{value: bountyAmount}("Test Contract");

        // Claim the bounty
        bountyManager.claimBounty(0);

        // Attempt to claim again
        vm.expectRevert("Bounty already claimed");
        bountyManager.claimBounty(0);
    }
}
