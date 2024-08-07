import { ethers } from "ethers";
import { contract_abi, contract_address } from "./abi"; // Replace with your actual ABI import

// Define the provider (MetaMask's provider)

export class Project {
  constructor(projectId, projectWallet, goalAmount, deadline, amountRaised) {
    this.projectId = projectId;
    this.projectWallet = projectWallet;
    this.goalAmount = goalAmount;
    this.deadline = deadline;
    this.amountRaised = amountRaised;
  }
}

export class ContractManager {
  constructor(signer) {
    this.signer = signer;
    this.contract = new ethers.Contract(
      contract_address,
      contract_abi,
      this.signer
    );
  }

  static async getInstance() {
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    if (!this.instance) {
      this.instance = new ContractManager(signer);
    }

    return this.instance;
  }

  async getAllProjects() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum, "any");
      const read_contract = new ethers.Contract(
        contract_address,
        contract_abi,
        provider
      );

      const [projectIds, projectWallets, goalAmounts, deadlines, amountRaised] =
        await read_contract.getAllProjects();

      const projects = [];
      for (let i = 0; i < projectIds.length; i++) {
        const project = new Project(
          parseInt(projectIds[i]),
          projectWallets[i],
          ethers.formatUnits(goalAmounts[i].toString(), "ether"),
          parseInt(deadlines[i]),
          parseInt(amountRaised[i])
        );
        projects.push(project);
      }

      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  getAddress(num) {
    // Example BigInt
    const bigIntValue = num;
    if (bigIntValue == 0) {
      return ethers.ZeroAddress;
    }

    // Convert BigInt to hex string and ensure it's padded to 64 characters
    const hexString = "0x" + bigIntValue.toString(16);
    const address = ethers.getAddress(hexString);
    return address;
  }

  async addProject(projectWallet, goalAmount, deadline) {
    try {
      const tx = await this.contract.addProject(
        projectWallet,
        ethers.parseUnits(goalAmount, "ether"),
        deadline
      );
      console.log(`Add project transaction sent. Hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Add project transaction confirmed.`);
    } catch (error) {
      console.error(`Error adding project:`, error);
    }
  }

  async deleteProject(projectId) {
    try {
      const tx = await this.contract.deleteProject(projectId);
      console.log(`Delete project transaction sent. Hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Delete project transaction confirmed.`);
    } catch (error) {
      console.error(`Error deleting project:`, error);
    }
  }

  async depositFundsFundraising(projectId, amount) {
    try {
      const tx = await this.contract.depositFunds_Fundraising(projectId, {
        value: ethers.parseUnits(amount, "ether"),
      });
      console.log(
        `Deposit funds for fundraising transaction sent. Hash: ${tx.hash}`
      );
      await tx.wait();
      console.log(`Deposit funds for fundraising transaction confirmed.`);
    } catch (error) {
      console.error(`Error depositing funds for fundraising:`, error);
    }
  }

  async depositFundsCrowdfunding(projectId, amount) {
    try {
      const tx = await this.contract.depositFunds_Crowdfunding(projectId, {
        value: ethers.parseUnits(amount, "ether"),
      });
      console.log(
        `Deposit funds for crowdfunding transaction sent. Hash: ${tx.hash}`
      );
      await tx.wait();
      console.log(`Deposit funds for crowdfunding transaction confirmed.`);
    } catch (error) {
      console.error(`Error depositing funds for crowdfunding:`, error);
    }
  }

  async permitWithdrawal(projectId) {
    try {
      const tx = await this.contract.permitWithdrawal(projectId);
      console.log(`Permit withdrawal transaction sent. Hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Permit withdrawal transaction confirmed.`);
    } catch (error) {
      console.error(`Error permitting withdrawal:`, error);
    }
  }

  async requestWithdrawal(projectId) {
    try {
      const tx = await this.contract.requestWithdrawal(projectId);
      console.log(`Request withdrawal transaction sent. Hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Request withdrawal transaction confirmed.`);
    } catch (error) {
      console.error(`Error requesting withdrawal:`, error);
    }
  }

  async withdrawFunds(projectId, amount) {
    try {
      const tx = await this.contract.withdrawFunds(
        projectId,
        ethers.parseUnits(amount, "ether")
      );
      console.log(`Withdraw funds transaction sent. Hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Withdraw funds transaction confirmed.`);
    } catch (error) {
      console.error(`Error withdrawing funds:`, error);
    }
  }
}
