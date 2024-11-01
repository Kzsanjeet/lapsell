import Product from "../../admin.schema/product";
import { Request, Response } from "express";
import { uploadFile } from "../../../utils/cloudinary";
import brand from "../../admin.schema/brand";

interface MulterRequest extends Request {
    files?: Express.Multer.File[]; // use File[] for multiple files, File for a single file
}

const addProduct = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        console.log(req.body)
        const { name,price,brand, description } = req.body;
        const images = req.files;

        if (!name || !price || !brand || !description) {
            res.status(400).json({ message: "Please fill all the fields correctly" });
            return; // Ensure we return here to avoid further execution
        }

        if (!images || images.length === 0) {
            res.status(400).json({ message: "Please upload images" });
            return; // Ensure we return here to avoid further execution
        }

        // Upload each file to Cloudinary and save the URLs
        const uploadedImages = await Promise.all(
            images.map((file) => uploadFile(file.path, "lapsell"))
        );

        // Create a new product with the uploaded image URLs
        const product = await Product.create({
            name,
            price,
            brand,
            images: uploadedImages, // Store all image URLs
            description,
        });

        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};

const addBrand = async(req:Request,res:Response)=>{
    try {
        const {brandname} = req.body;
        if(!brandname){
            res.status(400).json({message:"Please fill all the fields correctly"});
        }
        const brands = await brand.create({brandname});
        if(!brands){
            res.status(404).json({success:false, message:"unable to create brand"})
        }
        res.status(200).json({success:true,message:"created successfully",brands})
    } catch (error) {
        console.error("Error adding brand:", error);
    }
}

export {addProduct,addBrand};
