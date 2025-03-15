// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IReactiveService.sol";

contract TimeLockReactive {
    address public immutable baseEscrow;
    IReactiveService public immutable reactiveService;
    
    constructor(address _baseEscrow, address _reactiveService) {
        baseEscrow = _baseEscrow;
        reactiveService = IReactiveService(_reactiveService);
    }
    
    function initialize() external {
        // Subscribe to Base contract's Deposit event
        reactiveService.subscribe(
            8453, // Base Chain ID
            baseEscrow,
            bytes4(keccak256("Deposited(address,uint256,uint256,uint256)"))
        );
    }

    function reactDeposit(
        address sender,
        uint256 index,
        uint256 unlockTime
    ) external {
        if(block.timestamp >= unlockTime) {
            bytes memory data = abi.encodeWithSignature(
                "approveWithdrawal(address,uint256)",
                sender,
                index
            );
            reactiveService.triggerCallback(baseEscrow, data);
        }
    }
}