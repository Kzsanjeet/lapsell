"use client"
import React, { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    // Check for empty fields before making the request
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
    //   const response = await axios.post("http://localhost:4000/admin-login", 
    //     { email, password },
    //     { withCredentials: true }  // Important for cookies or session handling
    // );

    const response = await fetch("http://localhost:4000/admin-login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        //credentials: "include"  // allow cookies to be sent with request.
    })

    const data = await response.json()
    console.log(data)

    if (data.success) {
      alert("login successfull")
      toast.success("Login successful");
      setTimeout((): void => {
        router.push("/admin");
      }, 2000);
    } else {
      toast.error("Invalid credentials, please try again");
      setLoading(false);
    }
    
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

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
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-[#424874]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#424874] mb-2">Enter your password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-[#424874]"
              />
            </div>
            <div className="mt-6 text-center">
              <Button
                className="w-full py-2 bg-[#424874] text-white rounded hover:bg-[#333366]"
                disabled={loading}
                type="submit"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// "use client"
// import React, { FormEvent, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:4000/admin-login", { email, password });

//       if (response.data.success) {
//         toast.success("Login successful!");
//         setTimeout((): void => {
//           router.push("/admin");
//         }, 2000);
//       } else {
//         toast.error("Invalid credentials, please try again");
//       }
//     } catch (error) {
//       toast.error("An error occurred while logging in");
//       console.error("Login error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F4EEFF] p-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-2xl font-semibold text-[#424874] mb-6 text-center">Login</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="text-[#424874] mb-2 block">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#424874]"
//               required
//             />
//           </div>
//           <div>
//             <label className="text-[#424874] mb-2 block">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#424874]"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-[#424874] text-white rounded hover:bg-[#333366]"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

