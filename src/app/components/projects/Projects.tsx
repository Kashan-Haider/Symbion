"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useStore } from "@/zustand/store";
import SmallHeading from "../ui/SmallHeading";
import SlidingBgButton from "../ui/SlidingBgButton";
import { ContractManager, Project } from "@/lib/contract_interaction";
import ProjectBox from "./components/ProjectBox";

const FetchProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

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
  useEffect(() => {
    fetchProjects();
  }, []); // Ensure this effect runs only once on mount

  return (
    <div id="fetch-projects" className="p-6">
      <SmallHeading>All Projects</SmallHeading>
      <div onClick={fetchProjects}>
      <SlidingBgButton>Fetch Projects</SlidingBgButton>
      </div>
      <div className="flex flex-wrap gap-6 mt-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectBox project = {project} />
          ))
        ) : (
          <p className="text-white">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default FetchProjects;
