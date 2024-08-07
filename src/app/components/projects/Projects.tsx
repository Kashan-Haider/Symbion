'use client'
import React, {useState, useEffect} from 'react'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import { useStore } from '@/zustand/store'
import { ethers, Provider } from 'ethers'
import { Signer } from 'ethers'
import SmallHeading from '../ui/SmallHeading'
import SlidingBgButton from '../ui/SlidingBgButton'
import { Contract } from 'ethers'
import abi from '@/lib/abi'

const CreateProject = () => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const [isSelected, SetIsSelected]= useState("crowdFunding")
  const [connectedAccAddress, setConnectedAccAddress] = useState('')
  const [projectWallet, setProjectWallet] = useState(connectedAccAddress)
  const [goalAmount, setGoalAmount] = useState('')
  const [deadline, setDeadline] = useState('')
  let provider:Provider = useStore((state)=> state.provider)
  let signer:Signer = useStore((state)=> state.signer)
  useEffect(()=>{
    const getAddress = async()=>{
      const address = await signer.getAddress()
      setConnectedAccAddress(address)
      console.log(signer)
    }
    getAddress()
  }, [provider])

  const handleSubmit=()=>{
    const contract = new Contract(contractAddress, abi, signer)
    if(projectWallet && goalAmount && deadline){
    const res = contract.addProject(projectWallet, goalAmount, deadline)
    console.log("Successful with the inputs: ", projectWallet, goalAmount, deadline)
    setProjectWallet('')
    setGoalAmount('')
    setDeadline('')
  }
    else{
      console.log("Enter valid input", projectWallet, goalAmount, deadline)
    }
  }
  return (
    <div id='create-project' >
        <Heading>
            Create A Project
        </Heading>
        <p className='capitalize font-light text-sm tracking-[10px] text-white text-center' >Right Away</p>

        {/* Buttons */}
        <div  className='flex justify-around my-5'>
          <div onClick={()=> SetIsSelected("fundraising")} >
          <Button title='fundraising' isSelected= {isSelected}>Fundraising Project</Button>
          </div>
          <div onClick={()=> SetIsSelected("crowdFunding")} >
          <Button title='crowdFunding' isSelected= {isSelected}>CrowdFunding Project</Button>
          </div>
        </div>

       {/* Project details submisson form */}
      {isSelected == "crowdFunding" && <div className='flex items-center justify-center' >
      <div className='flex flex-col justify-center items-center gap-5 my-10 bg-[#ffffff18] w-fit rounded-2xl p-10 shadow-lg shadow-black' >
        <SmallHeading>CrowndFunding</SmallHeading>
        <label htmlFor="" className='text-white text-xs font-light text-left' >Project Owner</label>
        <input onChange={(e)=>{
          setProjectWallet(e.target.value)
        }} value={projectWallet} className='text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white' type="text" placeholder='Project Wallet'  />
        <label htmlFor="" className='text-white text-xs font-light text-left' >Goal Amount</label>
        <input onChange={(e)=>{
          setGoalAmount(e.target.value)
        }} value={goalAmount} className='text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white'  type="number" placeholder='Goal Ammount' />
        <label htmlFor="" className='text-white text-xs font-light text-left' >Deadline</label>
        <input onChange={(e)=>{
          setDeadline(e.target.value)
        }} value={deadline} className='text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white'  type="number" placeholder='Deadline(In Days)' name="" id="" />
       <div onClick={handleSubmit}>
      <SlidingBgButton>Submit</SlidingBgButton>
      </div>
      </div>
      </div>}

      {isSelected == "fundraising" && <div className='flex items-center justify-center' >
      <div className='flex flex-col justify-center items-center gap-5 my-10 bg-[#ffffff18] w-fit rounded-2xl p-10 shadow-lg shadow-black' >
        <SmallHeading>FundRaising</SmallHeading>
        <label htmlFor="" className='text-white text-xs font-light text-left' >Project Owner</label>
        <input onChange={(e)=>{
          setProjectWallet(e.target.value)
        }} value={projectWallet}  className='text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white' type="text" placeholder='Project Wallet'  />
        <label htmlFor="" className='text-white text-xs font-light text-left' >Goal Amount</label>
        <input onChange={(e)=>{
          setGoalAmount(e.target.value)
        }} value={goalAmount} className='text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white'  type="number" placeholder='Goal Ammount' />
        <label htmlFor="" className='text-white text-xs font-light text-left' >Deadline</label>
        <input onChange={(e)=>{
          setDeadline(e.target.value)
        }} value={deadline} className='text-white placeholder:text-white w-[280px] md:w-[400px] lg:w-[500px] bg-transparent px-4 py-1 outline-none border-b-2 border-white'  type="number" placeholder='Deadline(In Days)' name="" id="" />
      <div onClick={handleSubmit}>
      <SlidingBgButton>Submit</SlidingBgButton>
      </div>
      </div>
      </div>}
    </div>
  )
}

export default CreateProject
