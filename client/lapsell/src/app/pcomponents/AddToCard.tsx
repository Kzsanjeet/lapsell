"use client"
import React, { createContext, useState } from 'react';
import Random from './Random';

// Export UserContext so other components can use it
export const UserContext = createContext<string>("");

const AddToCard = () => {
    const [user, setUser] = useState("Hello Sanjeet");
    
    return (
        <UserContext.Provider value={user}>
            <h1>{`${user}`}</h1>
            <Random />
        </UserContext.Provider>
    );
};

export default AddToCard;
