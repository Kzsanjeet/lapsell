import mongoose, {Schema} from "mongoose";


// we can also do it in this way if we only import mongoose
// const users = new mongoose.Schema({

// })

const userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    number:{type:String, required:true},
    password: {type:String, required:true},
    refreshToken: {type:String, default:""}
})

const User = mongoose.model("User", userSchema)

// we can also do it in this way if we only import mongoose
// const User = mongoose.model("User", new mongoose.Schema({
//     name: {type:String, required:true},
//     email: {type:String, required:true, unique:true},
//     number:{type:String, required:true},
//     password: {type:String, required:true},
// }))

export default User