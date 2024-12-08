import { Request, Response } from "express";
import Product from "../../admin/admin.schema/product";
import mongoose from "mongoose";

const getProductWithSimilar = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;

        // Validate productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            res.status(400).json({ success: false, message: "Invalid Product ID" });
            return;
        }

        // Fetch the single product
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }

        // Fetch similar products
        const similarProducts = await Product.find({
            brandname: product.brandname,
            _id: { $ne: productId },
        })
        .limit(5);

        if (similarProducts.length === 0) {
            res.status(200).json({
                success: true,
                message: "No similar products found",
                data: [],
            });
            return;
        }

        // Respond with similar products
        res.status(200).json({
            success: true,
            message: "Similar products fetched successfully",
            data: similarProducts,
        });
    } catch (error) {
        console.error("Error fetching product and similar products:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export default getProductWithSimilar;
