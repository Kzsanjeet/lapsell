import React from 'react'
import Nabbar from './pcomponents/Nabbar'
import Footer from './pcomponents/Footer'
import Carousel from './pcomponents/Carousel'
import Categories from './pcomponents/Categories'
import Card from './pcomponents/Card'


// FF6600 - orange

const page = () => {
  return (
    <div className='bg-secondary'>
      <Nabbar/>
      <Carousel/>
      <Categories/>
      <Card/>
      <Footer/>
    </div>
  )
}

export default page
