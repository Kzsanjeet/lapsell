import React from 'react';

const Card = () => {
  return (
    <div>
        <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold text-primary">Popular Products</h1>
            <p className="text-gray-600">Check out our most popular products</p>
        </div>
        <div className="p-6 max-w-xs mx-auto h-2/5 bg-secondary rounded-lg shadow-lg hover:shadow-lg transition-shadow duration-300">
            <div className="relative overflow-hidden rounded-lg mb-4">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full z-10 justify-center">
                New
                </span>
                <img
                src="https://cdn.thewirecutter.com/wp-content/media/2024/07/editing-laptop-2048px-233661.jpg?auto=webp&quality=75&width=1024"
                alt="Macbook Pro"
                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
                />
            </div>
            <div className="flex justify-between items-center">
                <div>
                <h2 className="text-lg font-semibold text-primary">Macbook Pro</h2>
                <p className="text-primary">Laptop</p>
                </div>
                <p className="text-lg font-bold text-black">Rs 70000</p>
            </div>
        </div>
    </div>
  );
};

export default Card;
