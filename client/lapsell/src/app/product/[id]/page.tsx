"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Nabbar from "@/app/pcomponents/Nabbar";
import Description from "@/app/pcomponents/Description";
import Footer from "@/app/pcomponents/Footer";
import Loader from "@/app/pcomponents/Loader";

interface Product {
  _id: string;
  name: string;
  brand: { _id: string; brandname: string };
  price: number;
  newArrival?: boolean;
  images: string[];
  description?: string;
  isNew: boolean;
  productViews: number;
}

const Page = () => {
  const prodId = useParams();
  const id = prodId.id as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSimilarProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:4000/similar-products/${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
      });

      const data = await response.json()
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || "Failed to fetch similar products.");
      }
    } catch (error) {
      setError("Error fetching similar products. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSimilarProducts();
    }
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      <Nabbar />
      <Description productId={id} />
      <div className="flex flex-col items-center justify-center bg-secondary pb-10">
            <div>
            <h2 className="text-3xl font-bold mb-4">Similar Products</h2>
            </div>
          
            <div className="flex flex-wrap w-full gap-6 justify-center pt-6 pb-10">
            {products.map((prod) => (
              <Link
                key={prod._id}
                href={`/product/${prod._id}`}
                className="box-glow w-1/5  bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
              >
                <div className="relative overflow-hidden rounded-md mb-4">
                  {prod.isNew && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full z-10">
                      New
                    </span>
                  )}
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-80 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 mix-blend-mode:color-burn;"
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black opacity-20 rounded-full blur-lg"></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <h2 className="text-lg font-semibold text-primary">
                      {prod.name}
                    </h2>
                    <p className="text-primary">Views: {prod.productViews}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-light text-gray-500 line-through">
                      Rs 80000
                    </p>
                    <p className="text-lg font-bold text-black">{prod.price}</p>
                  </div>
                </div>
              </Link>
            ))}

            {!loading && products.length < 1 && (
              <div className="text-center text-2xl text-gray-600">
                No Similar Products Available
              </div>
            )}
          </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Page;
