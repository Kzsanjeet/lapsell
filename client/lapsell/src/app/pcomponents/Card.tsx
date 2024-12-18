"use client";
import React, { useEffect, useState } from "react";
import "../globalCss/boxshadow.css";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  brand: { brandname: string };
  price: number;
  images: string[];
  newArrival: boolean;
  productViews: number;
}

const Card = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterProduct, setFilteredProduct] = useState<Product[]>([])


  const getProductHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/products/all-products"
      );
  
      if (response.data.success) {
        const productsData = response.data.data;
  
        // Set all products
        setProducts(productsData);
  
        // Filter products with views > 2
        const filtered = productsData.filter(
          (product: Product) => product.productViews > 2
        );
        setFilteredProduct(filtered);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductHandler();
  }, []);

  return (
    <div className="mt-24">
      <h1 className="text-4xl text-black font-bold flex justify-center">Popular Products</h1>
      <p className='text-gray-500 p-2 pb-10 flex justify-center'>Choose from most liked product</p> 
        <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filterProduct.map((product) => (
            <div
              key={product._id}
              className="w-[22rem] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
            >
              {/* Image Section */}
              <div className="relative">
                {product.newArrival && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full z-10">
                    New
                  </span>
                )}
                <img
                  src={product.images[0] || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
                />
                {/* Circular shadow effect */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black opacity-20 rounded-full blur-lg"></div>
              </div>

              {/* Content Section */}
              <div className="mt-4">
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Brand: {product.brand.brandname}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">
                    Views: <span className="font-semibold">{product.productViews}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Rs {product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
};

export default Card;
