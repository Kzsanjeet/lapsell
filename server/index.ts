import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "../server/admin/dbConnect";
import  productRouter from "./admin/admin.route/product/route";
import userRouter from "./admin/admin.route/user/userRoute";


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
dbConnection();

app.use(express.json());
app.use(cookieParser());
app.use(productRouter)
app.use(userRouter)
app.use(
    cors({
        origin: ["http://localhost:3000"],
        // optionsSuccessStatus: 200, // Uncomment if needed for legacy support
    })
);

// Root route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
