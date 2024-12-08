import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "../server/admin/dbConnect";
import  productRouter from "./admin/admin.route/product/route";
import userRouter from "./admin/admin.route/user/userRoute";
import { registerRouter } from "./user/route/register.route";
import loginUserRouter from "./user/route/login.route";


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
dbConnection();

app.use(cors({
    origin:"http://localhost:3000",
    methods: ['GET,POST,PUT,DELETE,OPTIONS'], // Specify allowed methods
    credentials: true // Allow sending cookies
}))
app.use(express.json());
app.use(cookieParser());
app.use(productRouter,userRouter,registerRouter,loginUserRouter)   

// app.use(cors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     methods: 'GET,POST,PUT,DELETE,OPTIONS', // Specify allowed methods
//     allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
//     credentials: true // If you’re sending cookies or HTTP-only tokens
//   }));

// Root route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
