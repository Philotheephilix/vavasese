// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/TimeLockEscrow.sol";

// script/Deploy.s.sol
contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address zetaGateway = 0xfEDD7A6e3Ef1cC470fbfbF955a22D793dDC0F44E; // ZetaChain main gateway
        
        vm.startBroadcast(deployerPrivateKey);
        new TimeLockEscrow(zetaGateway);
        vm.stopBroadcast();
    }
}