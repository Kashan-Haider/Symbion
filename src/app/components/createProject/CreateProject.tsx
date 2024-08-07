"use client";
import React, { useState, useEffect } from "react";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useStore } from "@/zustand/store";
import SmallHeading from "../ui/SmallHeading";
import SlidingBgButton from "../ui/SlidingBgButton";
import { ContractManager } from "@/lib/contract_interaction"; // Adjust the path as necessary
import { ethers } from "ethers";

const CreateProject = () => {
  const [isSelected, setIsSelected] = useState("crowdFunding");
  const [connectedAccAddress, setConnectedAccAddress] = useState("");
  const [projectWallet, setProjectWallet] = useState(connectedAccAddress);
  const [goalAmount, setGoalAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  let provider = useStore((state) => state.provider);
  let signer = useStore((state) => state.signer);

  useEffect(() => {
    const getAddress = async () => {
      const address = await signer.getAddress();
      setConnectedAccAddress(address);
      setProjectWallet(address);
    };
    if (signer) {
      getAddress();
    }
  }, [provider, signer]);

  const handleSubmit = async () => {
    if (projectWallet && goalAmount && deadline) {
      try {
        const contractManager = await ContractManager.getInstance();
        console.log("ContractManager:", contractManager);
        
        await contractManager.addProject(
          projectWallet,
          goalAmount,
          parseInt(deadline)
        );
        console.log(
          "Successful with the inputs: ",
          projectWallet,
          goalAmount,
          deadline
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
      <Heading>Create A Project</Heading>
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
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-5 my-10 bg-[#ffffff18] w-fit rounded-2xl p-10 shadow-lg shadow-black">
            <SmallHeading>CrowdFunding</SmallHeading>
            <label
              htmlFor=""
              className="text-white text-xs font-light text-left"
            >
              Project Owner
            </label>
            <input
              onChange={(e) => {
                setProjectWallet(e.target.value);
              }}
              value={projectWallet}
              className="text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white"
              type="text"
              placeholder="Project Wallet"
            />
            <label
              htmlFor=""
              className="text-white text-xs font-light text-left"
            >
              Goal Amount
            </label>
            <input
              onChange={(e) => {
                setGoalAmount(e.target.value);
              }}
              value={goalAmount}
              className="text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white"
              type="number"
              placeholder="Goal Amount"
            />
            <label
              htmlFor=""
              className="text-white text-xs font-light text-left"
            >
              Deadline
            </label>
            <input
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
              value={deadline}
              className="text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white"
              type="number"
              placeholder="Deadline(In Days)"
              name=""
              id=""
            />
            <div onClick={handleSubmit}>
              <SlidingBgButton>Submit</SlidingBgButton>
            </div>
          </div>
        </div>
      )}
      {isSelected === "fundraising" && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-5 my-10 bg-[#ffffff18] w-fit rounded-2xl p-10 shadow-lg shadow-black">
            <SmallHeading>FundRaising</SmallHeading>
            <label
              htmlFor=""
              className="text-white text-xs font-light text-left"
            >
              Project Owner
            </label>
            <input
              onChange={(e) => {
                setProjectWallet(e.target.value);
              }}
              value={projectWallet}
              className="text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white"
              type="text"
              placeholder="Project Wallet"
            />
            <label
              htmlFor=""
              className="text-white text-xs font-light text-left"
            >
              Goal Amount
            </label>
            <input
              onChange={(e) => {
                setGoalAmount(e.target.value);
              }}
              value={goalAmount}
              className="text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white"
              type="number"
              placeholder="Goal Amount"
            />
            <label
              htmlFor=""
              className="text-white text-xs font-light text-left"
            >
              Deadline
            </label>
            <input
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
              value={deadline}
              className="text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white"
              type="number"
              placeholder="Deadline(In Days)"
              name=""
              id=""
            />
            <div onClick={handleSubmit}>
              <SlidingBgButton>Submit</SlidingBgButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProject;
