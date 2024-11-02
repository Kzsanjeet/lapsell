import Product from "../../admin.schema/product";
import { Request, Response } from "express";
import { uploadFile } from "../../../utils/cloudinary";
import brand from "../../admin.schema/brand";

interface MulterRequest extends Request {
    // file?: Express.Multer.File; // use File for a single file
    files?: Express.Multer.File[]; // use files for a multiple file
}

const addProduct = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const { name, price, brandname, description, computerModel, processor, chipset, height, width, depth, weight, batteryCapacity, batteryType, displaySize, storage } = req.body;
        // const images = req.file; // Single file
        const images = req.files //multiple files

        if (!name || !price || !brandname || !description || !computerModel || !processor || !chipset || !height || !width || !depth || !weight || !batteryCapacity || !batteryType || !displaySize || !storage) {
            res.status(400).json({ message: "Please fill all the fields correctly" });
            return;
        }

        if (!images || images.length === 0) {
            res.status(400).json({ message: "Please upload an image" });
            return;
        }

        
        // Upload the file to Cloudinary and get the URL
        // const uploadedImage = await uploadFile(images.path, "lapsell");

        const uploadedImages = await Promise.all(
            images.map((file)=> uploadFile(file.path,"lapsell"))
        )

         // Map Cloudinary responses to just the URLs
         const imageUrls = uploadedImages.map((img) => img.url);

        // Create a new product with the uploaded image URL
        const product = await Product.create({
            name,
            price,
            brandname,
            images: imageUrls, // Store the image URL in an array
            description,
            computerModel,
            processor,
            chipset,
            height,
            width,
            depth,
            weight,
            batteryCapacity,
            batteryType,
            displaySize,
            storage
        });

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};

const addBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { brandname } = req.body;
        if (!brandname) {
            res.status(400).json({ message: "Please fill all the fields correctly" });
            return;
        }
        const brands = await brand.create({ brandname });
        if (!brands) {
            res.status(404).json({ success: false, message: "Unable to create brand" });
            return;
        }
        res.status(200).json({ success: true, message: "Created successfully", brands });
    } catch (error) {
        console.error("Error adding brand:", error);
    }
};

export { addProduct, addBrand };
