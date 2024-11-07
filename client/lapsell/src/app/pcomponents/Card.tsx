"use client"
import React, { useEffect, useState } from 'react';
import "../globalCss/boxshadow.css";
import products from "../data/products.json";


interface Product {
  id: number;
  title: string;
  category: string;
  price: string; 
  isNew: boolean;
  imageUrl: string;
}


const Card = () => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    setProduct(products);
  }, [product]);  // if i left the big bracket empty it renders only in the initial 
                  // if i add product here it means if product updates count effect will run again.

  return (
    <div className="p-6">
      <div className="text-center mt-20 mb-5">
        <h1 className="text-4xl font-bold text-primary">Popular Products</h1>
        <p className="text-gray-600">Check out our most popular products</p>
      </div>

      <div className="flex flex-wrap w-full gap-4 justify-center">
        {product.map((prod) => (
          <div
            key={prod.id}
            className="box-glow p-6 bg-secondary rounded-lg w-1/5 hover:shadow-primary transition-shadow duration-300 cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-md mb-4">
              {prod.isNew && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full z-10">
                  New
                </span>
              )}
              <img
                src="images/macbook.png"
                alt={prod.title}
                className="w-full h-80 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 mix-blend-mode color-burn;"
              />
                {/* Circular shadow effect */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black opacity-20 rounded-full blur-lg"></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <h2 className="text-lg font-semibold text-primary">{prod.title}</h2>
                <p className="text-primary">{prod.category}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-light text-gray-500 line-through">Rs 80000</p>
                <p className="text-lg font-bold text-black">{prod.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
