import { Request, Response } from "express";
import Product from "../../admin/admin.schema/product";
import sanitize from "mongo-sanitize";

const searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;
        // Validate query parameter
        if (!search || typeof search !== "string") {
            res.status(400).json({ success: false, message: "Search query is required" });
            return;
        }

        // Sanitize input
        const sanitizedSearch = sanitize(search);

        // Find matching products
        const searchProduct = await Product.find({
            $or: [
                { name: { $regex: sanitizedSearch, $options: "i" } },  // option i match the case from the seach input
                { description: { $regex: sanitizedSearch, $options: "i" } },
            ],
        });

        // Handle no results found
        if (searchProduct.length === 0) {
            res.status(404).json({ success: false, message: "No products found" });
            return;
        }

        // Send success response
        res.status(200).json({ success: true, products: searchProduct });
    } catch (error) {
        console.error("Error during product search:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default searchProducts;
