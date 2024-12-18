"use client";
import Link from "next/link";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Rubik_Wet_Paint } from "next/font/google";
import Cookies from "js-cookie";

// Import components
import UserSignup from "./UserSignup";
import UserLogin from "./UserLogin";
import Profile from "./Profile";
import AddToCard from "./AddToCard";

// Import contexts
import { AddCardContext } from "@/provider/AddToCartContext";
import { LoginUserContext } from "@/provider/SignUpContext";
import CartData from "./CartData";
import { ShoppingCart } from "lucide-react";

const rubik = Rubik_Wet_Paint({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface AddCard {
  userId: string;
  productId: string;
  quantity: number;
}

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [select, setSelect] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  // Context hooks
  const { setIsLoggedIn, isLoggedIn } = useContext(LoginUserContext)!;
  const { setCardItem } = useContext(AddCardContext)!;

  // Get token and user ID from cookies
  const token = Cookies.get("accessToken");
  const userId = Cookies.get("userId");

  // Memoized function to fetch cart details
  const getAddCardCount = useCallback(async () => {
    // Early return if no token or user ID
    if (!token || !userId) {
      console.log("Authentication required to fetch cart details");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/user-card-details?id=${userId}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Validate response structure
      if (data.success && Array.isArray(data.data)) {
        setCardItem(data);
        setCount(data.data.length);
      } else {
        console.warn("Invalid cart data format", data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [token, userId, setCardItem]);

  // Check login status on component mount
  useEffect(() => {
    if (token && userId) {
      setIsLoggedIn(true);
    }
  }, [token, userId, setIsLoggedIn]);

  // Fetch cart details when logged in
  useEffect(() => {
    if (isLoggedIn) {
      getAddCardCount();
    }
  }, [isLoggedIn, getAddCardCount]);

  // Handle search functionality
  const handleSearchBar = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  // Render login/signup modal
  const renderModal = () => {
    if (!select) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
            onClick={() => setSelect(null)}
            aria-label="Close modal"
          >
            ✖
          </button>
          {select === "signup" && (
            <UserSignup onSuccessLogin={() => setSelect(null)} />
          )}
          {select === "login" && (
            <UserLogin onSuccessLogin={() => setSelect(null)} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full">
      <header className="text-white body-font bg-nabbar font-serif relative">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/" className="flex items-center">
            <span
              className={`ml-3 text-3xl font-semibold text-white ${rubik.className} cursor-pointer`}
            >
              LapSell
            </span>
          </Link>
          
          <nav className="md:ml-auto md:mr-auto flex font-semibold flex-wrap items-center text-base justify-center">
            {["", "products", "about-us"].map((path) => (
              <Link
                key={path}
                href={`/${path}`}
                className="mr-5 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:text-orange-200"
              >
                {path ? path.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "Home"}
              </Link>
            ))}
          </nav>

          <div className="flex flex-row space-x-5">
            <div className="flex items-center space-x-3">
              <form onSubmit={handleSearchBar} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 h-9 rounded-md p-2 text-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="font-semibold text-black text-2xl absolute top-1 right-2"
                  aria-label="Search"
                >
                  <IoSearchSharp />
                </button>
              </form>

              
              <div>
                <div className="relative">
                  {isLoggedIn ?(
                    <Link href={'/checkout'}>
                      <p ><ShoppingCart/></p>
                      
                      {count > 0 && (
                    <span className="absolute top-1/2 right-0 transform translate-x-2 translate-y-2 bg-white text-black text-xs rounded-full px-1 shadow-md">
                      {count}
                    </span>
                  )}
                    </Link>
                    ):("")}
                </div>
              </div>

              <div className="flex flex-row gap-6 pl-4">
                {isLoggedIn ? (
                  <Profile />
                ) : (
                  <>
                    <button
                      className="cursor-pointer text-xl"
                      onClick={() => setSelect("login")}
                    >
                      Login
                    </button>
                    <button
                      className="cursor-pointer text-xl"
                      onClick={() => setSelect("signup")}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {renderModal()}
    </div>
  );
};

export default Navbar;