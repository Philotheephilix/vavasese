// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReactiveService {
    function subscribe(uint256 chainId, address contractAddress, bytes4 eventSig) external;
    function triggerCallback(address target, bytes calldata data) external;
}