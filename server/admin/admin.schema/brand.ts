import mongoose, {Schema} from "mongoose";

const brandSchema = new Schema({
    brandname: {type:String, required:true},
    brandlogo: {type:String, required:true}
})

 const Brand = mongoose.model("Brand", brandSchema)

 export default Brand;