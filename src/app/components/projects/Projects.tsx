"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useStore } from "@/zustand/store";
import SmallHeading from "../ui/SmallHeading";
import SlidingBgButton from "../ui/SlidingBgButton";
import { ContractManager, Project } from "@/lib/contract_interaction";

const FetchProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const contractManager = await ContractManager.getInstance();
        console.log("ContractManager:", contractManager);

        const projectData = await contractManager.getAllProjects();
        console.log("Project data:", projectData);

        // Assuming the projectData is already an array of Project instances
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };


    fetchProjects();
  }, []); // Ensure this effect runs only once on mount

  return (
    <div id="fetch-projects" className="p-6">
      <SmallHeading>All Projects</SmallHeading>
      <div className="flex flex-wrap gap-6 mt-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.projectId}
              className="bg-gray-800 p-4 rounded-lg shadow-lg text-white w-full md:w-1/3 lg:w-1/4"
            >
              <p className="mb-2">
                <span className="font-semibold">Project ID:</span>{" "}
                {project.projectId}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Project Wallet:</span>{" "}
                {project.projectWallet}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Goal Amount:</span>{" "}
                {project.goalAmount} ETH
              </p>
              <p className="mb-2">
                <span className="font-semibold">Deadline:</span>{" "}
                {project.deadline} days
              </p>
              <p className="mb-2">
                <span className="font-semibold">Amount Raised:</span>{" "}
                {project.amountRaised} ETH
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default FetchProjects;
