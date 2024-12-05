"use client";
import React from 'react'


const UserLogin = () => {
  return (
    <div className="min-h-60 bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#F85606] mb-6">
          Welcome Back
        </h1>
        <form>
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-[#F85606] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F85606] placeholder-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F85606] text-white py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition"
          >
            Login
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
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-bold underline hover:opacity-80 transition"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin