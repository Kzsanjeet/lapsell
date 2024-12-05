"use client"

import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

const Search = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            const sendSearch = await fetch(`http://localhost:4000/products?search=${searchInput}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const response = await sendSearch.json();
            if (response.success) {
                console.log(response.products);
            }
        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    return (
        <div className="p-4">
            <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 bg-gray-800 rounded-lg shadow-lg"
            >
                <Input
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    className="flex-1 text-gray-200 bg-transparent border-none focus:ring-0 placeholder-gray-500"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="p-2 text-white hover:text-orange-300"
                >
                    <IoSearchSharp/>
                </button>
            </form>
        </div>
    );
};

export default Search;
