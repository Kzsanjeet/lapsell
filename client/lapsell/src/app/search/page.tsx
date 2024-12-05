"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Nabbar from '../pcomponents/Nabbar';
import SingleProductCard from '../pcomponents/SingleProductCard';
import { Loader2 } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    brand: { brandname: string };
    price: number;
    images: string[];
    newArrival: boolean;
    productViews: number;
}

const  page: React.FC = () => {
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchProducts, setSearchProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setSearchTerm(query);
            handleSearch(query);
        }
    }, [searchParams]);

    const handleSearch = async (term: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:4000/products?search=${term}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setSearchProducts(data.products);
            }
        } catch (error) {
            console.error("Error performing search:", error);
            setError('An error occurred while searching');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Nabbar />
            <div className="container mx-auto px-4 py-12 mt-24">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Search Results for: <span className="text-primary">{searchTerm}</span>
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 text-xl">{error}</div>
                ) : searchProducts.length === 0 ? (
                    <div className="text-center text-gray-600 text-xl">
                        No products found for "{searchTerm}"
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {searchProducts.map((product) => (
                            <Link 
                                key={product._id} 
                                href={`/product/${product._id}`} 
                                className="hover:scale-105 transition-transform"
                            >
                                <SingleProductCard
                                    name={product.name}
                                    price={product.price}
                                    image={product.images[0]}
                                    newArrival={product.newArrival}
                                    productViews={product.productViews}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default  page;