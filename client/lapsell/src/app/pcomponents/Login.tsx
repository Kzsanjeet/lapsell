"use client"
import React, { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from "axios";
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"

const Login = () => {

    const [loading,setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async(e:FormEvent) =>{
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:4000/admin-login",{email,password})

            if(!response || !response.data.success){
                toast.error("Invalid credentials, Please, try again");
                setLoading(false)
            }
            else{
                toast.success("Login successfully")
                router.push("/admin")
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4EEFF] p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img src="/images/login.png" alt="Login illustration" className="object-cover w-full h-full" />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-[#F4EEFF]">
          <h1 className="text-2xl font-semibold text-[#424874] mb-6 text-center">Welcome back!</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label className="text-[#424874] mb-2">Enter your email:</label>
              <input type="text"
               placeholder="Email"
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-[#424874]" />
            </div>
            <div className="flex flex-col">
              <label className="text-[#424874] mb-2">Enter your password:</label>
              <input type="password"
               placeholder="Password"
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
               className="p-2 border border-gray-300 rounded focus:outline-none focus:border-[#424874]" />
            </div>
            <div className="mt-6 text-center">
              <Button 
              className="w-full py-2 bg-[#424874] text-white rounded hover:bg-[#333366]0"
              disabled = {loading}   // this means that the button will be unclickable while loading state is true
              type='submit'>
                {loading ? "logging in" : "Logged in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
