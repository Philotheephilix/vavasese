// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "forge-std/Script.sol";
import "../src/TimeLockReactive.sol";

contract DeployTimeLockReactive is Script {
    function run() external {
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    
    address baseEscrow = vm.envAddress("BASE_ESCROW_ADDRESS");
    address reactiveService = 0x9b9BB25f1A81078C544C829c5EB7822d747Cf434;

    
    console.log("BaseEscrow address:", baseEscrow);
    console.log("ReactiveService address:", reactiveService);
    
    // Add validation
    
    vm.startBroadcast(deployerPrivateKey);
    
    TimeLockReactive timeLock = new TimeLockReactive(
        baseEscrow,
        reactiveService
    );
    
    // Optional: wrap in try-catch or add conditional
    if (reactiveService.code.length > 0) {  // Check if it's a contract
        timeLock.initialize();
    } else {
        console.log("Skipping initialization - ReactiveService is not deployed");
    }
    
    console.log("TimeLockReactive deployed at:", address(timeLock));
    }
}   