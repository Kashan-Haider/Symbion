import React from 'react'

interface CrowdfundingProject {
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
const CrowdfundingProjectBox = ({props}:{props:CrowdfundingProject}) => {
  return (
    < >
      {props.projectId != 0? <div className="w-full md:w-[60%] lg:w-[40%] bg-[#fff2] rounded-xl shadow-lg shadow-black p-5 md:p-10">
      <p>Project ID: {props.projectId}</p>
      <p>Project Wallet: {props.projectWallet}</p>
      <p>Goal Amount: {props.goalAmount}</p>
      <p>Merchant Depost: {props.merchantDeposit}</p>
      <p>Amount Raised: {props.amountRaised}</p>
      <p>Deadline: {props.deadline}</p>
      <p>Profit Sharing Ratio: {props.profitSharingRatio ? props.profitSharingRatio : 'Not yet decided'}</p>
      <p>Investment Round Active: {props.investmentRoundIsActive == true ? 'Yes' : 'No'}</p>
      <p>Profit Distribution Done: {props.profitDistributionIsDone == true ? 'Yes' : 'No'}</p>
    </div>: ''}
    </>
  )
}

export default CrowdfundingProjectBox