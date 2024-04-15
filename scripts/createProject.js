const { ethers } = require("hardhat");

// Update the contract address with the deployed address
const contractAddr = "0x39a858E90F8F65f3e85bb441ce06DDd92EC41e7c"; // Update with deployed contract address

async function main() {
  const CrowdTank = await ethers.getContractFactory("CrowdTank");
  const crowdTank = await CrowdTank.attach(contractAddr);

  // Feature 1: Read-only method to get remaining time for funding deadline
  async function getRemainingTime(projectId) {
    return await crowdTank.getRemainingTime(projectId);
  }

  // Feature 2: Variable to track total projects created
  const totalProjects = await crowdTank.totalProjects();

  // Feature 3: Function to enhance the deadline for a project
  const additionalSeconds = 604800; // 7 days in seconds
  async function enhanceDeadline(projectId, additionalSeconds) {
    await crowdTank.enhanceDeadline(projectId, additionalSeconds);
    console.log("Enhanced Deadline for Project ", projectId);
  }

  // Feature 4: Functionality to track funded and failed projects
  const fundedProjects = await crowdTank.getSuccessfulProjects();
  const failedProjects = await crowdTank.getFailedProjects();

  // Feature 5: Functionality for system commission
  const userFunding = ethers.utils.parseEther("100"); // 100 ETH in wei
  const commission = userFunding.mul(5).div(100); // Calculate commission (5%)
  const commissionCollected = await crowdTank.commissionCollected();
  async function withdrawCommission() {
    await crowdTank.withdrawCommission();
    console.log("Commission Withdrawn");
  }

  // Function to create a new project
  const name = "Project Name";
  const description = "Project Description";
  const fundingGoal = ethers.utils.parseEther("1");
  const durationSeconds = 1000;
  const id = 678;

  // Additional operations if needed
     // Calling the transaction to create a project
  const txn = await crowdTank.createProject(name, description, fundingGoal, durationSeconds, id);
  console.log("Txn Hash:", txn.hash); // Log the transaction hash
  console.log("Project Created");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
