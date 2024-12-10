import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


interface AuthenticatedRequest extends Request{
    user?:any;
}

const authenticate = (req:AuthenticatedRequest, res:Response, next:NextFunction): Promise <void>=>{
    try {
        const cookies = req.cookies.accessToken;
        if(!cookies) 
            res.status(404).json({success:false, message:"Unable to get token"});
        
        const decode = jwt.verify(cookies,process.env.ACCESS_SECRET_KEY as string)
        if(!decode){
             res.status(404).json({success:false, message:"Unauthorized"})
             return
        }

        req.user = decode;
        next();
    } catch (error) {
        console.log("Token verification error: ",error);
        res.status(400).json({success:false, message:"Invalid or expired token"})
        return
    }
}

export default authenticate