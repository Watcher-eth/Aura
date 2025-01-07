// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";

contract FundPaymaster is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PK");
        address account = vm.addr(privateKey);
        address payable paymasterAddress = payable(0x2F94A64652c950e6782F2382318d715f5E74B975);
        uint256 fundingAmount = 0.001 ether; // Reduced amount for testing

        // Check balances first
        uint256 accountBalance = address(account).balance;
        uint256 paymasterBalance = address(paymasterAddress).balance;
        
        console.log("Account address:", account);
        console.log("Account balance:", accountBalance / 1e18, "ETH");
        console.log("\nPaymaster current balance:", paymasterBalance / 1e18, "ETH");
        console.log("Attempting to send:", fundingAmount / 1e18, "ETH");

        vm.startBroadcast(privateKey);

        // Simple ETH transfer with just gas limit
        (bool success, ) = paymasterAddress.call{
            value: fundingAmount,
            gas: 100000
        }("");
        require(success, "Failed to fund paymaster");



        uint256 newPaymasterBalance = address(paymasterAddress).balance;
        console.log("\nTransaction successful!");
        console.log("New paymaster balance:", newPaymasterBalance / 1e18, "ETH");
        console.log("Change in balance:", (newPaymasterBalance - paymasterBalance) / 1e18, "ETH");

        vm.stopBroadcast();
    }
}
