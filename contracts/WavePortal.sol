// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    address highestWaver;
    mapping(address => uint) public localWaves;

    constructor() {
        console.log("I am a smart contract created by Visrut!");
    }

    function wave() public {
        totalWaves += 1;
        localWaves[msg.sender] += 1;
        if(localWaves[msg.sender] > localWaves[highestWaver]) {
            highestWaver = msg.sender;
        }
        console.log("%s has waved!, your local waves are %d", msg.sender, localWaves[msg.sender]);
    }

    function getTotalWaves() public view returns (uint) {
        console.log("total waves: %d", totalWaves);
        return totalWaves;
    }

    function getHighestWavesAddress() public view returns (address) {
        return highestWaver;
    }
}
