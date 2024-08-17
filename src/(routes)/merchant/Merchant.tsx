import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { crowdFunding_abi, crowdFunding_address } from "../../lib/abi";
import SmallHeading from "../../ui/SmallHeading";
import Heading from "../../ui/Heading";
import SlidingBgButton from "../../ui/SlidingBgButton";

const Merchant = () => {
  const [wallet, setWallet] = useState("");
  const [projectIdForStartInvestment, setprojectIdForStartInvestment] =
    useState("");
  const [goalAmountForStartInvestment, setgoalAmountForStartInvestment] =
    useState("");
  const [yourDepositForStartInvestment, setyourDepositForStartInvestment] =
    useState("");
  const [deadlineForStartInvestment, setdeadlineForStartInvestment] =
    useState("");
  const [
    profitSharingRatioForStartInvestment,
    setprofitSharingRatioForStartInvestment,
  ] = useState("");

  const [projectIdForEndInvestment, setprojectIdForEndInvestment] =
    useState("");


  const [projectIdForProfitDistribution, setprojectIdForProfitDistribution] = useState('')
  const [profitAmount, setprofitAmount] = useState('')

  const [contract, setContract] = useState<any>();
  const [address, setAddress] = useState("");
  useEffect(() => {
    const handleConnect = async () => {
      const windowObj = window as any;
      const provider = new ethers.BrowserProvider(windowObj.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(
        crowdFunding_address,
        crowdFunding_abi,
        signer
      );
      setContract(contract);
      setAddress(address);

      setWallet(address);
    };
    handleConnect();
  }, []);
  const handleCreate = async () => {
    const tx = await contract.addProject(wallet);
  };
  const handleStartInvestment = async () => {
    const tx = await contract.startInvestmentRound(
      projectIdForStartInvestment,
      goalAmountForStartInvestment,
      deadlineForStartInvestment,
      profitSharingRatioForStartInvestment,
      { value: ethers.parseEther(yourDepositForStartInvestment) }
    );
    await tx.wait();
    setprojectIdForStartInvestment('')
    setprofitSharingRatioForStartInvestment("");
    setgoalAmountForStartInvestment("");
    setyourDepositForStartInvestment("");
    setdeadlineForStartInvestment("");
    setprofitSharingRatioForStartInvestment("");
  };
  const handleEndInvestment = async () => {
    const tx = await contract.endInvestmentRound(projectIdForEndInvestment);
    await tx.wait();
    setprojectIdForEndInvestment("");
  };
  const handleProfitDistribution= async () => {
    const tx = await contract.distributeProfits(projectIdForProfitDistribution, {value:ethers.parseEther(profitAmount)});
    await tx.wait();
    setprojectIdForProfitDistribution("");
    setprofitAmount("")
  };
  return (
    <div className="text-white p-5 md:p-10 flex flex-col gap-5 items-center justify-center bg-[#2a2a2a]">
      <Heading>Merchant</Heading>
      {/* create a new project */}
      <div className="w-full md:w-[60%] lg:w-[40%] bg-[#fff2] rounded-xl shadow-lg shadow-black p-5 md:p-10">
        <SmallHeading>Create A New Project</SmallHeading>
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter your wallet address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <div onClick={handleCreate}>
          <SlidingBgButton title="Create" />
        </div>
      </div>

      {/* start investment */}
      <div className="w-full md:w-[60%] lg:w-[40%] bg-[#fff2] rounded-xl shadow-lg shadow-black p-5 md:p-10">
        <SmallHeading>Start Investment</SmallHeading>
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter your project ID"
          value={projectIdForStartInvestment}
          onChange={(e) => setprojectIdForStartInvestment(e.target.value)}
        />
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter the goal amount"
          value={goalAmountForStartInvestment}
          onChange={(e) => setgoalAmountForStartInvestment(e.target.value)}
        />
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter your deposit"
          value={yourDepositForStartInvestment}
          onChange={(e) => setyourDepositForStartInvestment(e.target.value)}
        />
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter the project deadline"
          value={deadlineForStartInvestment}
          onChange={(e) => setdeadlineForStartInvestment(e.target.value)}
        />
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter the profit sharing ratio"
          value={profitSharingRatioForStartInvestment}
          onChange={(e) =>
            setprofitSharingRatioForStartInvestment(e.target.value)
          }
        />
        <div onClick={handleStartInvestment}>
          <SlidingBgButton title="Start Investment" />
        </div>
      </div>

      {/* end investment */}
      <div className="w-full md:w-[60%] lg:w-[40%] bg-[#fff2] rounded-xl shadow-lg shadow-black p-5 md:p-10">
        <SmallHeading>End Investment</SmallHeading>
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter the project ID"
          value={projectIdForEndInvestment}
          onChange={(e) => setprojectIdForEndInvestment(e.target.value)}
        />
        <div onClick={handleEndInvestment}>
          <SlidingBgButton title="End Investment" />
        </div>
      </div>

      {/* distribute profits */}
      <div className="w-full md:w-[60%] lg:w-[40%] bg-[#fff2] rounded-xl shadow-lg shadow-black p-5 md:p-10">
        <SmallHeading>Distribute Profits</SmallHeading>
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter your project ID"
          value={projectIdForProfitDistribution}
          onChange={(e) => setprojectIdForProfitDistribution(e.target.value)}
        />
        <input
          className="w-full mb-3 bg-transparent outline-none border-b-[1px] border-white p-2 text-white placeholder:text-white"
          type="text"
          placeholder="Enter the profit amount"
          value={profitAmount}
          onChange={(e) => setprofitAmount(e.target.value)}
        />
        <div onClick={handleProfitDistribution}>
          <SlidingBgButton title="Distribute Profits" />
        </div>
      </div>
    </div>
  );
};

export default Merchant;
