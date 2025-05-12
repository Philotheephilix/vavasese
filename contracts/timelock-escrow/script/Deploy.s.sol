// script/Deploy.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/TimeLockEscrow.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        TimeLockEscrow escrow = new TimeLockEscrow();
        console.log("Escrow deployed at:", address(escrow));

        vm.stopBroadcast();
    }
}