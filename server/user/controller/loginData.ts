import { Response,Request } from "express";
import RegisterUser from "../model/register";

interface AuthenticatedRequest extends Request{
    user?:any;
}   // user is an object it can have any value 
    // it stores  the userId which was genereate at the time of creating token

const getLoginData = async(req:AuthenticatedRequest,res:Response): Promise<void> =>{
    try {
        const user = await RegisterUser.findById(req.user.userId)
        if(!user){
            res.status(404).json({success:false, message:"User not found"})
            return
        }
        res.status(200).json({success:true, message:"User found", user:user})
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
        return
    }
}

export default getLoginData;