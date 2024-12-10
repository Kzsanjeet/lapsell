"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfilePic from "./ProfilePic";
import { RiLogoutBoxRLine } from "react-icons/ri";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { headers } from "next/headers";
import { UserContext } from "@/provider/SignUpContext";


interface User {
  fullname: string;
  email: string;
  number: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null); // Expect a single user object
  const [loading, setLoading] = useState<boolean>(true);
  const {isLoggedIn,setIsLoggedIn} = useContext(UserContext)!

  const getLoginUser = async () => {
    try {
      const response = await fetch("http://localhost:4000/user-profile", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setUser(data.user); 
      } else {
        toast.error("Unable to get the logged-in user data.");
      }
    } catch (error) {
      // console.error(error);
      toast.error("Server error while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Perform any additional logout cleanup
        setIsLoggedIn(false)
        toast.success("Logout successfull")
        console.log("Logged out successfully.");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  useEffect(() => {
    getLoginUser(); // Fetch user data when component mounts
  }, []);

  if (loading) {
    return <Loader/>; // Show a loading state while fetching data
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ProfilePic />
        </DropdownMenuTrigger>
        {user ? (
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{user.fullname}</DropdownMenuItem>
            <DropdownMenuItem>{user.email}</DropdownMenuItem>
            <DropdownMenuItem>{user.number}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout <span><RiLogoutBoxRLine /></span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuLabel>No User Data</DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

export default Profile;
