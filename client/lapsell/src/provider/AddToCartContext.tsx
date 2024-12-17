"use client";

// import { createContext, Dispatch, FC, SetStateAction, useState, ReactNode } from "react";

// interface ProductType {
//   _id: string;
//   images: string[]; // Array of image URLs
//   name: string; // Name of the product
//   description: string; // Product description
//   price: number; // Product price
// }

// interface CardItemType {
//   _id: string; // Unique identifier
//   product: ProductType; // Product details
//   quantity: number; // Quantity of the product
// }

// // Define the interface for the context value
// interface AddCardType {
//   cardItem: CardItemType[]; // cardItem should be an array of CardItemType
//   setCardItem: Dispatch<SetStateAction<CardItemType[]>>; // setCardItem updates the array
// }

// // Create the context with a default value of `null` for better type safety
// export const AddCardContext = createContext<AddCardType | null>(null);

// // Define the props for the provider component
// interface AddCardProviderProps {
//   children: ReactNode; // Properly type the children prop
// }

// // Create the AddCardProvider component
// const AddCardProvider: FC<AddCardProviderProps> = ({ children }) => {
//   // Initialize cardItem state as an empty array of CardItemType
//   const [cardItem, setCardItem] = useState<CardItemType[]>([]);

//   return (
//     <AddCardContext.Provider value={{ cardItem, setCardItem }}>
//       {children}
//     </AddCardContext.Provider>
//   );
// };

// export { AddCardProvider };


import React, { createContext, useState, ReactNode } from "react";

interface ProductType {
  _id: string,
  images: string[];
  name: string;
  description: string;
  price: number;
}

interface CardItemType {
  _id: string;
  product: ProductType;
  quantity: number;
}

interface AddCardContextType {
  cardItem: CardItemType[];
  setCardItem: React.Dispatch<React.SetStateAction<CardItemType[]>>;
}

export const AddCardContext = createContext<AddCardContextType | null>(null);

export const AddCardProvider = ({ children }: { children: ReactNode }) => {
  const [cardItem, setCardItem] = useState<CardItemType[]>([]); // Initialize with an empty array

  return (
    <AddCardContext.Provider value={{ cardItem, setCardItem }}>
      {children}
    </AddCardContext.Provider>
  );
};
