import React from 'react'
import { ContractManager } from '@/lib/contract_interaction'
import { useRouter } from 'next/navigation'

const ProjectBox = ( props : {project:{projectId:string, projectWallet:string, goalAmount:string, deadline:string, amountRaised:String}}) => {
    const router = useRouter()

    const handleDelete = async (id: string) => {
        try {
            const contractManager = await ContractManager.getInstance();
            console.log("ContractManager:", contractManager);
            await contractManager.deleteProject(id)
            router.push('/')
        } catch (err) {
            console.log("Failed to delete with error, ", err)
        }
    }
    const id= props.project.projectId;
    return (
        <div>
        {id != '0' && <div
              key={props.project.projectId}
              className="bg-[#ffffff18] p-10 shadow-black rounded-lg shadow-lg text-white w-fit"
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
              <button onClick= {()=>handleDelete(props.project.projectId)} className='bg-red-600 text-white px-5 py-2 rounded-xl text-sm shadow-lg shadow-gray-800 hover:bg-red-700 transition-all duration-300'>Delete Project</button>
            </div>}

        </div>
    )
}

export default ProjectBox