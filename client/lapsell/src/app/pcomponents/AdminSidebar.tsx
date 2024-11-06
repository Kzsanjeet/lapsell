"use client"
import React from 'react';
import { IoHome } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import Link from 'next/link';




const AdminSidebar = () => {
  return (
    <>
    <div className="min-h-screen w-1/6 bg-secondary text-primary flex flex-col shadow-lg">
      {/* Brand Name */}
      <div className="px-6 py-4 text-2xl font-semibold border-b border-primary">
        LapSell
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col mt-4 space-y-2">
        {/* Home */}
        <Link href={"/admin"}>
        <div className="flex items-center px-6 py-3 hover:bg-primary hover:text-secondary cursor-pointer transition-colors duration-150">
          <span className="mr-4"><IoHome /></span>
          <h2 className="font-medium">Home</h2>
        </div>
        </Link>

        {/* Brands */}
        <Link href={"/admin/brands"}>
        <div className="flex items-center px-6 py-3 hover:bg-primary hover:text-secondary cursor-pointer transition-colors duration-150">
          <span className="mr-4"><AiFillProduct /></span>
          <h2 className="font-medium">Brands</h2>
        </div>
        </Link> 

        {/* Products */}
        <Link href={"/admin/products"}>
        <div className="flex items-center px-6 py-3 hover:bg-primary hover:text-secondary cursor-pointer transition-colors duration-150">
          <span className="mr-4"><AiFillProduct /></span>
          <h2 className="font-medium">Products</h2>
        </div>
        </Link> 
    
        {/* Inbox */}
        <div className="flex items-center px-6 py-3 hover:bg-primary hover:text-secondary cursor-pointer transition-colors duration-150">
          <span className="mr-4"><IoMdMail /></span>
          <h2 className="font-medium">Inbox</h2>
        </div>

        {/* Settings */}
        <div className="flex items-center px-6 py-3 hover:bg-primary hover:text-secondary cursor-pointer transition-colors duration-150">
          <span className="mr-4"><IoSettingsSharp /></span>
          <h2 className="font-medium">Settings</h2>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminSidebar;
