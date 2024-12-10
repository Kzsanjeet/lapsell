import express from "express";
import addToCard from "../controller/addTocard.controller";
import authenticate from "../../middleware/tokenAuth";

const addCardRouter = express.Router();

addCardRouter.route("/add-card/:productId").post(authenticate,addToCard)

export default addCardRouter
