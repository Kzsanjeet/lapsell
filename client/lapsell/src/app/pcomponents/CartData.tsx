"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Import the useRouter hook for navigation
import Link from "next/link";

interface CardItemType {
  _id: string;
  quantity: number;
  productImage: string[];
  productName: string;
  productPrice: number;
  totalPrice: number;
}

const CartData: React.FC = () => {
  const token = Cookies.get("accessToken");
  const userId = Cookies.get("userId");
  const router = useRouter(); // Initialize the router for navigation

  const [cartItems, setCartItems] = useState<CardItemType[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized function to fetch cart details
  const getAddCardCount = async () => {
    if (!token || !userId) {
      setError("Please log in to view your cart.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/user-card-details?id=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setCartItems(data.data);
        setTotalCartPrice(data.totalCartPrice);
      } else {
        setError("Failed to fetch cart details.");
      }
    } catch (err) {
      setError("An error occurred while fetching cart details.");
    } finally {
      setLoading(false);
    }
  };

  // Function to remove an item from the cart
  const handleRemoveItem = async (id: string) => {
    if (!token || !userId) {
      setError("Please log in to remove items from the cart.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/remove-cart-item`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId: id }),
      });

      if (!response.ok) {
        throw new Error(`Error removing item: ${response.status}`);
      }

      // After successful removal, fetch updated cart details
      getAddCardCount();
    } catch (err) {
      setError("Failed to remove item from the cart.");
    }
  };

  // Function to navigate to product details page
  const handleViewProduct = (id: string) => {
    router.push(`/product/${id}`); // Navigate to the product page (update with actual URL structure)
  };

  useEffect(() => {
    getAddCardCount();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Checkout</h1>

      {loading && <p className="text-center text-blue-500">Loading cart details...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && cartItems.length === 0 && (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}

      {!loading && !error && cartItems.length > 0 && (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center gap-6 py-6">
                <img
                  src={item.productImage[0]}
                  alt={item.productName}
                  className="w-28 h-28 object-cover rounded-md border border-gray-300 shadow-sm"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{item.productName}</h2>
                  <p className="text-gray-600 mt-2">
                    Price: <span className="font-medium text-gray-800">NPR {item.productPrice.toLocaleString()}</span>
                  </p>
                  <p className="text-gray-600 mt-2">Quantity: <span className="font-medium">{item.quantity}</span></p>
                  <p className="text-gray-800 font-semibold mt-2">
                    Total: <span className="text-primary">NPR {item.totalPrice.toLocaleString()}</span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleViewProduct(item._id)}
                    className="text-primary hover:underline"
                  >
                    View Product
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-6 border-gray-200 text-right">
            <p className="text-2xl font-semibold text-gray-900">
              Total Cart Price: <span className="text-primary">NPR {totalCartPrice.toLocaleString()}</span>
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button className="bg-nabbar text-white px-8 py-3 rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition">
              Proceed to Payment
            </button>
            <Link href={'/products'} className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartData;
