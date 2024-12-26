// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {BountyManager} from "../contracts/BountyManager.sol";
import {ReviewRegistry} from "../contracts/ReviewRegistry.sol";

contract DeployContracts is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PK");
        address deployer = vm.addr(privateKey);
        vm.startBroadcast(privateKey);

        // Deploy ReviewRegistry contract
        ReviewRegistry reviewRegistry = new ReviewRegistry();
        address reviewRegistryAddress = address(reviewRegistry);

        // Deploy BountyManager contract with ReviewRegistry and fee address
        BountyManager bountyManager = new BountyManager(
            reviewRegistryAddress,
            deployer  // Use deployer as fee address
        );
        address bountyManagerAddress = address(bountyManager);

        console.log("ReviewRegistry deployed at:", reviewRegistryAddress);
        console.log("BountyManager deployed at:", bountyManagerAddress);
        console.log("Fee address set to:", deployer);

        vm.stopBroadcast();
    }
}