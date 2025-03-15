// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReactiveService {
    function subscribe(uint256 chainId, address contractAddress, bytes4 eventSig) external;
    function triggerCallback(address target, bytes calldata data) external;
}

contract TimeLockReactive {
    address public immutable baseEscrow;
    IReactiveService public immutable reactiveService;
    
    constructor(address _baseEscrow, address _reactiveService) {
        baseEscrow = _baseEscrow;
        reactiveService = IReactiveService(_reactiveService);
        
        // Subscribe to Base contract's Deposit event
        reactiveService.subscribe(
            8453, // Base Chain ID
            _baseEscrow,
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