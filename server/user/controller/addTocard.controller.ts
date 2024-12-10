import { Request, Response } from "express";
import AddToCart from "../model/addToCard";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const addToCard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const { quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400).json({ success: false, message: "Both product ID and quantity are required" });
      return;
    }

    const userId = req.user?.userId; 

    if (!userId) {
      res.status(401).json({ success: false, message: "User not authenticated" });
      return;
    }

    const addCard = await AddToCart.create({
      user: userId,
      product: productId,
      quantity: quantity,
    });

    res.status(200).json({ success: true, message: "Added to cart successfully", data: addCard });
    
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate product-user combination
      res.status(400).json({ success: false, message: "This product is already in your cart" });
    } else {
      console.error("Error adding to cart:", error);
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  }
};

export default addToCard;
