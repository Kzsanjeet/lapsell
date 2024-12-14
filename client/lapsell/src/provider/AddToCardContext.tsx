"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

// Define the type for items in the cart
interface CardItem {
  userId: string;
  productId: string;
  quantity: number;
}

// Define the type for the context
interface CardContextProps {
  cardArray: CardItem[];
  setCardArray: Dispatch<SetStateAction<CardItem[]>>;
}

// Create the context with an initial null value
export const CardContext = createContext<CardContextProps | null>(null);

// Context provider component
const CardProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  // State for the card array (holds all items in the cart)
  const [cardArray, setCardArray] = useState<CardItem[]>([]);

  return (
    <CardContext.Provider value={{ cardArray, setCardArray }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
