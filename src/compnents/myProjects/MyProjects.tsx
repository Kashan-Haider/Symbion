import React, { useEffect, useState } from "react";
import SmallHeading from "../../ui/SmallHeading";
import { Contract, ethers } from "ethers";
import { contract_abi, contract_address } from "../../lib/abi";
import { useStore } from "../../zustand/store";
import MyProjectBox from "./components/MyProjectBox";
import SlidingBgButton from "../../ui/SlidingBgButton";

const MyProjects = () => {
  const provider = useStore((state) => state.provider);
  const [projects, setProjects] = useState([]);
  const [address, setAddress] = useState("");
  const signer = useStore((state) => state.signer);
  const contract = new Contract(contract_address, contract_abi, signer);
  const fetchProjects = async () => {
    try {
      const projectData = await contract.getAllProjects();

      // Assuming the projectData is already an array of Project instances
      const formattedProjects = projectData[0].map((_: any, i: any) => ({
        projectId: Number(projectData[0][i]),
        projectWallet: projectData[1][i],
        goalAmount: ethers.formatEther(projectData[2][i]),
        deadline: Number(projectData[3][i]),
        amountRaised: ethers.formatEther(projectData[4][i]),
      }));
      const filteredProjects = formattedProjects.filter((project: any) => {
        return project.projectWallet == address;
      });
      setProjects(filteredProjects);
      console.log("My projects are", projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    if (signer) {
        const getAddress = async () => {
          const address = await signer.getAddress();
          setAddress(address);
        };
        getAddress()
      }
      if (provider) {
        fetchProjects();
      }
  }, [provider]);
  return (
    <div id="my-projects">
      <SmallHeading>My Projects</SmallHeading>
      <div onClick={fetchProjects} className="text-center my-5">
        <SlidingBgButton>Refresh Projects</SlidingBgButton>
      </div>
      {projects.length > 0 ?  <div className="flex flex-wrap items-center justify-center">
        
        {projects.map((project, index) => (
          <MyProjectBox key={index} project={project} />
        ))}
    </div>
       : (
        provider?<p className="text-white">No projects found.</p>:<p className="text-white">Connect Your Wallet To Fetch Projects.</p>
      )
    }
    </div>
  );
};

export default MyProjects;
