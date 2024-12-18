import React from 'react'
import Navbar from '../pcomponents/Nabbar'
import CartData from '../pcomponents/CartData'

const page = () => {
  return (
    <>
    
      <Navbar />
    <div className='mt-28'>
        <CartData/>
         </div>
         </>
  )
}

export default page
