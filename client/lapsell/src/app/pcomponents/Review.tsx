"use client"
import React from 'react'
import { IoStar } from "react-icons/io5";
import "../globalCss/category.css"

const Review = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-secondary'>
        <div className='flex flex-col justify-center mt-20 items-center'>
                <p className='text-gray-600'>500+ people recommend us at Instagram</p>
                <h1 className='text-black text-5xl font-bold'>Have a look at what our customers say</h1>
        </div>
        <section className="text-black body-font h-full">
            <div className="container px-5 pt-14 pb-20 mx-auto">
                <div className="flex flex-wrap">
                <div className="p-4 lg:w-1/3">
                <div className="h-full bg-secondary shadow-lg shadow-gray-400 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative flex flex-col">
                    <h2 className="tracking-widest text-xl font-medium text-black mb-4 flex gap-1 justify-center">
                        <IoStar /><IoStar /><IoStar /><IoStar /><IoStar />
                    </h2>
                    <p className="leading-relaxed  text-gray-700 italic text-xl">
                        "I've bought 4-5 products from wraps nepal and I loved each one of them. Highly recommend"
                    </p>
                    <div className="flex flex-row justify-start items-center mt-4">
                        <div>
                            <img className="w-11 h-11 object-cover rounded-full shadow-md border border-gray-300" src="images/pic.jpg" alt="Profile" />
                        </div>
                        <div className="flex flex-col justify-start items-start ml-3">
                            <h1 className="title-font sm:text-2xl text-xl font-semibold text-primary">
                                Sanjeet Kazi Thapa
                            </h1>
                            <p className="text-gray-500">Customer</p>
                        </div>
                    </div>
                    <div className="text-center mt-4 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 border-t border-gray-200 bg-opacity-50">
                        <span className="text-gray-600 mr-3 inline-flex items-center text-sm pr-3 border-r border-gray-300">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>1.2K
                        </span>
                        <span className="text-gray-600 inline-flex items-center text-sm">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>6
                        </span>
                    </div>
                </div>

                </div>
                <div className="p-4 lg:w-1/3">
                <div className="h-full bg-secondary shadow-lg shadow-gray-400 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative flex flex-col">
                    <h2 className="tracking-widest text-xl font-medium text-black mb-4 flex gap-1 justify-center">
                        <IoStar /><IoStar /><IoStar /><IoStar /><IoStar />
                    </h2>
                    <p className="leading-relaxed  text-gray-700 italic text-xl">
                        "I've bought 4-5 products from wraps nepal and I loved each one of them. Highly recommend"
                    </p>
                    <div className="flex flex-row justify-start items-center mt-4">
                        <div>
                            <img className="w-11 h-11 object-cover rounded-full shadow-md border border-gray-300" src="images/pic.jpg" alt="Profile" />
                        </div>
                        <div className="flex flex-col justify-start items-start ml-3">
                            <h1 className="title-font sm:text-2xl text-xl font-semibold text-primary">
                                Sanjeet Kazi Thapa
                            </h1>
                            <p className="text-gray-500">Customer</p>
                        </div>
                    </div>
                    <div className="text-center mt-4 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 border-t border-gray-200 bg-opacity-50">
                        <span className="text-gray-600 mr-3 inline-flex items-center text-sm pr-3 border-r border-gray-300">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>1.2K
                        </span>
                        <span className="text-gray-600 inline-flex items-center text-sm">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>6
                        </span>
                    </div>
                </div>
                </div>
                <div className="p-4 lg:w-1/3">
                <div className="h-full bg-secondary shadow-lg shadow-gray-400 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative flex flex-col">
                    <h2 className="tracking-widest text-xl font-medium text-black mb-4 flex gap-1 justify-center">
                        <IoStar /><IoStar /><IoStar /><IoStar /><IoStar />
                    </h2>
                    <p className="leading-relaxed  text-gray-700 italic text-xl">
                        "I've bought 4-5 products from wraps nepal and I loved each one of them. Highly recommend"
                    </p>
                    <div className="flex flex-row justify-start items-center mt-4">
                        <div>
                            <img className="w-11 h-11 object-cover rounded-full shadow-md border border-gray-300" src="images/pic.jpg" alt="Profile" />
                        </div>
                        <div className="flex flex-col justify-start items-start ml-3">
                            <h1 className="title-font sm:text-2xl text-xl font-semibold text-primary">
                                Sanjeet Kazi Thapa
                            </h1>
                            <p className="text-gray-500">Customer</p>
                        </div>
                    </div>
                    <div className="text-center mt-4 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 border-t border-gray-200 bg-opacity-50">
                        <span className="text-gray-600 mr-3 inline-flex items-center text-sm pr-3 border-r border-gray-300">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>1.2K
                        </span>
                        <span className="text-gray-600 inline-flex items-center text-sm">
                            <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>6
                        </span>
                    </div>
                </div>
                </div>
                </div>
                <div className='flex justify-center pt-7'>
                        <button className='button-review bg-primary text-secondary p-2 rounded cursor-pointer'>More reviews on Instagram</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Review
