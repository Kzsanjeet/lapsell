import express from "express";
import getCardDetails from "../controller/getCardDetials";
import authenticate from "../../middleware/tokenAuth";

const getCardRouter = express.Router();

getCardRouter.route("/user-card-details").get( getCardDetails);

export default getCardRouter