// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("TimeLockPool");
  const greeter = await Greeter.deploy("Staked Hunt", "SHUNT", '0x3a69ce86d426A10fF2f389E3063732897F6E51Ce', '0x3a69ce86d426A10fF2f389E3063732897F6E51Ce', "0xA87f927CBf35B417Dc678104b06fEb76893c7E90", '1000000000000000000', 3600, '1000000000000000000', 31536000);

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
