"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import GlowingSearch from "../components/search/GlowingSearchBar";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <GlowingSearch />
    </div>
  );
};

export default Home;
