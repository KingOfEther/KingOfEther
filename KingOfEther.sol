// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract KingOfEther {
    address public king;
    uint256 public treasure;
    uint public increasePercentage;

    mapping (address => uint256) pendingWithdrawals;

    event NewKing(address king, uint256 money);

    constructor(uint _increasePercentage) {
        king = msg.sender;
        increasePercentage = _increasePercentage;
        treasure = 1;
    }

    function becomeKing() public payable {
        require(msg.sender != king, "You are already the king.");
        require(msg.value * 100 >= treasure * (100 + increasePercentage), "Not enough money sent.");
        pendingWithdrawals[king] += msg.value;
        king = msg.sender;
        treasure = msg.value;
        emit NewKing(king, treasure);
    }

    function withdraw() public {
        uint256 amount = pendingWithdrawals[msg.sender];
        if (amount > 0) {
            pendingWithdrawals[msg.sender] = 0;
            payable(msg.sender).transfer(amount);
        }
    }

    function amountWithdrawable() public view returns (uint256) {
        return pendingWithdrawals[msg.sender];
    }
}
