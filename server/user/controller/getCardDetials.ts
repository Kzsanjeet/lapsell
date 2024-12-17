import { Request, Response } from "express";
// import AddToCart from "../model/addToCard";
import mongoose from "mongoose";
import MyCart from "../model/myCart";
import User from "../../admin/admin.schema/adminUser";



const getCardDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.id

    console.log(userId)
    

    // Validate userId
    if (!userId ) {
      res.status(400).json({ success: false, message: "Invalid or missing user ID" });
      return;
    }

    const getUser  = await User.findById(userId)

    console.log(getUser)

    const getCard = await MyCart.find({ user: userId }).populate("product","images name price").select("_id quantity");
    console.log(getCard)
    if (getCard.length === 0) {
      res.status(404).json({
        success: false,
        message: "No products found in the cart",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Fetched cart successfully",
      data: getCard,
    });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getCardDetails;
