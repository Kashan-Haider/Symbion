import Image from "next/image";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import CreateProject from "./components/createProject/CreateProject";
import FetchProjects from "./components/projects/Projects";

export default function Home() {
  return (
    <div className="overflow-hidden" >
      <Navbar/>
      <Hero />
      <CreateProject/>
      <FetchProjects />
    </div>
  );
}
