"use client";
import React, { useState, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { useStore } from "../..//zustand/store";
import SmallHeading from "../../ui/SmallHeading";
import SlidingBgButton from "../../ui/SlidingBgButton";
import ProjectBox from "./components/ProjectBox";
import { contract_abi, contract_address } from "../../lib/abi";

const FetchProjects = () => {
  const provider = useStore((state) => state.provider);
  const signer = useStore((state) => state.signer);
  const contract = new Contract(contract_address, contract_abi, signer)
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {

      const projectData = await contract.getAllProjects();
      console.log("Project data:", projectData);

      // Assuming the projectData is already an array of Project instances
      const formattedProjects = projectData[0].map((_:any, i:any) => ({
        projectId: Number(projectData[0][i]),
        projectWallet: projectData[1][i],
        goalAmount: ethers.formatEther(projectData[2][i]),
        deadline: Number(projectData[3][i]),
        amountRaised: ethers.formatEther(projectData[4][i])
      }));
      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    if(provider){
      fetchProjects();
    }
  }, [provider]); // Ensure this effect runs only once on mount

  return (
    <div id="projects" className="p-6">
      <SmallHeading>All Projects</SmallHeading>
      <div onClick={fetchProjects} className="text-center my-5">
        <SlidingBgButton>Refresh Projects</SlidingBgButton>
      </div>
      {projects.length > 0 ?  <div className="flex flex-wrap items-center justify-center">
        
          {projects.map((project, index) => (
            <ProjectBox key={index} project={project} />
          ))}
      </div>
         : (
          provider?<p className="text-white">No projects found.</p>:<p className="text-white">Connect Your Wallet To Fetch Projects.</p>
        )
      }
    </div>
  );
};

export default FetchProjects;
