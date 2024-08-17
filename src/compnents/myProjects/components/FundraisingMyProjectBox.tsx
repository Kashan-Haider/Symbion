import React from "react";
import { useStore } from "../../../zustand/store";
import { Contract, ethers, toNumber } from "ethers";
import { contract_abi, contract_address } from "../../../lib/abi";
// import { useRouter } from 'next/navigation'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const FundraisingMyProjectBox = (props: {
  project: {
    projectId: string;
    projectWallet: string;
    goalAmount: string;
    deadline: string;
    amountRaised: String;
    fundType: string;
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
  const handleWithdrawal = async (
    projectId: string,
    withdrawalAmount: string
  ) => {
    const tx = await contract.withdrawFunds(
      projectId,
      ethers.parseEther(withdrawalAmount)
    );
    toast.promise(tx.wait(), {
      loading: "Withdrawing Ether",
      success: "Ethers Withdrawn successfully",
      error: (err) => `Error: ${err}`,
    });
  };
  const id = props.project.projectId;
  return (
    <div className="">
      {id != "0" ? (
        <div
          key={props.project.projectId}
          className="text-sm bg-[#ffffff18] px-5 py-10 shadow-black rounded-lg shadow-lg m-3 text-white w-fit"
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
            {props.project.deadline} {toNumber(props.project.deadline)>1?'days':'day'}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Amount Raised:</span>{" "}
            {props.project.amountRaised} ETH
          </p>
          <p className="mb-2">
            <span className="font-semibold">Project type:</span>{" "}
            {props.project.fundType} (Fundraising)
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleWithdrawal(props.project.projectId, "10")}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm shadow-lg shadow-gray-800 hover:bg-blue-700 transition-all duration-300"
            >
              Withdraw 10 ETH
            </button>
            <button
              onClick={() => handleDelete(props.project.projectId)}
              className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm shadow-lg shadow-gray-800 hover:bg-red-700 transition-all duration-300"
            >
              Delete Project
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

export default FundraisingMyProjectBox;
