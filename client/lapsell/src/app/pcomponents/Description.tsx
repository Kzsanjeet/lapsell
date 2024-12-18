"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { LoginUserContext } from "@/provider/SignUpContext";
import { AddCardContext } from "@/provider/AddToCartContext";

interface DescriptionProps {
  productId: string;
}

interface Product {
  _id: string;
  productViews: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  batteryType: string;
  batteryCapacity: string;
  processor: string;
  displaySize: string;
  weight: string;
  width: string;
  height: string;
  depth: string;
  [key: string]: any;
}

const Description = ({ productId }: DescriptionProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginUserContext)!;
  const { cardItem, setCardItem } = useContext(AddCardContext)!;
  const [loading, setLoading] = useState(false);

  const userId = Cookies.get("userId");

  const getProductHandler = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/get-single-product/${productId}`
      );
      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        console.log(response.data.message || "Failed to fetch product details.")
        toast.error(response.data.message || "Failed to fetch product details.");
      }
    } catch (error) {
      console.log("Error fetching product:", error);
      toast.error("Failed to fetch product details. Please try again.");
    }
  };

  const getMyCartData = async () => {
    console.log('testinggggg')
    try {
      const response = await fetch(
        `http://localhost:4000/get-single-cart-details/${productId}/${userId}`,
        {
            method: "GET",
            credentials:"include"
        }
      );
      const data = await response.json()

      if(data.success){
        setQuantity(data.data.quantity)
      }

      if (data.success) {
        toast.success("Cart data retrieved successfully.");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  };

  const updateQuantity = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to continue.");
      return;
    }

    try {
      setLoading(true);
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        toast.error("Access token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/product/add-card/${productId}?q=${quantity}`,
        {
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials:true
          
        }
      );

      if (response.data.success) {
        toast.success("Cart updated successfully!");
      } else {
        console.log("Error updating cart:", response.data.message);
        toast.error(response.data.message || "Failed to update cart.");
      }
    } catch (error) {
      console.log("Error updating quantity:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = (action: string) => {
    if (action === "add") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "subtract" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getProductHandler();
    console.log('user', userId)
    if (userId) {
      getMyCartData();
    }
  }, [productId]);

  if (!product) {
    return <div className="text-center py-36 text-gray-700">Loading...</div>;
  }

  return (
    <div className="py-36 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container mx-auto px-5 py-12">
          <div className="flex flex-wrap lg:w-4/5 mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
              src={product.images?.[0] || "https://dummyimage.com/400x400"}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 px-6 flex flex-col justify-center">
              <h1 className="text-gray-900 text-3xl font-bold mb-4">
                {product.name}
              </h1>
              <h2 className="flex items-center text-gray-600 mb-4 gap-2 text-sm">
                <FaEye className="text-orange-500" /> {product.productViews} Views
              </h2>
              <p className="leading-relaxed text-gray-700 text-base mb-6">
                {product.description || "No description available."}
              </p>
              <div className="border-t border-gray-200 py-4">
                <h3 className="text-sm text-gray-500 font-medium mb-2">
                  Battery
                </h3>
                <p className="text-gray-800">
                  {product.batteryType} - {product.batteryCapacity} mAh
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Specifications
                </h3>
                <ul className="list-disc ml-4 text-gray-800 space-y-1">
                  <li>Processor: {product.processor}</li>
                  <li>Display Size: {product.displaySize} inches</li>
                  <li>Weight: {product.weight} kg</li>
                  <li>
                    Dimensions: {product.width} x {product.height} x {product.depth} cm
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-bold text-gray-900">
                  NPR {product.price.toLocaleString()}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpdateQuantity("subtract")}
                    className="bg-nabbar p-2 h-10 text-white rounded-full flex justify-center items-center text-4xl"
                  >
                    -
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => handleUpdateQuantity("add")}
                    className="bg-nabbar p-2 h-10 text-white rounded-full flex justify-center items-center text-4xl"
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all shadow-lg"
                  onClick={updateQuantity}
                  disabled={loading}
                >
                  {loading ? "Adding to Cart..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Description;
