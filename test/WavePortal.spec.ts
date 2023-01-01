import { expect } from "chai";
import { ethers } from "hardhat";

describe("WavePortal", () => {

    async function deployWavePortalFixture() {
        // Contracts are deployed using the first signer/account by default

        const WavePortal = await ethers.getContractFactory("WavePortal");
        const wavePortal = await WavePortal.deploy();

        return wavePortal; 
    }

    describe("Waves", () => {
        it("Should increase wave counts when we waves", async () => {
            const wavePortal = await deployWavePortalFixture();
            await wavePortal.wave();
            await wavePortal.wave();
            const totalWaves = await wavePortal.getTotalWaves();
            expect(totalWaves).to.equal(2);
        })

        it("Should increase local wave counts when we waves", async () => {
            const [firstAccount, secondAccount] = await ethers.getSigners();
            const wavePortal = await deployWavePortalFixture();
            await wavePortal.connect(secondAccount).wave()
            await wavePortal.connect(firstAccount).wave();
            await wavePortal.connect(secondAccount).wave()
            await wavePortal.connect(firstAccount).wave();
            await wavePortal.connect(secondAccount).wave()

            const firstPersonWaveCount = await wavePortal.connect(firstAccount).getMyWaveCount();
            const secondPersonWaveCount = await wavePortal.connect(secondAccount).getMyWaveCount();
            
            expect(firstPersonWaveCount).to.equal(2);
            expect(secondPersonWaveCount).to.equal(3);
        })
    })
})