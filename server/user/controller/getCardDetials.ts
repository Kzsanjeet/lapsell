import { Request, Response } from "express";
// import AddToCart from "../model/addToCard";
import mongoose from "mongoose";
import MyCart from "../model/myCart";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const getCardDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;  

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ success: false, message: "Invalid or missing user ID" });
      return;
    }

    const getCard = await MyCart.find({ user: userId })
      .populate("product") // `product` is a reference to the Product model
      // .select("_id name images price") 

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
