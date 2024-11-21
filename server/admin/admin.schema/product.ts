import mongoose, { Schema } from "mongoose";

// Define product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand"}, // Reference to brand
    brandname:{type:String},
    price: { type: Number, required: true },
    newArrival: { type: Boolean, default: true },   
    images: { type: [String], required: true },  // store in array of strings for the path
    description: { type: String },
    computerModel: { type: String, required: true },
    processor: { type: String, required: true },
    chipset: { type: String, required: true },
    height: { type: String, required: true },
    width: { type: String, required: true },
    depth: { type: String, required: true },
    weight: { type: String, required: true },
    batteryCapacity: { type: String, required: true },
    batteryType: { type: String, required: true },
    displaySize: { type: String, required: true },
    storage: { type: String, required: true },
    
    productViews: {type:Number, default:0}
});

// Create model
const Product = mongoose.model("Product", productSchema);

// Export model
export default Product;
