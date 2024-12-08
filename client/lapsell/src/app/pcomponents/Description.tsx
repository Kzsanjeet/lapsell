"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";

interface DescriptionProps {
    productId: string;
}

interface Product {
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

    if (!product) {
        return <div className="text-center py-36 text-gray-700">Loading...</div>;
    }

    return (
        <>
            <div className="py-36 bg-secondary">
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container mx-auto px-5 py-12">
                        <div className="flex flex-wrap lg:w-4/5 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Product Image */}
                            <img
                                alt="ecommerce"
                                className="lg:w-1/2 w-full object-cover object-center"
                                src={product.images[0] || "https://dummyimage.com/400x400"}
                            />
                            {/* Product Details */}
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 px-6 flex flex-col justify-center">
                                <h1 className="text-gray-900 text-3xl font-semibold mb-4">{product.name}</h1>
                                <h2 className="flex items-center text-gray-600 mb-4 gap-2">
                                    <FaEye className="text-orange-500" /> {product.productViews} Views
                                </h2>
                                <p className="leading-relaxed text-gray-700 text-base mb-6">
                                    {product.description}
                                </p>
                                <div className="border-t border-gray-200 py-4">
                                    <h3 className="text-sm text-gray-500 font-medium mb-2">Battery</h3>
                                    <p className="text-gray-800">{product.batteryType} - {product.batteryCapacity} mAh</p>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Specifications</h3>
                                    <ul className="list-disc ml-4 text-gray-800">
                                        <li>Processor: {product.processor}</li>
                                        <li>Display Size: {product.displaySize} inches</li>
                                        <li>Weight: {product.weight} kg</li>
                                        <li>Dimensions: {product.width} x {product.height} x {product.depth} cm</li>
                                    </ul>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                    <span className="text-2xl font-bold text-gray-900">
                                        NPR {product.price.toLocaleString()}
                                    </span>
                                    <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all">
                                        Add to Cart
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
