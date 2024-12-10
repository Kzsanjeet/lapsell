import express from "express";
import getCardDetails from "../controller/getCardDetials";

const getCardRouter = express.Router();

getCardRouter.route("/card-details/:cardId").get(getCardDetails);

export default getCardRouter