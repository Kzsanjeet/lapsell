import { Request, Response } from "express";
// import AddToCart from "../model/addToCard";
import mongoose from "mongoose";
import MyCart from "../model/myCart";
import User from "../../admin/admin.schema/adminUser";


//old
// const getCardDetails = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.query.id
//     // Validate userId
//     if (!userId ) {
//       res.status(400).json({ success: false, message: "Invalid or missing user ID" });
//       return;
//     }

//     const getCard = await MyCart.find({ user: userId }).populate("product","images name price").select("_id quantity");
//     // console.log(getCard)
//     if (getCard.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "No products found in the cart",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       message: "Fetched cart successfully",
//       data: getCard,
//     });
//   } catch (error) {
//     console.error("Error fetching cart details:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


//updated new


const getCardDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.id as string;

    // Validate userId
    if (!userId) {
      res.status(400).json({ success: false, message: "Invalid or missing user ID" });
      return;
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Use aggregate to fetch cart items and calculate total price
    const getCard = await MyCart.aggregate([
      {
        $match: { user: userObjectId }, // Match the user ID as ObjectId
      },
      {
        $lookup: { 
          from: "products", // The name of the products collection
          localField: "product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Flatten the productDetails array
      },
      {
        $project: {
          _id: 1,
          quantity: 1,
          productImage: "$productDetails.images",
          productName: "$productDetails.name",
          productPrice: "$productDetails.price",
          totalPrice: { $multiply: ["$quantity", "$productDetails.price"] },
        },
      },
      {
        $group: {
          _id: null,
          items: { $push: "$$ROOT" }, // Collect all items
          totalCartPrice: { $sum: "$totalPrice" }, // Sum total prices of all items
        },
      },
    ]);

    if (!getCard || getCard.length === 0) {
      res.status(404).json({
        success: false,
        message: "No products found in the cart",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Fetched cart successfully",
      data: getCard[0].items, // Items in the cart
      totalCartPrice: getCard[0].totalCartPrice, // Total cart price
    });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const singleCartItemDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const userId = req.params.userId
  
    if (!productId) {
      res.status(400).json({ success: false, message: "Invalid or missing product ID" });
      return
    }

   

    

    // Validate user ID
    if (!userId) {
      res.status(400).json({ success: false, message: "Invalid or missing user ID" });
      return
    }

    // Fetch cart details
    const getCart = await MyCart.findOne({ user: userId, product: productId });

 

    // Response
    if (!getCart) {
      res.status(404).json({
        success: false,
        message: "Cart item not found for the given product and user",
      });
      return
    }

    res.status(200).json({ success: true, data: getCart });
  } catch (error) {
    console.error("Error fetching cart item details:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product details.",
    });
  }
};


export  {getCardDetails, singleCartItemDetails}
