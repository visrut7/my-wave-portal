import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
})

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    defaultNetwork: {
      url: 'hardhat',
    },
    hardhat: {},
    goerli: {
      url: process.env.STAGING_QUICKNODE_KEY || "https://dummy.url.com",
      accounts: [process.env.PRIVATE_KEY || "0x1234567890123456789012345678901234567890123456789012345678901234" ]
    }
  }
};

export default config;
