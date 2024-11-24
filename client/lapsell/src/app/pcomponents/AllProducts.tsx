"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SingleProductCard from "./SingleProductCard";

interface Product {
  _id: string;
  name: string;
  brand: {brandname:string}
  price: number;
  images: string[];
  newArrival: boolean;
  productViews: number;
}

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  const getProductHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/products/all-products");
      if (response.data.success) {
        const productsData = response.data.data;
        setProducts(productsData);
        setFilteredProducts(productsData);
console.log(productsData)
        // Extract unique brand names
        const uniqueBrands:any = Array.from(
          new Set(productsData?.map((product: Product) => product?.brand?.brandname))
        );

        setBrands(uniqueBrands);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  const handleBrandFilter = (brand: string) => {
    setSelectedBrand(brand);
    if (brand === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.brand.brandname === brand));
    }
  };

  useEffect(() => {
    getProductHandler();
  }, []);

  return (
    <div className="flex relative">
      {/* Filter Container */}
      <div className="bg-gray-100 w-1/6 py-24 px-6 shadow-md fixed top-26 left-0 h-full z-6">
        <h2 className="text-lg font-semibold text-gray-800 pt-16 mb-4">Filters</h2>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Brand</h3>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
            value={selectedBrand}
            onChange={(e) => handleBrandFilter(e.target.value)}
          >
            <option value="all">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Container */}
      <div className="bg-gray-100 w-5/6 ml-auto pl-6 pt-32 pr-6">
        <h1 className="flex text-2xl font-semibold items-center justify-center mt-6">All Products</h1>
        {loading && <h1>Products Loading, Please Wait</h1>}
        {!loading && (
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <div className="w-96">
                  <SingleProductCard
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
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
