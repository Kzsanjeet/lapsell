"use client"

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
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='py-36'>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img
                                alt="ecommerce"
                                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                src={product.images[0] || "https://dummyimage.com/400x400"}
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                                <h2 className="flex gap-2 items-center text-sm title-font text-gray-500 tracking-widest"><FaEye /> {product.productViews}</h2>
                                <p className="leading-relaxed">{product.description}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                    <div className="flex">
                                        <span className="mr-3">Battery</span>
                                        <span>{product.batteryType} - {product.batteryCapacity} mAh</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        NPR {product.price.toLocaleString()}
                                    </span>
                                    <button className="flex ml-auto text-white bg-nabbar border-0 py-2 px-6 focus:outline-none hover:bg-orange-400 rounded">
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Specifications:</h3>
                                    <ul className="list-disc ml-4">
                                        <li>Processor: {product.processor}</li>
                                        <li>Display Size: {product.displaySize} inches</li>
                                        <li>Weight: {product.weight} kg</li>
                                        <li>Dimensions: {product.width} x {product.height} x {product.depth} cm</li>
                                    </ul>
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
