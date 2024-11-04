import express from "express";
import {loginUser, registerUser} from "../../admin.controller/user/user.controller";
const userRouter = express.Router()

userRouter.route("/admin-register").post(registerUser)
userRouter.route("/admin-login").post(loginUser)

export default userRouter