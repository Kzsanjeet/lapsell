"use client";

import axios from 'axios';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { any } from 'zod';
import { LoginUserContext } from '@/provider/SignUpContext';
import { AddCardContext } from '@/provider/AddToCartContext';

interface DescriptionProps {
    productId: string;
}

interface Product {
    _id:string;
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
    const [quantity, setQuantity] = useState(1)
    const {isLoggedIn,setIsLoggedIn} = useContext(LoginUserContext)!
    const {cardItem, setCardItem} = useContext(AddCardContext)!
    const [loading, setLoading] = useState(false);


    const getProductHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/product/get-single-product/${productId}`);
            if (response.data.success) {
                setProduct(response.data.data);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (productId) {
            getProductHandler();
        }
    }, [productId]);

   


    //for adding to cart
    // const addToCart = async () => {
    //     if (!isLoggedIn) {
    //         alert("Please log in to continue.");
    //         return;
    //     }
    
    //     setLoading(true);
    
    //     try {
    //         const accessToken = Cookies.get("accessToken");
    //         if (!accessToken) {
    //             alert("Access token not found. Please log in.");
    //             return;
    //         }
    
    //         const response = await fetch(
    //             `http://localhost:4000/product/add-card/${productId}?q=1`, // Add product with quantity = 1
    //             {
    //                 method: "POST",
    //                 credentials: "include",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );
    
    //         const data = await response.json();
    
    //         if (data?.success) {
    //             const { existingCartItem } = data;
    
    //             if (existingCartItem?.quantity === 1) {
    //                 setQuantity(1); // Set quantity to 1 for the newly added product
    //                 setCardItem(existingCartItem); 
    //                 console.log(cardItem, "check cart item")
    //                 alert("Product added to cart successfully")
    //                 toast.success("Product added to cart successfully!");
    //             } else if (existingCartItem?.quantity > 1) {
    //                 alert("Product is already in the cart.")
    //                 toast.success("Product is already in the cart.");
    //             }
    //         } else {
    //             console.error("Error adding to cart:", data?.message || "Unknown error");
    //             toast.error(data?.message || "Failed to add product to cart.");
    //         }
    //     } catch (error) {
    //         console.error("Error in addToCart:", error);
    //         toast.error("Something went wrong. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const addToCart = async () => {
        if (!isLoggedIn) {
            alert("Please log in to continue.");
            return;
        }
        
        setLoading(true);  
        try {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                alert("Access token not found. Please log in.");
                return;
            }
            
            const response = await fetch(`http://localhost:4000/product/add-card/${productId}?q=1`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            const data = await response.json();
            
            if (data.success) {
                    setCardItem([...cardItem, data.existingCartItem]);
                    console.log(cardItem, "test cart")
                    alert("Product added to cart successfully");
                } else if(quantity > 1) {
                    alert("Product already added to cart");
                    console.log(quantity,"test q")
                }
        } catch (error) {
            console.error("Error while adding product to cart:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    // for updating quantity to cart
    const updateQuantity = async (quantityChange: number) => {
        if (!isLoggedIn) {
            alert("Please log in to continue.");
            return;
        }
    
        setLoading(true);
    
        try {
            const accessToken = Cookies.get("accessToken");
            if (!accessToken) {
                alert("Access token not found. Please log in.");
                return;
            }
    
            const newQuantity = quantity + quantityChange;
            if (newQuantity < 1) {
                alert("Quantity cannot be less than 1.");
                setLoading(false);
                return;
            }
    
            const response = await fetch(
                `http://localhost:4000/product/add-card/${productId}?q=${newQuantity}`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    
            const data = await response.json();
    
            if (data?.success) {
                setQuantity(data.existingCartItem?.quantity || newQuantity);
                console.log(quantity, "check quantity")
                if(data.existingCartItem._id === cardItem[2].product._id){
                    setCardItem(data.existingCartItem)
                };
                // setCardItem(data.existingCartItem)
                // console.log(cardItem,"check cart after updating")
                alert("Cart updated successfully")
                toast.success("Cart updated successfully!");
            } else {
                console.error("Error updating cart:", data?.message || "Unknown error");
                toast.error(data?.message || "Failed to update cart.");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    // Handlers for Add and Remove
    const handleAddToCart = () => updateQuantity(1);
    const handleRemoveFromCart = () => updateQuantity(-1);
    
    
      if (!product) {
        return <div className="text-center py-36 text-gray-700">Loading...</div>;
    }

    return (
        <>
          <div className="py-36 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container mx-auto px-5 py-12">
            <div className="flex flex-wrap lg:w-4/5 mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
                {/* Product Image */}
                <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                src={product.images[0] || "https://dummyimage.com/400x400"}
                />
                {/* Product Details */}
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 px-6 flex flex-col justify-center">
                <h1 className="text-gray-900 text-3xl font-bold mb-4">{product.name}</h1>
                <h2 className="flex items-center text-gray-600 mb-4 gap-2 text-sm">
                    <FaEye className="text-orange-500" /> {product.productViews} Views
                </h2>
                <p className="leading-relaxed text-gray-700 text-base mb-6">
                    {product.description}
                </p>
                <div className="border-t border-gray-200 py-4">
                    <h3 className="text-sm text-gray-500 font-medium mb-2">Battery</h3>
                    <p className="text-gray-800">
                    {product.batteryType} - {product.batteryCapacity} mAh
                    </p>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
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
                    {/* Quantity Control Buttons */}
                    <button
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                        onClick={handleAddToCart}
                    >
                        +
                    </button>
                    <button
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                        onClick={handleRemoveFromCart}
                    >
                        -
                    </button>
                    </div>
                    {/* Add to Cart Button */}
                    <button
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all shadow-lg"
                    onClick={addToCart}
                    disabled = {loading}
                    >
                    {loading ? "Adding to cart":"Add to Cart"}
                    </button>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
        </>
    );
};

export default Description;
