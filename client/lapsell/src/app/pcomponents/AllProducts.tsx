"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SingleProductCard from "./SingleProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  newArrival: boolean;
  productViews: number;
}

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const getProductHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/products/all-products");
      if (response.data.success) {
        setProducts(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProductHandler();
  }, []);

  return (
    <div className="flex relative">
      {/* Filter Container (Fixed) */}
      <div className="bg-gray-100 w-1/6 py-24 px-6 shadow-md fixed top-26 left-0 h-full z-6">
        <h2 className="text-lg font-semibold text-gray-800 pt-16 mb-4">Filters</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Category</h3>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            onChange={(e) => console.log(e.target.value)} // Replace with your filter logic
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            className="w-full"
            onChange={(e) => console.log(e.target.value)} // Replace with your filter logic
          />
          <div className="text-sm text-gray-600 mt-1 flex justify-between">
            <span>Rs 0</span>
            <span>Rs 5000+</span>
          </div>
        </div>

        {/* Sorting Options */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Sort By</h3>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            onChange={(e) => console.log(e.target.value)} // Replace with your filter logic
          >
            <option value="popularity">Popularity</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Availability</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="inStock"
              onChange={(e) => console.log(e.target.checked)} // Replace with your filter logic
            />
            <label htmlFor="inStock" className="text-sm text-gray-600">
              In Stock
            </label>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="onSale"
              onChange={(e) => console.log(e.target.checked)} // Replace with your filter logic
            />
            <label htmlFor="onSale" className="text-sm text-gray-600">
              On Sale
            </label>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
          onClick={() => console.log("Apply Filters")} // Replace with your filter logic
        >
          Apply Filters
        </button>
      </div>

      {/* Products Container */}
      <div className="bg-gray-100 w-5/6 ml-auto pl-6 pt-32 pr-6">
        <h1 className="flex text-2xl font-semibold items-center justify-center mt-6">All Products</h1>
        {loading && <h1>Products Loading, Please Wait</h1>}
        {!loading && (
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, index) => (
              <Link key={index} href={`/product/${product._id}`}>
                <div className="w-96">
                  <SingleProductCard
                    name={product?.name}
                    price={product?.price}
                    image={product?.images[0]}
                    newArrival={product.newArrival}
                    productViews={product.productViews}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
