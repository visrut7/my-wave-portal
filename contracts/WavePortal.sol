// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract WavePortal {
    // structs
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    // state variables
    Wave[] waves;
    uint256 totalWaves;
    address highestWaver;
    mapping(address => uint256) public localWavesCount;

    // events
    event NewWave(address indexed from, uint256 timestamp, string message);

    // methods
    function wave(string memory _message) public {
        totalWaves += 1;
        localWavesCount[msg.sender] += 1;
        if (localWavesCount[msg.sender] > localWavesCount[highestWaver]) {
            highestWaver = msg.sender;
        }
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWavesCount() public view returns (uint256) {
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getHighestWaveAddress() public view returns (address) {
        return highestWaver;
    }

    function getMyWaveCount() public view returns (uint256) {
        return localWavesCount[msg.sender];
    }
}
