import React, { useState } from "react";
import { useStore } from "../../../zustand/store";
import { Contract, ethers, toNumber } from "ethers";
import { contract_abi, contract_address } from "../../../lib/abi";
// import { useRouter } from 'next/navigation'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const FundraisingProjectBox = (props: {
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
  const [amount, setAmount] = useState('')
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
      value: ethers.parseEther(amount.toString()),
    });
    toast.promise(tx.wait(), {
      loading: "Depositing Ether",
      success: `${amount} Ethers Deposited successfully`,
      error: (err) => `Error: ${err}`,
    });
    setAmount('')
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
            <span className="font-semibold">Project Type:</span>{" "}
            {props.project.fundType} (Fundraising)
          </p>
          <div className="flex gap-3">
            <input onChange={(e:any)=> setAmount(e.target.value)} value={amount} className=" outline-none border-b-[1px] border-white bg-transparent" type="text" placeholder="Enter Amount" />
            <button
              onClick={() => handleDeposit(props.project.projectId)}
              className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm shadow-lg shadow-gray-800 hover:bg-green-700 transition-all duration-300"
            >
              Deposit ETH
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

export default FundraisingProjectBox;
