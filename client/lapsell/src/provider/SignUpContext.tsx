"use client";

import { createContext, Dispatch, FC, SetStateAction, useState, ReactNode } from "react";

// Define the interface for the context value
interface LoginUserType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value of `null` for better type safety
export const LoginUserContext = createContext<LoginUserType | null>(null);

// Define the props for the provider component
interface LoginUserProviderProps {
  children: ReactNode; // Properly type the children prop
}

// Create the LoginUserProvider component
const LoginUserProvider: FC<LoginUserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoginUserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export { LoginUserProvider };
