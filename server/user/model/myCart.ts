import { Mongoose, Schema } from "mongoose";
import mongoose  from "mongoose";

const myCart = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "RegisterUser",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required: true
        },
        quantity: {
            type: Number,
            default: 1
            }
})

const MyCart = mongoose.model("MyCart", myCart)

export default MyCart