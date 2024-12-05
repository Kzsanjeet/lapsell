"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { GrCart } from "react-icons/gr";

import {Rubik_Wet_Paint} from "next/font/google"
import Search from './Search';
import { IoSearchSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const rubik = Rubik_Wet_Paint({
  weight:"400",
  subsets: ['latin'],
  display:"swap"
})



const Nabbar = () => {
  const [search,setSearch] = useState("")
  const router = useRouter()

  const handleSearchBar = () =>{
    router.push(`/search?q=${search}`)
  }
  return (
    <div className='fixed top-0 left-0  z-20 w-full'>
        <header className="text-white body-font bg-nabbar font-serif relative">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <span className={`ml-3 text-3xl font-semibold font- text-white ${rubik.className} cursor-pointer`}>LapSell</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex font-semibold flex-wrap items-center text-base justify-center">
                <Link href={"/"} className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-orange-200">Home</Link>
                <Link href={"/products"} className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-orange-200">Products</Link>
                <Link href={"/about-us"} className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-orange-200">About</Link>
                </nav>
                <div className='flex flex-row space-x-5'>
                  <div className='flex items-center space-x-3'>
                    {/* <Search/> */}
                    <div className='relative'>
                      <input type="text" placeholder="Search..." className="w-64 h-9 rounded-md p-2 text-black"
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                      />
                      <button className='font-semibold text-black text-2xl absolute top-1 right-2' onClick={handleSearchBar}><IoSearchSharp/></button>
                    </div>
                    <div>
                      <span className='text-2xl text-white hover:text-orange-300'><GrCart/></span>
                    </div>
                    <div className='flex flex-row gap-6 pl-4'>
                      <h2 className='cursor-pointer text-xl'>Login</h2>
                      <h2 className='cursor-pointer text-xl'>Sign Up</h2>
                    </div>
                  </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Nabbar
