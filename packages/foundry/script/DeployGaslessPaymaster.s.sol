// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {GaslessPaymaster} from "../contracts/GaslessPaymaster.sol";

contract DeployGaslessPaymaster is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PK");
        address deployer = vm.addr(privateKey);
        vm.startBroadcast(privateKey);

        // Deploy GaslessPaymaster contract with deployer as initial owner
        GaslessPaymaster paymaster = new GaslessPaymaster(deployer);
        
        console.log("GaslessPaymaster deployed at:", address(paymaster));
        console.log("Owner set to:", deployer);

        vm.stopBroadcast();
    }
}
