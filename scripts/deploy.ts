import hre from "hardhat";

const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    console.log(`deploying contract with account: ${deployer.address}`);
    console.log(`Account balance: ${accountBalance.toString()}`);

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log(`contract deployed with account: ${deployer.address}`);
    console.log(`contract deployed to: ${waveContract.address}`);
    console.log(`Account balance: ${accountBalance.toString()}`);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

runMain();