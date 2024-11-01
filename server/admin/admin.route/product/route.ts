import express from "express";
import multer from "multer";
import {addBrand, addProduct} from "../../admin.controller/prodcuts/products.controller";

const upload = multer({ storage: multer.diskStorage({}) });
const productRouter = express.Router();

productRouter.route("/admin/add-product").post(upload.array("images"),addProduct);
productRouter.route("/admin/add-brand").post(addBrand)

export default productRouter;
