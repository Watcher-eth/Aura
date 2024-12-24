"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import GlowingSearch from "../components/search/GlowingSearchBar";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[84vh]  bg-white">
      
      <div className="relative  bg-white -mt-12">
  
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute w-[500px] h-[500px] rounded-full border border-gray-300 opacity-50"></div>
      <div className="absolute w-[700px] h-[700px] rounded-full border border-gray-300 opacity-40"></div>
      <div className="absolute w-[900px] h-[900px] rounded-full border border-gray-300 opacity-30"></div>
    </div>
  
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white pointer-events-none"></div>
  
    <div className="relative flex-col z-10 flex items-center justify-center h-full">
    <div className="text-[7rem] font-semibold mb-2 text-[#171717]">Aura</div>
    
    <GlowingSearch />    </div>
  </div>
     
    </div>
  );
};

export default Home;
