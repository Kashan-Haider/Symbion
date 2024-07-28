import Image from "next/image";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Projects from "./components/projects/Projects";

export default function Home() {
  return (
    <div className="overflow-hidden" >
      <Navbar/>
      <Hero />
      <Projects />
    </div>
  );
}
