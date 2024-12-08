"use client"
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface contextProps{
    isLoggedIn:boolean
    setIsLoggedIn:Dispatch<SetStateAction<boolean>>
}
export const UserContext = createContext<contextProps|null>(null)

const SignUpContext = ({children}:{children:ReactNode|ReactNode[]}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  return (
    <UserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  )
}

export default SignUpContext
