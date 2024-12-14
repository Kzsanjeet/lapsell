"use client"
import React, { useContext } from 'react';
import { GrCart } from "react-icons/gr";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { UserContext } from "@/provider/SignUpContext";

const AddToCard = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)!;

    if (!isLoggedIn) {
        return <GrCart className="text-2xl text-gray-700" />;
    }

    return (
        <div className="relative">
            <Sheet>
                <SheetTrigger>
                    <GrCart className="text-2xl text-gray-700 cursor-pointer hover:text-gray-900 transition" />
                </SheetTrigger>
                <SheetContent className="bg-white p-6 rounded-lg shadow-lg">
                    <SheetHeader>
                        <SheetTitle className="text-xl font-bold text-gray-800">Cart Items</SheetTitle>
                        <SheetDescription>
                            <div className="space-y-6">
                                {/* Cart Item */}
                                <div className="flex items-center border-b pb-4 mb-4">
                                    <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-300">
                                        <img src="data:image/jpeg;base64,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gREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/2Q==" alt="Product" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 pl-4">
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-lg font-medium text-gray-800">Product Name</h1>
                                            <h2 className="text-sm text-gray-500">Brand</h2>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <button className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded">-</button>
                                            <h3 className="text-lg font-medium text-gray-700">1</h3>
                                            <button className="px-3 py-1 text-lg font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded">+</button>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <button className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                                            <h1 className="text-lg font-semibold text-gray-800">Price</h1>
                                        </div>
                                    </div>
                                </div>
                                {/* Total Section */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-lg font-medium text-gray-800">Total</h1>
                                        <h1 className="text-lg font-semibold text-gray-900">Price</h1>
                                    </div>
                                </div>
                                {/* Checkout Button */}
                                <div className="pt-4">
                                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all font-medium text-lg">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AddToCard;