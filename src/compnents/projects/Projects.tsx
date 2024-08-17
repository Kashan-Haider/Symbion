"use client";
import React, { useEffect, useState } from "react";
import Heading from "../../ui/Heading";
import SlidingBgButton from "../../ui/SlidingBgButton";
import { BigNumberish, ethers } from "ethers";
import {
  crowdFunding_abi,
  crowdFunding_address,
  donationManager_abi,
  donationManager_address,
} from "../../lib/abi";
import CrowdfundingProjectBox from "./components/CrowdfundingProjectBox";

const Projects = () => {
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
  const [selected, setSelected] = useState("crowdfunding");
  const [fundraisingProjects, setfundraisingProjects] = useState([])
  const [crowdFundingProjects, setcrowdFundingProjects] = useState<CrowdfundingProjectType[]>([])

  const [crowdFundingContract, setcrowdFundingContract] = useState<any>();
  const [donationManagerContract, setdonationManagerContract] = useState<any>();
  const [address, setAddress] = useState("");
  useEffect(() => {
    const handleConnect = async () => {
      const windowObj = window as any;
      const provider = new ethers.BrowserProvider(windowObj.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const crowdFundingContract = new ethers.Contract(
        crowdFunding_address,
        crowdFunding_abi,
        signer
      );
      const donationManagerContract = new ethers.Contract(
        donationManager_address,
        donationManager_abi,
        signer
      );
      setcrowdFundingContract(crowdFundingContract);
      setdonationManagerContract(donationManagerContract);

      let [cfProjectIds, cfProjectWallets] = await crowdFundingContract.getAllProjects()
      let [cfgoalAmounts, cfdeadlines, cfamountsRaised, cfprofitSharingRatios, cfmerchantDeposits, cfinvestmentRoundsActive, cfprofitDistributionsDone] = await crowdFundingContract.getAllInvestmentRoundDetails()

      cfProjectIds = cfProjectIds.map((projectId:BigNumberish)=>{
        return Number(projectId)
      })
      cfProjectWallets = cfProjectWallets.map((projectWallet:string)=>{
        return projectWallet.toString()
      })
      cfgoalAmounts = cfgoalAmounts.map((goalamount:BigNumberish)=>{
        return Number(goalamount)
      })
      cfdeadlines = cfdeadlines.map((deadline:BigNumberish)=>{
        return Number(deadline)
      })
      cfamountsRaised = cfamountsRaised.map((amountraised:BigNumberish)=>{
        return Number(amountraised)
      })
      cfprofitSharingRatios = cfprofitSharingRatios.map((profitsharingratio:BigNumberish)=>{
        return Number(profitsharingratio)
      })
      cfmerchantDeposits = cfmerchantDeposits.map((merchantdeposit:BigNumberish)=>{
        return Number(merchantdeposit)
      })
      cfinvestmentRoundsActive = cfinvestmentRoundsActive.map((investmentRoundsActive:boolean)=>{
        return investmentRoundsActive
      })
      cfprofitDistributionsDone = cfprofitDistributionsDone.map((profitdistributiondone:boolean)=>{
        return profitdistributiondone
      })
      const formatedCfProjects = cfProjectIds.map((_:any, i:number)=>{
        return{
          projectId: cfProjectIds[i],
          ProjectWallet: cfProjectWallets[i],
          goalAmount: cfgoalAmounts[i],
          deadline: cfdeadlines[i],
          amountRaised: cfamountsRaised[i],
          profitSharingRation: cfprofitSharingRatios[i],
          merchantDeposit: cfmerchantDeposits[i],
          investmentRoundIsActive: cfinvestmentRoundsActive[i],
          profitDistributionIsDone: cfprofitDistributionsDone[i],
        }
      })
      setcrowdFundingProjects(formatedCfProjects)
      setAddress(address);
    };
    handleConnect();
  }, []);
  return (
    <div className="p5\ md:p-10">
      <Heading>All Projects</Heading>
      <div className="flex justify-around items-center gap-5 flex-wrap my-8">
        <div onClick={() => setSelected("fundraising")}>
          <SlidingBgButton title="Fundraising" selected={selected} />
        </div>
        <div onClick={() => setSelected("crowdfunding")}>
          <SlidingBgButton title="CrowdFunding" selected={selected} />
        </div>
      </div>
        {/* All Projects */}
          {selected == 'crowdfunding' ?
        <div className="">
          {crowdFundingProjects.length>1? 
          <div className="flex flex-wrap gap-5 items-center justify-center">
            {crowdFundingProjects.map((project:CrowdfundingProjectType)=>{
              return(
                <CrowdfundingProjectBox props= {project}/>
              )
            })}
            </div>
            :
            <p>No Projects Created Yet</p>  
        }
        </div>  
        :
        <div className="flex flex-wrap gap-5 items-center justify-center">

        </div>
        }
    </div>
  );
};

export default Projects;
