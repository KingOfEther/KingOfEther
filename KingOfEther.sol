// SPDX-License-Identifier: GPL-3.0
pragma solidity >0.6.99 <0.8.0;

contract KingOfEther {
    address payable creator;
    address public richest;
    uint public mostSent;
    uint public increasePercentage;
    uint public startingValue;
    uint public gameDuration;
    uint transactionFeePercentage;
    uint startTime;

    mapping (address => uint) pendingWithdrawals;

    event NewKing(address king, uint money);

    constructor(uint _gameDuration, uint _startingValue, uint _increasePercentage, uint _transactionFeePercentage) {
        creator = msg.sender;
        gameDuration = _gameDuration;
        startingValue = _startingValue;
        increasePercentage = _increasePercentage;
        transactionFeePercentage = _transactionFeePercentage;
    }

    function becomeRichest() public payable {
        if (remainingTime() == 0) {
            require(msg.value >= startingValue, "Not enough money sent.");
            pendingWithdrawals[creator] += msg.value;
            startTime = block.timestamp;
        } else {
            require(msg.sender != richest, "You already are the richest.");
            require(msg.value * 100 >= mostSent * (100 + increasePercentage), "Not enough money sent.");
            pendingWithdrawals[richest] += msg.value;
        }
        richest = msg.sender;
        mostSent = msg.value;
        emit NewKing(richest, mostSent);
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        if (msg.sender != creator) {
            uint fee = amount * transactionFeePercentage / 100;
            pendingWithdrawals[creator] += fee;
            amount -= fee;
        }
        msg.sender.transfer(amount);
    }

    function amountWithdrawable() public view returns (uint amount) {
        amount = pendingWithdrawals[msg.sender];
    }

    function remainingTime() public view returns (uint time) {
        uint endTime = startTime + gameDuration * 1 minutes;
        time = (startTime == 0 || block.timestamp >= endTime) ? 0 : endTime - block.timestamp;
    }
}
