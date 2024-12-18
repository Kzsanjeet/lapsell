import express from "express";
;
import authenticate from "../../middleware/tokenAuth";
import {getCardDetails, singleCartItemDetails} from "../controller/getCardDetials";

const getCardRouter = express.Router();

getCardRouter.route("/user-card-details").get(getCardDetails);
getCardRouter.route("/get-single-cart-details/:id/:userId").get(singleCartItemDetails)


export default getCardRouter