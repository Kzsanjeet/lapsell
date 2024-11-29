import express from "express";
import multer from "multer";
import {addProduct,getAllProducts, getProductsByBrands, getSingleProduct} from "../../admin.controller/prodcuts/products.controller";
import { addBrands, getAllBrands } from "../../admin.controller/prodcuts/brands";
import filterByBrands from "../../../filter/filterController/brandFilter";

const upload = multer({ storage: multer.diskStorage({}) });
const productRouter = express.Router();

productRouter.route("/admin/add-product").post(upload.array("images", 5), addProduct);//accepts upto 5 photo with field name image.

productRouter.route("/admin/add-brand").post(upload.single("brandlogo"),addBrands)
productRouter.route("/admin/get-all-brands").get(getAllBrands)
productRouter.route("/products/all-products").get(getAllProducts)
productRouter.get("/product/get-single-product/:id", getSingleProduct)
productRouter.route("/brand").get(filterByBrands)
productRouter.route("/get-product-by-brand/:brandId").get(getProductsByBrands)

export default productRouter;

