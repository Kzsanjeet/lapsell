import User from "../../admin.schema/adminUser";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, number, password } = req.body;

        if (!name || !email || !number || !password) {
            res.status(404).json({ success: false, message: "All fields are required" });
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const createUser = await User.create({
            name,
            email,
            number,
            password: hashedPassword,
        });

        if (!createUser) {
            res.status(404).json({ success: false, message: "Unable to create user" });
            return;
        }

        res.status(200).json({ success: true, message: "User created successfully", createUser });

    } catch (error: any) {
        console.error("Error during user registration:", error);
        res.status(400).json({ success: false, message: error.message || "An error occurred during user registration" });
    }
};

const loginUser = async(req:Request,res:Response): Promise<void> =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(404).json({success:false,message:"Email and password are required"});
            return
        }

        const login = await User.findOne({email:email})
        if(!login){
            res.status(404).json({success:false,message:"User not found"})
            return 
            }
        const isValidPassword = bcrypt.compareSync(password,login.password);
        if(!isValidPassword){
            res.status(404).json({success:false,message:"Invalid password"})
            return
        }

        const refreshToken  = jwt.sign({userId: login.id}, process.env.REFRESH_SECRET_KEY as string)
        const accessToken = jwt.sign({userId:login.id}, process.env.ACCESS_SECRET_KEY as string)

        if (accessToken && refreshToken) {
            const oneHourInMillis = 60 * 60 * 1000;
            const oneDayInMillis = 24 * 60 * 60 * 1000;
    
            res.cookie("accessToken", accessToken, {
              httpOnly: true,
              secure: true,
              maxAge: oneHourInMillis,
            });
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true,
              maxAge: oneDayInMillis,
            });

            // Set refresh token in user's record
            login.refreshToken = refreshToken; // Assuming the User schema has a 'refreshToken' field
            await login.save()
            
            res
              .status(200)
              .json({ success: true, message: "Login successful", accessToken, refreshToken });
          }

    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:error})
    }
}

export {registerUser,loginUser};
