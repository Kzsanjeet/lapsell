import { Request, Response } from "express";
import AddToCart from "../model/addToCard";
import mongoose from "mongoose";

const getCardDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const cardId = req.params.cardId;

    // Validate cardId
    if (!cardId || !mongoose.Types.ObjectId.isValid(cardId)) {
      res.status(400).json({ success: false, message: "Invalid or missing card ID" });
      return;
    }

    const getCard = await AddToCart.findById(cardId)
      .populate("user") 
      .populate("product"); 

    if (!getCard) {
      res.status(404).json({
        success: false,
        message: "Card not found or unable to fetch details",
      });
      return;
    }

    // Return the populated card details
    res.status(200).json({
      success: true,
      message: "Fetched card successfully",
      data: getCard,
    });
  } catch (error) {
    console.error("Error fetching card details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getCardDetails;
