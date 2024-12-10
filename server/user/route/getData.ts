import authenticate from "../../middleware/tokenAuth";
import getLoginData from "../controller/loginData";
import express from "express";

const loginDataRouter = express.Router();

loginDataRouter.get("/user-profile", authenticate, getLoginData);

export default loginDataRouter;
