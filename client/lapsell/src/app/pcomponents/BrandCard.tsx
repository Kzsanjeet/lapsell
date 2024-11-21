"use client"
import React, { useEffect, useState } from 'react';
import "../globalCss/boxshadow.css";
import { useParams } from 'next/navigation';
import Nabbar from './Nabbar';
import { string } from 'zod';
import Link from 'next/link';


interface Product {
    _id: string;
  name: string;
  brand: {_id:string, brandname:string};
  brandname: string;
  price: number;
  newArrival?: boolean; // Optional because it has a default value
  images: string[]; // Array of strings for image paths
  description?: string; // Optional because it's not required in the schema
  computerModel: string;
  processor: string;
  chipset: string;
  height: string;
  width: string;
  depth: string;
  weight: string;
  batteryCapacity: string;
  batteryType: string;
  displaySize: string;
  storage: string;
  isNew : boolean;
  productViews:number;
}

const BrandCard = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const {id} = useParams()

//   console.log(id)
  const getProductsByBrands = async() =>{
    try {
        const fetchProducts = await fetch("http://localhost:4000/admin/get-all-products",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                },   
        })
        const response = await fetchProducts.json();
        if(response.success){
             // Ensure the response.getProducts is of type Product[]
            const allProducts: Product[] = response.getProducts;

            // Use filter and ensure type safety
            const filterBrands = allProducts.filter((product: Product) => product?.brand?._id === String(id));

      setProduct(filterBrands);
    //   setProduct(allProducts);
        }else{
            console.log(response.message)
        }
    } catch (error) {
        console.log(error)
    }
  } 
  useEffect(() => {
    getProductsByBrands();
  }, [id]); // Run only once when the component mounts

  console.log(product, 'tse')

    // if i left the big bracket empty it renders only in the initial 
                  // if i add product here it means if product updates count effect will run again.
                  console.log(product)
  return (
    <div>
        <div className="p-6">
        <div className="text-center mt-20 mb-5">
            <h1 className="text-4xl font-bold text-primary"></h1>
            <p className="text-gray-600">Check out our most popular products</p>
        </div>
     
        <div className="flex flex-wrap w-full gap-4 justify-center">
            {product.map((prod,index) => (
                <Link key={index} href={`/product/${prod?._id}`} className="box-glow p-6 bg-secondary rounded-lg w-1/5 hover:shadow-primary transition-shadow duration-300 cursor-pointer">
            {/* <div
                
                className="box-glow p-6 bg-secondary rounded-lg w-1/5 hover:shadow-primary transition-shadow duration-300 cursor-pointer"
            > */}
                <div className="relative overflow-hidden rounded-md mb-4">
                {prod.isNew && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full z-10">
                    New
                    </span>
                )}
                <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-80 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 mix-blend-mode color-burn;"
                />
                    {/* Circular shadow effect */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black opacity-20 rounded-full blur-lg"></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                <div>
                    <h2 className="text-lg font-semibold text-primary">{prod.name}</h2>
                    <p className="text-primary">Views: {prod.productViews}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-light text-gray-500 line-through">Rs 80000</p>
                    <p className="text-lg font-bold text-black">{prod.price}</p>
                </div>
                </div>
            {/* </div> */}
            </Link>
            ))}
        </div>
      
        
        </div>
    </div>
    
  );
};

export default BrandCard;
