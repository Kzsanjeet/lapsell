import Link from 'next/link'
import React from 'react'
import { GrCart } from "react-icons/gr";
import { IoSearchSharp } from "react-icons/io5";
import {Rubik_Wet_Paint} from "next/font/google"

const rubik = Rubik_Wet_Paint({
  weight:"400",
  subsets: ['latin'],
  display:"swap"
})

const Nabbar = () => {
  return (
    <div className='fixed top-0 left-0  z-20 w-full'>
        <header className="text-primary body-font py-4 bg-gray-200 font-serif relative">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <span className={`ml-3 text-3xl font-semibold font- text-primary ${rubik.className} cursor-pointer`}>LapSell</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex font-semibold flex-wrap items-center text-base justify-center">
                <Link href={"/"} className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Home</Link>
                <Link href={"/products"} className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Products</Link>
                <Link href={"/about-us"} className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">About</Link>
                </nav>
                <div className='flex flex-row space-x-5'>
                    <span className='text-2xl text-primary hover:text-accent'><IoSearchSharp/></span>
                    <span className='text-2xl text-primary hover:text-accent'><GrCart/></span>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Nabbar
