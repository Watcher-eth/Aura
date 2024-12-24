// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {BountyManager} from "../contracts/BountyManager.sol";
import {ReviewRegistry} from "../contracts/ReviewRegistry.sol";

contract DeployContracts is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("DEV_PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        // Deploy ReviewRegistry contract
        ReviewRegistry reviewRegistry = new ReviewRegistry();
        address reviewRegistryAddress = address(reviewRegistry);

        // Deploy BountyManager contract with the address of ReviewRegistry
        BountyManager bountyManager = new BountyManager(reviewRegistryAddress);
        address bountyManagerAddress = address(bountyManager);

        console.log("ReviewRegistry deployed at:", reviewRegistryAddress);
        console.log("BountyManager deployed at:", bountyManagerAddress);

        vm.stopBroadcast();
    }
}
