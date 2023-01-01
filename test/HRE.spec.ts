import hre from "hardhat";
import { expect } from "chai";

describe("Hardhat Runtime Environment", () => {
    it("should have a config field", () => {
        expect(hre.config).to.not.equal(undefined);
    })

    it("should contain the same version as given in config", () => {
        expect(hre.config.solidity.compilers[0].version).to.equal("0.8.17");
    })
})