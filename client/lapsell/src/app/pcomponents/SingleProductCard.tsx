"use client";
import React from "react";
import "../globalCss/boxshadow.css";

interface ProductProps {
  name: string;
  price: number;
  productViews: number;
  image: string;
  newArrival: boolean;
}

const SingleProductCard = ({
  name,
  price,
  productViews,
  image,
  newArrival,
}: ProductProps) => {
  return (
    <div className="w-[22rem] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      {/* Image Section */}
      <div className="relative">
        {newArrival && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full z-10">
            New
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover rounded-md transition-transform duration-300 transform hover:scale-105"
        />
        {/* Circular shadow effect */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black opacity-20 rounded-full blur-lg"></div>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800 truncate">{name}</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-500 text-sm">
            Views: <span className="font-semibold">{productViews}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">
            Rs {price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
