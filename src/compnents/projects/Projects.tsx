"use client";
import React, { useState, useEffect } from "react";
import { Contract, ethers } from "ethers";
import { useStore } from "../..//zustand/store";
import SmallHeading from "../../ui/SmallHeading";
import SlidingBgButton from "../../ui/SlidingBgButton";
import FundraisingProjectBox from "./components/FundraisingProjectBox";
import CrowdfundingProjectBox from "./components/CrowdfundingProjectBox";
import { contract_abi, contract_address } from "../../lib/abi";

const FetchProjects = () => {
  const provider = useStore((state) => state.provider);
  const signer = useStore((state) => state.signer);
  const contract = new Contract(contract_address, contract_abi, signer);
  const [projectsFundraising, setProjectsFundraising] = useState([]);
  const [projectsCrowdfunding, setProjectsCrowdfunding] = useState([]);
  const [selected, setSelected] = useState("fundraising");
  const fetchProjects = async () => {
    try {
      const projectData = await contract.getAllProjects();
      console.log("Project data:", projectData);

      // Assuming the projectData is already an array of Project instances
      const formattedProjects = projectData[0].map((_: any, i: any) => ({
        projectId: Number(projectData[0][i]),
        projectWallet: projectData[1][i],
        goalAmount: ethers.formatEther(projectData[2][i]),
        deadline: Number(projectData[3][i]),
        amountRaised: ethers.formatEther(projectData[4][i]),
        fundType: projectData[5][i],
      }));

      const filteredProjectsFundraising = formattedProjects.filter(
        (project: any) => {
          return project.fundType == 1;
        }
      );
      setProjectsFundraising(filteredProjectsFundraising);

      const filteredProjectsCrowdfunding = formattedProjects.filter(
        (project: any) => {
          return project.fundType == 0;
        }
      );
      setProjectsCrowdfunding(filteredProjectsCrowdfunding);

      console.log("My Fundraising projects are", projectsFundraising);
      console.log("My Crowdfunding projects are", projectsCrowdfunding);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    if (provider) {
      fetchProjects();
    }
  }, [provider]); // Ensure this effect runs only once on mount

  return (
    <div id="projects" className="p-6">
      <SmallHeading>All Projects</SmallHeading>
      <div className="flex justify-around my-5 md:my-8">
        <div onClick={() => setSelected("fundraising")}>
          <SlidingBgButton title="Fundraising" selected={selected} />
        </div>
        <div onClick={() => setSelected("crowdfunding")}>
          <SlidingBgButton title="CrowdFunding" selected={selected} />
        </div>
      </div>
      {selected == "fundraising" ? (
        <div>
          {projectsFundraising.length > 0 ? (
            <div>
              <div className="flex flex-wrap items-center justify-center">
              {projectsFundraising.map((project, index) => (
                <FundraisingProjectBox key={index} project={project} />
              ))}
            </div>
            <div onClick={fetchProjects} className="text-center my-5">
            <SlidingBgButton title="Refresh Projects" />
          </div>
            </div>
          ) : provider ? (
            <p className="text-white">No projects found.</p>
          ) : (
            <p className="text-white">Connect Your Wallet To Fetch Projects.</p>
          )}
        </div>
      ) : (
        <div>
          {projectsCrowdfunding.length > 0 ? (
            <div>
              <div className="flex flex-wrap items-center justify-center">
              {projectsCrowdfunding.map((project, index) => (
                <CrowdfundingProjectBox key={index} project={project} />
              ))}
              
            </div>
            <div onClick={fetchProjects} className="text-center my-5">
            <SlidingBgButton title="Refresh Projects" />
          </div>
            </div>
          ) : provider ? (
            <p className="text-white">No projects found.</p>
          ) : (
            <p className="text-white">Connect Your Wallet To Fetch Projects.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchProjects;
