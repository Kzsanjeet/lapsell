import mongoose, {Schema} from "mongoose";

const brandSchema = new Schema({
    brandname: {type:[String], required:true}
})

 const brand = mongoose.model("brand", brandSchema)

 export default brand;