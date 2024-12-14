import { Request, Response } from "express";
import RegisterUser from "../model/register";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            res.status(400).json({ success: false, message: "All fields are required" });
            return;
        }

        // Find the user by email
        const user = await RegisterUser.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        // Check the password
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ success: false, message: "Incorrect password" });
            return;
        }

        // Generate access and refresh tokens
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_SECRET_KEY as string,
            { expiresIn: "1h" } // Set token expiration
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_SECRET_KEY as string,
            { expiresIn: "1d" } // Set token expiration
        );

        // Store refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("accessToken", accessToken, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: false, // Allow access from JavaScript
            secure: false, // Set to `true` in production over HTTPS
           // SameSite: "Lax", // Optional, depending on your needs
          });
          
          res.cookie("refreshToken", refreshToken, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: false, // Allow access from JavaScript
            secure: false, // Set to `true` in production over HTTPS
            //SameSite: "Lax", // Optional
          });   
          
        // localStorage.setItem("Token",accessToken)
        // Send response with tokens
        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            data:user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

export default loginUser;
