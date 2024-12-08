import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import ProfilePic from './ProfilePic'
import { RiLogoutBoxRLine } from "react-icons/ri";
  


const Profile = () => {
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger><ProfilePic/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Sanjeet Kazi Thapa</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Orders</DropdownMenuItem>
                <DropdownMenuItem>My reviews</DropdownMenuItem>
                <DropdownMenuItem>Change Password</DropdownMenuItem>
                <DropdownMenuItem>Logout <span><RiLogoutBoxRLine /></span> </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
  )
}

export default Profile
