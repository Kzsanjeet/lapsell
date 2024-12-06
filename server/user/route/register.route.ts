import express from "express";
import { registerUser } from "../controller/register.controller";

const registerRouter = express.Router()

registerRouter.route("/user-register").post(registerUser)

export {registerRouter}