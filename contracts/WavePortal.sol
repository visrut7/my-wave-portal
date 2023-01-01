// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract WavePortal {
    uint totalWaves;
    address highestWaver;
    mapping(address => uint) public localWaves;

    function wave() public {
        totalWaves += 1;
        localWaves[msg.sender] += 1;
        if(localWaves[msg.sender] > localWaves[highestWaver]) {
            highestWaver = msg.sender;
        }
    }

    function getTotalWaves() public view returns (uint) {
        return totalWaves;
    }

    function getHighestWavesAddress() public view returns (address) {
        return highestWaver;
    }

    function getMyWaveCount() public view returns (uint) {
        return localWaves[msg.sender];
    }
}
