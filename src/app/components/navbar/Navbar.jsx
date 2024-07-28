"use client";
import React, { useEffect, useState } from "react";
import NavLink from "./compnents/NavLink";
import { motion } from "framer-motion";
import Image from "next/image";
import { ethers } from "ethers";
import { useStore } from '@/zustand/store';

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState("upward");
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const updateProvider = useStore((state)=> state.updateProvider )
  const provider1 = useStore((state)=> state.provider)
  const handleConnect=async()=>{
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    updateProvider(provider)
    console.log(provider1)
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setScrollDirection("downward");
      } else if (scrollTop < lastScrollTop) {
        setScrollDirection("upward");
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);
  return (
    <div className="relative z-50">
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }}>
        <div
          className={`flex justify-center items-center gap-5 md:gap-8  bg-[#00000057] hover:bg-[#00000093] transition-all duration-700 py-3 px-8 rounded-lg w-fit fixed ${
            scrollDirection === "upward"
              ? "translate-y-0"
              : "-translate-y-[100px]"
          } left-[50%] -translate-x-[50%] top-5 shadow-black shadow-lg capitalize text-sm font-light backdrop-blur-lg`}
        >
          <NavLink path="home" title="Home" />
          <NavLink path="projects" title="Projects" />
          <NavLink path="contact" title="Contact" />
        </div>
      </motion.div>
      <button className='fixed top-5 right-5 md:right-10 text-white flex items-center justify-center gap-3 bg-[#00000057] hover:bg-[#000000cb] transition-all duration-700 px-8 py-3 rounded-xl text-sm' onClick={handleConnect}>
      <Image className='h-[20px] w-[20px]' src={'/images/metamask-icon.png'} height={50} width={50} alt='metamask-image' />
          {provider1 ? "Metamask Connected" :"Connect Metamask"}
        </button>
    </div>
  );
};

export default Navbar;
