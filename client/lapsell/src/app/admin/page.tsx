"use client"
import React, { useState } from 'react';
import { IoHome } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import Link from 'next/link';
import AdminNav from '../pcomponents/AdminNav';
import AddBrands from '../pcomponents/AddBrands';
import AddProducts from '../pcomponents/AddProducts';
import ProductForm from '../pcomponents/ProductForm';

const Page = () => {
  const [selectMenu, setSelectMenu] = useState<String | null>(null);

  const renderContent = () => {
    if (selectMenu === 'brands') {
      return <AddBrands />;
    } else if (selectMenu === "products") {
      // return <AddProducts />;
      return <ProductForm/> 
    } else {
      return null;
    }
  };

  return (
    <div className='w-full'>
      <div className='flex'>
        {/* Sidebar */}
        <div className="w-1/6 bg-secondary text-primary flex flex-col shadow-lg h-screen fixed top-0 left-0">
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
            <div onClick={() => setSelectMenu('brands')} className="flex items-center px-6 py-3 hover:bg-primary hover:text-secondary cursor-pointer transition-colors duration-150">
              <span className="mr-4"><AiFillProduct /></span>
              <h2 className="font-medium">Brands</h2>
            </div>

            {/* Products */}
            <div onClick={() => setSelectMenu("products")} className="flex items-center px-6 py-3 hover:bg-primary hover:text-secondary cursor-pointer transition-colors duration-150">
              <span className="mr-4"><AiFillProduct /></span>
              <h2 className="font-medium">Products</h2>
            </div>

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

        {/* Right Side Content */}
        <div className="flex-1 w-5/6 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Page;
