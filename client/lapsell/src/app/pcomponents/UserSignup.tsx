"use client";

import { LoginUserContext } from "@/provider/SignUpContext";
import Link from "next/link";
import React, { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";

// import { UserContext } from "./Nabbar";

const UserSignup = ({ onSuccessLogin }: { onSuccessLogin: () => void }) => {
  // const { setLoggedIn } = useContext(UserContext);
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {isLoggedIn,setIsLoggedIn} = useContext(LoginUserContext)!

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/user-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullName,
          email: email,
          number: number,
          password: password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        onSuccessLogin();
      } else {
        setError("Invalid email or user already exists.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-56 bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#F85606] mb-6">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#F85606]"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e)=>setFullname(e.target.value)}
              placeholder="Enter your full name"
              className="w-full mt-2 p-3 border border-[#F85606] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606] placeholder-gray-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#F85606]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-[#F85606] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606] placeholder-gray-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#F85606]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={number}
              onChange={(e)=>setNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full mt-2 p-3 border border-[#F85606] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606] placeholder-gray-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#F85606]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-[#F85606] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606] placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            disabled = {loading}
            className="w-full bg-[#F85606] text-white py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition"
          >
            {loading ? "Signing in.." : "Sign Up"}
          </button>
        </form>
        <div className="my-6 flex items-center justify-center">
          <div className="h-px bg-[#F85606] flex-1" />
          <span className="px-2 text-sm text-[#F85606]">OR</span>
          <div className="h-px bg-[#F85606] flex-1" />
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center bg-white border border-[#F85606] text-[#F85606] py-3 rounded-lg font-semibold hover:bg-[#F85606] hover:text-white transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            className="h-5 w-5 mr-3"
          />
          Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-[#F85606]">
          Already have an account?{" "}
          <Link href={"/login"}
            className="font-bold underline hover:opacity-80 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
