const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const BlockchainVoting = await hre.ethers.getContractFactory("BlockchainVoting");

  // Deploy the contract
  const contract = await BlockchainVoting.deploy();

  // Wait for deployment to finish
  await contract.deployed();

  console.log(`✅ Contract deployed at address: ${contract.address}`);
}

// Error handling
main().catch((error) => {
  console.error("❌ Error during deployment:", error);
  process.exitCode = 1;
});
