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

        // Check if brandname is provided and is an array
        if (!brandname || !Array.isArray(brandname) || brandname.length === 0) {
            res.status(400).json({ message: "Please provide valid brand names." });
            return;
        }
        
        for(const brd in brandname){
            const brands = await brand.create({brandname:brd})
        }
        
        res.status(200).json(sccucess:true,messaege:"Successful",brands)

    } catch (error) {
        console.error("Error adding brand:", error);
    }
};

export { addProduct, addBrand };
