import { Schema } from "mongoose"
import mongoose from "mongoose"

const addToCartSchema = new Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        unique:true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true, // Ensures quantity is provided
        min: [1, "Quantity must be at least 1"], // Validation for minimum quantity
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );
  
  // Indexes for faster queries and uniqueness
//   for ensuring the uniqueness of user-product combinations while allowing a user to have multiple products in their cart.
addToCartSchema.index({ user: 1, product: 1 }, { unique: true }); // Ensures each product is unique per user


const AddToCart = mongoose.model("AddToCart", addToCartSchema);

export default AddToCart;