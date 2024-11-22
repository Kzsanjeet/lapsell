import { Request, Response } from "express";
import Product from "../../admin/admin.schema/product";

const filterByBrands = async (req: Request, res: Response): Promise<void> => {
    try {
        const { brandId} = req.query;
        if (!brandId) {
            res.status(400).json({ success: false, message: "Brand ID is required" });
            return;
        }

        // Find all products where the brand matches the brandId
        const showBrandsProducts = await Product.find({ brand: brandId }).populate("brand");

        if (showBrandsProducts.length === 0) {
            res.status(404).json({ success: false, message: "No products found for this brand" });
            return;
        }

        res.status(200).json({ success: true, data: showBrandsProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export default filterByBrands