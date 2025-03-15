// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeLockEscrow {
    struct DepositInfo {
        uint256 amount;
        uint256 unlockTime;
        bool withdrawn;
    }

    mapping(address => DepositInfo[]) public userDeposits;

    event Deposited(address indexed sender, uint256 index, uint256 amount, uint256 unlockTime);
    event Withdrawn(address indexed recipient, uint256 index, uint256 amount);

    function deposit(uint256 delaySeconds) public payable {
        require(msg.value > 0, "Must send ETH");
        require(delaySeconds > 0, "Invalid delay");

        userDeposits[msg.sender].push(DepositInfo({
            amount: msg.value,
            unlockTime: block.timestamp + delaySeconds,
            withdrawn: false
        }));

        emit Deposited(msg.sender, userDeposits[msg.sender].length - 1, msg.value, block.timestamp + delaySeconds);
    }

    function withdraw(uint256 index) external {
        require(index < userDeposits[msg.sender].length, "Invalid index");
        DepositInfo storage depositInfo = userDeposits[msg.sender][index];
        
        require(block.timestamp >= depositInfo.unlockTime, "Time lock active");
        require(!depositInfo.withdrawn, "Already withdrawn");
        
        depositInfo.withdrawn = true;
        (bool sent,) = msg.sender.call{value: depositInfo.amount}("");
        require(sent, "Transfer failed");
        
        emit Withdrawn(msg.sender, index, depositInfo.amount);
    }

    receive() external payable {
        deposit(0); // Default 0 delay if sent directly
    }
}