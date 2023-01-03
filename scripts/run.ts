import hre from "hardhat";

const main = async () => {
  const lockedAmount = hre.ethers.utils.parseEther("1");

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({ value: lockedAmount });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);


  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  await waveContract.getTotalWavesCount();

  const [firstPerson, secondPerson] = await hre.ethers.getSigners();
  const waveTxn1 = await waveContract.connect(secondPerson).wave("A message!");
  await waveTxn1.wait();
  const waveTxn2 = await waveContract.connect(firstPerson).wave("A second message!");
  await waveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  const totalWaveCount = await waveContract.getTotalWavesCount();
  console.log(`totalWaveCount: ${totalWaveCount}`);
  const highestWavesAddress = await waveContract.getHighestWaveAddress();
  console.log(`highest waves address: ${highestWavesAddress}`);
  const secondPersonWaveCount = await waveContract.connect(secondPerson).getMyWaveCount();
  console.log(`wave count for second person ${secondPersonWaveCount}`)

  const waves = await waveContract.getAllWaves();
  console.log(`waves: ${waves}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
