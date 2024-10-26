import React from 'react'
import Nabbar from './pcomponents/Nabbar'
import Footer from './pcomponents/Footer'
import Carousel from './pcomponents/Carousel'
import Categories from './pcomponents/Categories'


// FF6600 - orange

const page = () => {
  return (
    <div className='bg-secondary'>
      <Nabbar/>
      <Carousel/>
      <Categories/>
      <Footer/>
    </div>
  )
}

export default page
