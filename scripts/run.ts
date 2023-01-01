import hre from "hardhat";

const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);

  await waveContract.getTotalWaves();

  const [firstPerson, secondPerson]= await hre.ethers.getSigners();
  const waveTxn1 = await waveContract.connect(secondPerson).wave();
  await waveTxn1.wait();
  const waveTxn2 = await waveContract.connect(secondPerson).wave();
  await waveTxn2.wait();
  const waveTxn3 = await waveContract.wave();
  await waveTxn3.wait();

  await waveContract.getTotalWaves();
  const highestWavesAddress = await waveContract.getHighestWavesAddress();
  console.log(`highest waves address: ${highestWavesAddress}`);
  const secondPersonWaveCount = await waveContract.getMyWaveCount();
  console.log(`wave count for ${secondPersonWaveCount}`)
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