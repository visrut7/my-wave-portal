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
    uint256 private seed;
    mapping(address => uint256) public localWavesCount;
    mapping(address => uint256) public lastWavedAt;

    // events
    event NewWave(address indexed from, uint256 timestamp, string message);

    // constructor
    constructor() payable {
        seed = (block.timestamp + block.difficulty) % 100;
    }

    // methods
    function wave(string memory _message) public {
        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        /*
         * Update the current timestamp we have for the user
         */
        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        localWavesCount[msg.sender] += 1;
        if (localWavesCount[msg.sender] >= localWavesCount[highestWaver]) {
            highestWaver = msg.sender;
        }
        waves.push(Wave(msg.sender, _message, block.timestamp));

        /*
         * Generate a new seed for the next user that sends a wave
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;

        /*
         * Give a 50% chance that the user wins the prize.
         */
        if (seed <= 50) {
            /*
             * The same code we had before to send the prize.
             */
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
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
