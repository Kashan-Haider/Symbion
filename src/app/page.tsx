import Image from "next/image";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Projects from "./components/projects/Projects";
import CreateProject from "./components/createProject/CreateProject";

export default function Home() {
  return (
    <div className="overflow-hidden" >
      <Navbar/>
      <Hero />
      <CreateProject/>
      <Projects />
    </div>
  );
}
