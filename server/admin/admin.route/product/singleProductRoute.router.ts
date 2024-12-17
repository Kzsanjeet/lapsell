import express from "express";

import authenticate from "../../../middleware/tokenAuth";
import getSingleProduct from "../../admin.controller/prodcuts/singleProduct.controller";
// import searchProducts from "../../../controller/search.controller/search";

const singleProductRouter = express.Router()


singleProductRouter.get("/product/get-single-product/:id", authenticate, getSingleProduct);


export default singleProductRouter