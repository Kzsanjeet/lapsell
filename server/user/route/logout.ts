import express from "express";
import authenticate from "../../middleware/tokenAuth";
import logoutUser from "../controller/logoutUser";

const logoutRouter = express.Router()

logoutRouter.route("/logout").post(authenticate,logoutUser)

export default logoutRouter