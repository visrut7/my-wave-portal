import { expect } from "chai";
import { ethers } from "hardhat";

describe("WavePortal", () => {
  const lockedAmount = ethers.utils.parseEther("1");

  async function deployWavePortalFixture() {
    // Contracts are deployed using the first signer/account by default

    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy({ value: lockedAmount });

    return wavePortal;
  }

  describe("Waves", () => {
    it("Should increase wave counts when we waves", async () => {
      const [firstAccount, secondAccount] = await ethers.getSigners();
      const wavePortal = await deployWavePortalFixture();
      await wavePortal.connect(firstAccount).wave("A");
      await wavePortal.connect(secondAccount).wave("A");
      const totalWavesCount = await wavePortal.getTotalWavesCount();
      expect(totalWavesCount).to.equal(2);
    })

    it("Should increase local wave counts when we waves", async () => {
      const [firstAccount, secondAccount, thirdAccount] = await ethers.getSigners();
      const wavePortal = await deployWavePortalFixture();
      await wavePortal.connect(secondAccount).wave("A")
      await wavePortal.connect(firstAccount).wave("A");

      const firstPersonWaveCount = await wavePortal.connect(firstAccount).getMyWaveCount();
      const secondPersonWaveCount = await wavePortal.connect(secondAccount).getMyWaveCount();
      const thirdPersonWaveCount = await wavePortal.connect(thirdAccount).getMyWaveCount();

      expect(firstPersonWaveCount).to.equal(1);
      expect(secondPersonWaveCount).to.equal(1);
      expect(thirdPersonWaveCount).to.equal(0);
    })

    it("Should return highest wave address correct", async () => {
      const [firstAccount, secondAccount] = await ethers.getSigners();
      const wavePortal = await deployWavePortalFixture();
      await wavePortal.connect(secondAccount).wave("A")
      await wavePortal.connect(firstAccount).wave("A");

      const highestWaveAddress = await wavePortal.getHighestWaveAddress();
      expect(highestWaveAddress).to.equal(firstAccount.address);
    })


    it("Should return all waves", async () => {
      const [firstAccount, secondAccount] = await ethers.getSigners();
      const wavePortal = await deployWavePortalFixture();
      await wavePortal.connect(secondAccount).wave("This is from second.")
      await wavePortal.connect(firstAccount).wave("first");

      const [wave1, wave2] = await wavePortal.getAllWaves();
      expect(wave1["message"]).to.equal("This is from second.");
      expect(wave1["waver"]).to.equal(secondAccount.address);

      expect(wave2["message"]).to.equal("first");
      expect(wave2["waver"]).to.equal(firstAccount.address);
    })
  })
})
