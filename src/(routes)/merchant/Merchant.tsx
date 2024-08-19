import { BigNumberish, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { crowdFunding_abi, crowdFunding_address } from "../../lib/abi";
import SmallHeading from "../../ui/SmallHeading";
import Heading from "../../ui/Heading";
import SlidingBgButton from "../../ui/SlidingBgButton";
import toast, { Toaster } from "react-hot-toast";

interface CrowdfundingProjectType {
  projectId: number;
  projectWallet: string;
  goalAmount: number;
  deadline: number;
  amountRaised: number;
  profitSharingRatio: number;
  merchantDeposit: number;
  investmentRoundIsActive: boolean;
  profitDistributionIsDone: boolean;
}
interface InvestmentType {
  projectId: number;
  investmentId: string;
  amount: number;
  refundStatuse: boolean;
}
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
  const [myProjects, setMyProjects] = useState<CrowdfundingProjectType[]>([])
  const [projectIdForProfitDistribution, setprojectIdForProfitDistribution] = useState('')
  const [profitAmount, setprofitAmount] = useState('')
  const [investments, setInvestments] = useState<InvestmentType[]>([]);

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


      let [cfProjectIds, cfProjectWallets] =
        await contract.getAllProjects();
      let [
        cfgoalAmounts,
        cfdeadlines,
        cfamountsRaised,
        cfprofitSharingRatios,
        cfmerchantDeposits,
        cfinvestmentRoundsActive,
        cfprofitDistributionsDone,
      ] = await contract.getAllInvestmentRoundDetails();

      cfProjectIds = cfProjectIds.map((projectId: BigNumberish) => {
        return Number(projectId);
      });
      cfProjectWallets = cfProjectWallets.map((projectWallet: string) => {
        return projectWallet;
      });
      cfgoalAmounts = cfgoalAmounts.map((goalamount: BigNumberish) => {
        return Number(goalamount);
      });
      cfdeadlines = cfdeadlines.map((deadline: BigNumberish) => {
        return Number(deadline);
      });
      cfamountsRaised = cfamountsRaised.map((amountraised: BigNumberish) => {
        return Number(amountraised);
      });
      cfprofitSharingRatios = cfprofitSharingRatios.map(
        (profitsharingratio: BigNumberish) => {
          return Number(profitsharingratio);
        }
      );
      cfmerchantDeposits = cfmerchantDeposits.map(
        (merchantdeposit: BigNumberish) => {
          return Number(merchantdeposit);
        }
      );
      cfinvestmentRoundsActive = cfinvestmentRoundsActive.map(
        (investmentRoundsActive: boolean) => {
          return investmentRoundsActive;
        }
      );
      cfprofitDistributionsDone = cfprofitDistributionsDone.map(
        (profitdistributiondone: boolean) => {
          return profitdistributiondone;
        }
      );
      const formatedCfProjects = cfProjectIds.map((_: any, i: number) => {
        return {
          projectId: cfProjectIds[i],
          projectWallet: cfProjectWallets[i],
          goalAmount: cfgoalAmounts[i],
          deadline: cfdeadlines[i],
          amountRaised: cfamountsRaised[i],
          profitSharingRatio: cfprofitSharingRatios[i],
          merchantDeposit: cfmerchantDeposits[i],
          investmentRoundIsActive: cfinvestmentRoundsActive[i],
          profitDistributionIsDone: cfprofitDistributionsDone[i],
        };
      });
      const filteredProjects = formatedCfProjects.filter((project:CrowdfundingProjectType)=>{
        return project.projectWallet == address
      })
      setMyProjects(filteredProjects)
      setAddress(address);

      
      setContract(contract);

      setWallet(address);
    };
    handleConnect();
  }, []);

  const handleCreate = async () => {
    const tx = await contract.addProject(wallet);
    await tx.wait()
    toast.success("Project created")
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
    toast.success("Project Investment Round Started")
  };
  const handleEndInvestment = async () => {
    const tx = await contract.endInvestmentRound(projectIdForEndInvestment);
    await tx.wait();
    setprojectIdForEndInvestment("");
    toast.success("Project Investment Round Ended")
  };
  const handleProfitDistribution= async () => {
    const tx = await contract.distributeProfits(projectIdForProfitDistribution, {value:ethers.parseEther(profitAmount)});
    await tx.wait();
    setprojectIdForProfitDistribution("");
    setprofitAmount("")
    toast.success("Project Distribution Done")
    
  };
  // const handleWithdrawal = async()=>{
  //   const tx = await contract.
  // }
  const handleDelete = async(id:number)=>{
    const tx = await contract.deleteProject(id)
    await tx.wait()
    toast.success("Project Deleted")
  }
  const fetchInvestments = async(id:any)=>{
    let [projectIds, investmentIds, amounts, refundStatuses] =
        await contract.getInvestmentsByProjectId(id);
        projectIds = projectIds.map((item: BigNumberish) => {
          return Number(item);
        });
        investmentIds = investmentIds.map((item: any) => {
          return item;
        });
        amounts = amounts.map((item: BigNumberish) => {
          return Number(item);
        });
        refundStatuses = refundStatuses.map((item: boolean) => {
          return item;
        });
        const formatedData: InvestmentType[] = projectIds.map(
          (_: any, i: number) => {
            return {
              projectId: projectIds[i],
              investmentId: investmentIds[i],
              amount: amounts[i],
              refundStatuse: refundStatuses[i],
            };
          }
        );
        console.log(formatedData);
        setInvestments(formatedData);
  }
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

      {/* my projects */}
      <div className="w-full md:w-[60%] lg:w-[40%] bg-[#fff2] rounded-xl shadow-lg shadow-black p-5 md:p-10">
        <SmallHeading>My Projects</SmallHeading>
        <div className="flex flex-col items-center justify-center gap-5
         " >
          {myProjects.map((project:CrowdfundingProjectType)=>{
            console.log(project);
            return(
              <div className="w-full bg-[#00000032] rounded-xl shadow-lg shadow-black p-5 md:p-10">
      <p>Project ID: {project.projectId}</p>
      <p>Project Wallet: {project.projectWallet}</p>
      <p>Goal Amount: {project.goalAmount}</p>
      <p>Merchant Depost: {project.merchantDeposit}</p>
      <p>Amount Raised: {project.amountRaised}</p>
      <p>Deadline: {project.deadline}</p>
      <p>Profit Sharing Ratio: {project.profitSharingRatio ? project.profitSharingRatio : 'Not yet decided'}</p>
      <p>Investment Round Active: {project.investmentRoundIsActive == true ? 'Yes' : 'No'}</p>
      <p>Profit Distribution Done: {project.profitDistributionIsDone == true ? 'Yes' : 'No'}</p>
        <div className="mt-5" onClick={()=>handleDelete(project.projectId)}>
          <Toaster/>
          <SlidingBgButton title='Delete' color="000"/>
        </div>
        <div className="mt-5" onClick={()=> fetchInvestments(project.projectId)}>
              <SlidingBgButton title="Get Investments Data"/>
        </div>
        {investments? <div>
          {investments.map((investment:InvestmentType)=>{
            return(
              <div>
                {investment.projectId == project.projectId ? <div className="my-5 bg-[#fff2] rounded-xl shadow-lg shadow-black p-5 md:p-10 text-sm">
                <p>Investment ID: {investment.investmentId}</p>
                <p>Project ID: {investment.projectId}</p>
                <p>Invested Amount: {investment.amount} ETH</p>
                <p>Refund Status: {investment.refundStatuse == true ? 'Refunded': 'Not Refunded'}</p>
              </div> : <p className="text-center mt-2">No Investments</p>}

              </div>
            )
          })}
        </div> : ""}
    </div>
            )
          })}
        </div>
        </div>
    </div>
  );
};

export default Merchant;
