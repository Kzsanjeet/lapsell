import React from 'react'
import Nabbar from './pcomponents/Nabbar'
import Footer from './pcomponents/Footer'
import Carousel from './pcomponents/Carousel'
import Categories from './pcomponents/Categories'
import Card from './pcomponents/Card'
import Review from './pcomponents/Review'


// FF6600 - orange

const page = () => {
  return (
    <div className='bg-secondary w-full'>
      <Nabbar/>
      <Carousel/>
      <Categories/>
      <Card/>
      <Review/>
      <Footer/>
    </div>
  )
}

export default page
