"use client"
import React, { useEffect, useState } from 'react'
import "../globalCss/category.css"
import Link from 'next/link'

interface myBrands{
  _id: number,
  brandname: string,
  brandlogo: string,
}

const Category = () => {
  // const [page,setPage] = useState(0)
  const [brands, setBrands] = useState<myBrands[]>([])

  const getAllBrands = async() =>{
    const getBrand = await fetch("http://localhost:4000/admin/get-all-brands",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      } 
    })
    const brands = await getBrand.json()
    if(brands.success){
      setBrands(brands.getBrands)
    }else{
      console.log(brands.error)
    }
}

console.log(brands)
  // const handleChange = () =>{
  //   setPage(page + 1)
  // }

  // const testFunction = () =>{
  //   console.log("My page is" + page)
  // }

  useEffect(()=>{
    getAllBrands()
    // testFunction()
  },[])
  return (
    <div>
      <div className='flex flex-wrap'>
        {brands.map((brand, index) => (
          <div className='image-container' key={index}>
            <Link href={`/brand/${brand._id}`}>
            <img className='image' src={brand.brandlogo} alt="" />
            </Link>
          </div>
        ))}
      </div>
      {/* <button onClick={handleChange}>Click</button> */}
    </div>
  )
}

export default Category
