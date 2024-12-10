import { Request, Response } from "express";
import RegisterUser from "../model/register";

interface AuthenticatedRequest extends Request{
    user?:any;
}

const logoutUser = async(req:AuthenticatedRequest,res:Response):Promise<void> =>{
    try {
        const user = await RegisterUser.findById(req.user.userId);
        if(!user){
            res.status(404).json({sucess:false, message:"Unauthenticated user found"});
            return
        }  
        // Clear the cookie
        res.clearCookie("accessToken", {
          httpOnly: true, // Ensure the cookie is only accessible by the server
          secure:true, // Use HTTPS in production
          sameSite: "strict", // Add CSRF protection
        });
        
        res.status(200).json({success:true,message:"Logged out user successfully."})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:"Some error occures",error:error})
    }
}

export default logoutUser