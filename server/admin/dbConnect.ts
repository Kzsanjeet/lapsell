import mongoose from "mongoose";

async function dbConnection() {
    try {
        await mongoose.connect(process.env.CONNECT_URI as string);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

export default dbConnection;
