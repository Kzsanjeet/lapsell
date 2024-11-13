import express from "express";
import multer from "multer";
import {addBrand, addProduct, getAllBrands} from "../../admin.controller/prodcuts/products.controller";

const upload = multer({ storage: multer.diskStorage({}) });
const productRouter = express.Router();

productRouter.route("/admin/add-product").post(upload.array("images"),addProduct);
productRouter.route("/admin/add-brand").post(addBrand)
productRouter.route("/admin/get-all-brands").get(getAllBrands)

export default productRouter;
