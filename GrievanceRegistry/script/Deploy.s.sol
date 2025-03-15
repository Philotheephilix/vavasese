// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/Grievance.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        // Replace with your constructor args if needed
        GrievanceRegistry g = new GrievanceRegistry();

        vm.stopBroadcast();
    }
}
