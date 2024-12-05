"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GrCart } from "react-icons/gr";
import { Rubik_Wet_Paint } from "next/font/google";
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import UserSignup from "./UserSignup";
import UserLogin from "./UserLogin";

const rubik = Rubik_Wet_Paint({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Nabbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [select, setSelect] = useState<string | null>(null); // For signup or login modal

  const handleSearchBar = () => {
    router.push(`/search?q=${search}`);
  };

  const renderModal = () => {
    if (!select) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"> 
      {/* //opacity makes the bg transparent */}
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            onClick={() => setSelect(null)}
          >
            ✖
          </button>
          {select === "signup" && <UserSignup />}
          {select === "login" && <UserLogin />}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full">
      <header className="text-white body-font bg-nabbar font-serif relative">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span
              className={`ml-3 text-3xl font-semibold font- text-white ${rubik.className} cursor-pointer`}
            >
              LapSell
            </span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex font-semibold flex-wrap items-center text-base justify-center">
            <Link
              href={"/"}
              className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-orange-200"
            >
              Home
            </Link>
            <Link
              href={"/products"}
              className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-orange-200"
            >
              Products
            </Link>
            <Link
              href={"/about-us"}
              className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-orange-200"
            >
              About
            </Link>
          </nav>
          <div className="flex flex-row space-x-5">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 h-9 rounded-md p-2 text-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="font-semibold text-black text-2xl absolute top-1 right-2"
                  onClick={handleSearchBar}
                >
                  <IoSearchSharp />
                </button>
              </div>
              <div>
                <span className="text-2xl text-white hover:text-orange-300">
                  <GrCart />
                </span>
              </div>
              <div className="flex flex-row gap-6 pl-4">
                <h2
                  className="cursor-pointer text-xl"
                  onClick={() => setSelect("login")}
                >
                  Login
                </h2>
                <h2
                  className="cursor-pointer text-xl"
                  onClick={() => setSelect("signup")}
                >
                  Sign Up
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      {renderModal()}
    </div>
  );
};

export default Nabbar;
