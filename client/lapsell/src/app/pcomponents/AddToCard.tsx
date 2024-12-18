"use client";
import React, { useContext, createContext, useState } from "react";
import { GrCart } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Cart item type definition
export interface CartItemType {
  _id: string;
  quantity: number;
  productImage: string[];
  productName: string;
  productPrice: number;
  totalPrice: number;
}

// Cart context type
interface CartContextType {
  cardItem: CartItemType[];
  setCardItem: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  totalCartPrice: number;
  setTotalCartPrice: React.Dispatch<React.SetStateAction<number>>;
}

// Login context type
interface LoginContextType {
  isLoggedIn: boolean;
}

// Create context with default values
export const AddCardContext = createContext<CartContextType | undefined>(undefined);
export const LoginUserContext = createContext<LoginContextType | undefined>(undefined);

// Context Provider Component
export const AddCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cardItem, setCardItem] = useState<CartItemType[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);

  return (
    <AddCardContext.Provider 
      value={{ 
        cardItem, 
        setCardItem, 
        totalCartPrice, 
        setTotalCartPrice 
      }}
    >
      {children}
    </AddCardContext.Provider>
  );
};

// Login Provider Component (example implementation)
export const LoginUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <LoginUserContext.Provider value={{ isLoggedIn }}>
      {children}
    </LoginUserContext.Provider>
  );
};

const AddToCart: React.FC = () => {
  // Use type assertion to handle potential undefined context
  const { isLoggedIn } = useContext(LoginUserContext) || { isLoggedIn: false };
  const {cardItem} = useContext(AddCardContext)!

  const [totalCartPrice , setTotalCartPrice] = useState(0)

  // Handle removing item from cart
  const handleRemoveItem = (itemId: string) => {
    const updatedItems = cardItem.filter((item) => item._id !== itemId);
    const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.totalPrice, 0);

    // setCardItem(updatedItems);
    setTotalCartPrice(updatedTotalPrice);
  };

  // If not logged in, show cart icon without items
  if (!isLoggedIn) {
    return <GrCart className="text-2xl text-white" />;
  }

  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger>
          <div className="relative">
            <GrCart className="text-2xl text-gray-700 cursor-pointer hover:text-gray-900 transition" />
            {cardItem.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cardItem.length}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className="bg-white w-[600px] p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold text-gray-800">
              Shopping Cart
            </SheetTitle>
          </SheetHeader>

          {cardItem.length > 0 ? (
            <div className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto">
              {cardItem.map((item) => (
                <div key={item._id} className="flex items-center border-b pb-4 space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-md overflow-hidden border border-gray-300">
                    <img
                      src={item.productImage[0] || "/placeholder-image.png"}
                      alt={item.productName}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.productName}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-800">
                        NPR {item.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">Your cart is empty</div>
          )}

          {/* Cart Summary */}
          {cardItem.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-green-600">
                  NPR {totalCartPrice.toLocaleString()}
                </span>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddToCart;