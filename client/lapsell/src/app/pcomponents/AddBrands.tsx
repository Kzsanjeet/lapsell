import { Input } from '@/components/ui/input'
import React from 'react'

const AddBrands = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-primary font-bold text-2xl'>Add Brands</h1>
      <div className='w-2/4'>
        <form action="">
            <label htmlFor="">Enter your Brand name :</label>
            <Input type='text' placeholder='your brnads...' />
        </form>
      </div>
    </div>
  )
}

export default AddBrands
