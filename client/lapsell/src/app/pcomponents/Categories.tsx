import React from 'react'
import Category from './Category'

const Categories = () => {
  return (
    <div className='text-black flex flex-col justify-center items-center mt-20 w-4/5 ml-48'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-4xl'>Shop by Categories</h1>
            <p className='text-gray-500 p-2 pb-10'>Choose from wide range of categories</p>      
        </div>
        <div className="flex flex-wrap justify-center items-center">
            <Category />
        </div>

    </div>
  )
}

export default Categories
