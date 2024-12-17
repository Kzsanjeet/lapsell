"use client";
import React, { useContext, useState } from "react";
import { GrCart } from "react-icons/gr";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi"; // Icons for plus, minus, and delete
import Cookies from "js-cookie";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LoginUserContext } from "@/provider/SignUpContext";
import { AddCardContext } from "@/provider/AddToCartContext";
import { number } from "zod";

interface ProductType {
  images: string[];
  name: string;
  description: string;
  price: number;
}

interface CardItemType {
  _id: string;
  product: ProductType;
  quantity: number;
}

const AddToCard = () => {
  const { isLoggedIn } = useContext(LoginUserContext)!;
  const { cardItem, setCardItem } = useContext(AddCardContext)!;
 
  if (!isLoggedIn) {
    return <GrCart className="text-2xl text-white" />;
  }
  console.log(cardItem, "test cart")

  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger>
          <GrCart className="text-2xl text-gray-700 cursor-pointer hover:text-gray-900 transition" />
        </SheetTrigger>
        <SheetContent className="bg-white p-6 rounded-lg shadow-lg">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-gray-800">
              Cart Items
            </SheetTitle>
            <SheetDescription>
              {cardItem.length > 0 ? (
                <div className="space-y-6">
                  {cardItem.map(({ product, quantity, _id }) => {
  if (!product) {
    return (
      <div key={_id} className="text-red-500">
        Missing product data
      </div>
    );
  }
  return (
              <div
                key={_id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-300">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-black">
                    {product.name}
                  </h3>
                  <p className="text-sm text-black">
                    {product.description}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-black">
                    Price: NPR {(product.price * quantity).toLocaleString()}
                  </p>
                  <p className="text-sm text-black">Quantity: {quantity}</p>
                </div>
              </div>
            );
          })}

                </div>
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddToCard;
