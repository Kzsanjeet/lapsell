import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Brands</h1>
      <p>Add your products brands.</p>
      <div>
        <form action="">
            <label htmlFor="">Enter your brand name: </label>
            <Input type='text'/>
        </form>
      </div>
    </div>
  )
}

export default page
