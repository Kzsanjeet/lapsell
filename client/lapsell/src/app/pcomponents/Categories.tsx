import React from 'react'
import Category from './Category'

const Categories = () => {
  return (
    <div className='text-primary flex flex-col justify-center items-center mt-10'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-4xl'>Shop by Categories</h1>
            <p className='text-gray-500 p-2 pb-10'>Choose from wide range of categories</p>      
        </div>
        <div className='flex flex-col max-[3]:'>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
        </div>
    </div>
  )
}

export default Categories
