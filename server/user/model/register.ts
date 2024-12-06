import mongoose from "mongoose"

const registerSchema = new mongoose.Schema({
    fullname: { type:String, required:true},
    email: {type:String, required:true},
    number:{type:String, required:true},
    password: {type:String, required:true},
    refreshToken :{type:String, default:""}
})

const RegisterUser = mongoose.model("RegisterUser", registerSchema)

export default RegisterUser