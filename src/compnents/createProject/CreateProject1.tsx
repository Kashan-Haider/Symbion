"use client";
import React, { useState, useEffect } from "react";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useStore } from "../../zustand/store";
import SmallHeading from "../../ui/SmallHeading";
import SlidingBgButton from "../../ui/SlidingBgButton";
import { contract_abi, contract_address } from "../../lib/abi";
import { Contract } from "ethers";
import toast, { Toaster } from 'react-hot-toast';
import { ethers } from 'ethers';
import CrowdFunding from "./components/CrowdFunding";
import Fundraising from "./components/Fundraising";
// import { useRouter } from "next/navigation";

const CreateProject = () => {
  // const router = useRouter()
  const notify = () => toast.success('Project Created Successfully');

  const [contractBalance, setContractBalance] = useState('');

  const [isSelected, setIsSelected] = useState("crowdFunding");
  const [connectedAccAddress, setConnectedAccAddress] = useState("");
  const [contract, setContract] = useState<any>();
  const [projectWallet, setProjectWallet] = useState(connectedAccAddress);
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const provider = useStore((state) => state.provider);
  const signer = useStore((state) => state.signer);



  const fetchContractBalance = async () => {
    if (!provider || !contract_address) return;
    const balance = await provider.getBalance(contract_address);
    setContractBalance(ethers.formatEther(balance));
  };

  

  const handleSubmit_Crowdfunding = async () => {
    if (projectWallet && goalAmount && deadline) {
      try {
        const crowdfundingType = 0;
        const tx = await contract.addProject(
          projectWallet,
          goalAmount,
          parseInt(deadline),
          crowdfundingType
        );
        await tx.wait()
        // router.refresh()
        notify()
        console.log(
          "Successful with the inputs: ",
          projectWallet,
          goalAmount,
          deadline,
          crowdfundingType
        );
        setProjectWallet("");
        setGoalAmount("");
        setDeadline("");
      } catch (error) {
        console.error("Error adding project: ", error);
      }
    } else {
      console.log("Enter valid input", projectWallet, goalAmount, deadline);
    }
  };

  return (
    <div id="create-project">
      <div>
        <button onClick={fetchContractBalance}>Fetch Balance</button>
        {contractBalance && <p>Contract Balance: {contractBalance} ETH</p>}
      </div>
      <Heading>Create A Project</Heading>
      <Toaster />
      <p className="capitalize font-light text-sm tracking-[10px] text-white text-center">
        Right Away
      </p>
      <div className="flex justify-around my-5">
        <div onClick={() => setIsSelected("fundraising")}>
          <Button title="fundraising" isSelected={isSelected}>
            Fundraising Project
          </Button>
        </div>
        <div onClick={() => setIsSelected("crowdFunding")}>
          <Button title="crowdFunding" isSelected={isSelected}>
            CrowdFunding Project
          </Button>
        </div>
      </div>
      {isSelected === "crowdFunding" && (
        <CrowdFunding/>
      )}
      {isSelected === "fundraising" && (
        <Fundraising/>
      )}
    </div>
  );
};

export default CreateProject;
