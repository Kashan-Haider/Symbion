import React from "react";
import { useStore } from "../../../zustand/store";
import { Contract, ethers } from "ethers";
import { contract_abi, contract_address } from "../../../lib/abi";
// import { useRouter } from 'next/navigation'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProjectBox = (props: {
  project: {
    projectId: string;
    projectWallet: string;
    goalAmount: string;
    deadline: string;
    amountRaised: String;
  };
}) => {
  // const router = useRouter()
  const notify = () => toast.success("Project Deleted Successfully");
  const navigate = useNavigate();
  const provider = useStore((state) => state.provider);
  const signer = useStore((state) => state.signer);
  const contract = new Contract(contract_address, contract_abi, signer);

  const handleDelete = async (id: string) => {
    try {
      const tx = await contract.deleteProject(id);
      await tx.wait();
      notify();
      // router.push('/')
      // navigate('/');
    } catch (err) {
      console.log("Failed to delete with error, ", err);
    }
  };
  const handleDeposit = async (projectId: string) => {
    const tx = await contract.depositFunds_Fundraising(projectId, {
      value: ethers.parseEther("10"),
    });
    toast.promise(tx.wait(), {
      loading: "Depositing Ether",
      success: "Ethers Deposited successfully",
      error: (err) => `Error: ${err}`,
    });
  };
  const id = props.project.projectId;
  return (
    <div className="">
      {id != "0" ? (
        <div
          key={props.project.projectId}
          className="bg-[#ffffff18] p-10 shadow-black rounded-lg shadow-lg m-3 text-white w-fit"
        >
          <p className="mb-2">
            <span className="font-semibold">Project ID:</span>{" "}
            {props.project.projectId}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Project Wallet:</span>{" "}
            {props.project.projectWallet}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Goal Amount:</span>{" "}
            {props.project.goalAmount} ETH
          </p>
          <p className="mb-2">
            <span className="font-semibold">Deadline:</span>{" "}
            {props.project.deadline} days
          </p>
          <p className="mb-2">
            <span className="font-semibold">Amount Raised:</span>{" "}
            {props.project.amountRaised} ETH
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleDeposit(props.project.projectId)}
              className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm shadow-lg shadow-gray-800 hover:bg-green-700 transition-all duration-300"
            >
              Deposit 10 ETH
            </button>
          </div>
          <Toaster />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectBox;
