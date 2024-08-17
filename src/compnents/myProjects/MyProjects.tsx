import React, { useEffect, useState } from "react";
import SmallHeading from "../../ui/SmallHeading";
import { Contract, ethers } from "ethers";
import { contract_abi, contract_address } from "../../lib/abi";
import { useStore } from "../../zustand/store";
import FundraisingMyProjectBox from "./components/FundraisingMyProjectBox";
import CrowdfundingMyProjectBox from "./components/CrowdfundingMyProjectBox";
import SlidingBgButton from "../../ui/SlidingBgButton";

const MyProjects = () => {
  const provider = useStore((state) => state.provider);
  const [projectsFundraising, setProjectsFundraising] = useState([]);
  const [projectsCrowdfunding, setProjectsCrowdfunding] = useState([]);
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("fundraising");
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
        fundType: Number(projectData[5][i]),
      }));

      const filteredProjectsFundraising = formattedProjects.filter(
        (project: any) => {
          return project.projectWallet == address && project.fundType == 1;
        }
      );
      setProjectsFundraising(filteredProjectsFundraising);

      const filteredProjectsCrowdfunding = formattedProjects.filter(
        (project: any) => {
          return project.projectWallet == address && project.fundType == 0;
        }
      );
      setProjectsCrowdfunding(filteredProjectsCrowdfunding);

      console.log("My Fundraising projects are", projectsFundraising);
      console.log("My Crowdfunding projects are", projectsCrowdfunding);
    } catch (error) {
      console.error("Error fetching Crowdfunding projects:", error);
    }
  };
  useEffect(() => {
    if (signer) {
      const getAddress = async () => {
        const address = await signer.getAddress();
        setAddress(address);
      };
      getAddress();
    }
    if (provider) {
      fetchProjects();
    }
  }, [provider]);
  return (
    <div id="my-projects">
      <SmallHeading>My Projects</SmallHeading>
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
            <div className="flex flex-wrap items-center justify-center">
              {projectsFundraising.map((project, index) => (
                <FundraisingMyProjectBox key={index} project={project} />
              ))}
            </div>
          ) : provider ? (
            <p className="text-white">No projects found.</p>
          ) : (
            <p className="text-white">Connect Your Wallet To Fetch Projects.</p>
          )}
          <div onClick={fetchProjects} className="text-center my-5">
            <SlidingBgButton title="Refresh Projects" />
          </div>
        </div>
      ) : (
        <div>
          
          {projectsCrowdfunding.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center">
              {projectsCrowdfunding.map((project, index) => (
                <CrowdfundingMyProjectBox key={index} project={project} />
              ))}
            </div>
          ) : provider ? (
            <p className="text-white">No projects found.</p>
          ) : (
            <p className="text-white">Connect Your Wallet To Fetch Projects.</p>
          )}
          <div onClick={fetchProjects} className="text-center my-5"> <SlidingBgButton title="Refresh Projects" /></div>
         
        </div>
      )}
    </div>
  );
};

export default MyProjects;
