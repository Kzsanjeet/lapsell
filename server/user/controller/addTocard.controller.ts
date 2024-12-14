import { Request, Response } from "express";
import MyCart from "../model/myCart";
// import AddToCart from "../model/addToCard";

interface AuthenticatedRequest extends Request {
  user?: { userId: string }; // Define a stricter type for user
}

const addToCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const userId = req.user?.userId;

    // Parse and validate quantity, default to 1 if not provided
    let quantity = Number(req.query.q);
    if (isNaN(quantity) || quantity <= 0) {
      quantity = 1;
    }

    console.log(productId, quantity, userId);

    // Check for missing product ID
    if (!productId) {
      res.status(400).json({ success: false, message: "Product ID is required" });
      return;
    }

    // Check for missing or unauthenticated user
    if (!userId) {
      res.status(401).json({ success: false, message: "User not authenticated" });
      return;
    }

    // Check if product is already in the user's cart
    const existingCartItem = await MyCart.findOne({ user: userId, product: productId });
    console.log(existingCartItem,"test1")
    if (existingCartItem) {
      existingCartItem.quantity = quantity; // Update quantity
      await existingCartItem.save();
      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: existingCartItem,
      });
      return;
    }

    // Add new product to cart
    const addCart = new MyCart({
      user: userId,
      product: productId,
      quantity: quantity,
      });
      await addCart.save();  
    console.log(addCart,"test2")

    // Send success response
    res.status(200).json({
      success: true,
      message: "Added to cart successfully",
      data: addCart,
    });
  } catch (error: any) {
    // Enhanced error handling
    console.error("Error adding to cart:", error);

    const errorMessage =
      error.code === 11000
        ? "This product is already in your cart"
        : error.message || "Something went wrong";

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

export default addToCart;
