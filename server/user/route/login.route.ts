import express from "express";
import loginUser from "../controller/login.controller";

const loginUserRouter = express.Router()

loginUserRouter.route("/user-login").post(loginUser)

export default loginUserRouter