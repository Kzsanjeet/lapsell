import React from 'react'
import Nabbar from './pcomponents/Nabbar'
import Footer from './pcomponents/Footer'
import Carousel from './pcomponents/Carousel'

// FF6600 - orange

const page = () => {
  return (
    <div className='bg-secondary'>
      <Nabbar/>
      <Carousel/>
      <Footer/>
    </div>
  )
}

export default page
