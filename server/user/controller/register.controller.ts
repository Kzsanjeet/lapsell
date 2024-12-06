import { Request, Response } from "express";
import RegisterUser from "../model/register";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullname, email, number, password } = req.body;

        // Check if all required fields are provided
        if (!fullname || !email || !number || !password) {
            res.status(400).json({
                success: false,
                message: "All fields (fullname, email, number, password) are required",
            });
            return;
        }

        // Check if the user already exists
        const existingUser = await RegisterUser.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User already exists with this email",
            });
            return;
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt); 

        // Create the user
        const register = await RegisterUser.create({
            fullname,
            email,
            number,
            password: hashedPassword,
        });

        if (!register) {
            res.status(500).json({
                success: false,
                message: "Failed to register user",
            });
            return;
        }

        // Send success response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: register,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the user",
            error: error.message || error,
        });
    }
};

export { registerUser };
