// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";

contract FundPaymaster is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PK");
        address payable paymasterAddress = payable(0x2F94A64652c950e6782F2382318d715f5E74B975);
        uint256 fundingAmount = 20000000; // 5 ETH

        vm.startBroadcast(privateKey);

        // Send ETH to the paymaster with explicit gas parameters
        (bool success, ) = paymasterAddress.call{
            value: fundingAmount,
            gas: 100000 // Explicit gas limit
        }("");
        require(success, "Failed to fund paymaster");

        console.log("Successfully funded paymaster at:", paymasterAddress);
        console.log("Funding amount:", fundingAmount / 1e18, "ETH");
        console.log("New paymaster balance:", address(paymasterAddress).balance / 1e18, "ETH");

        vm.stopBroadcast();
    }
}
