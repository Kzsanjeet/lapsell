import Brand from "../../admin.schema/brand";
import { Request, Response } from "express";
import { uploadFile } from "../../../utils/cloudinary";

interface MulterRequest extends Request{
    file: Express.Multer.File
}

const addBrands = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        console.log(req.body)
        const { brandname } = req.body;
        const brandlogo = req.file; // Single file upload

        // Input validation
        if (!brandname || (typeof brandname === "string" && brandname.trim() === "")) {
            res.status(400).json({ success: false, message: "Brand name is required" });
            return;
        }

        if (!brandlogo) {
            res.status(400).json({ success: false, message: "Brand logo file is required" });
            return;
        }

        // // Handle both string and array for `brandname`
        // const brandNamesArray = Array.isArray(brandname) ? brandname : [brandname];

        // Upload logo to cloud storage
        const uploadedImage = await uploadFile(brandlogo.path, "lapsellBrands");
        const brandLogoUrl = uploadedImage.url;

        // Create brands
        const createBrands = await Brand.create({
                    brandname,
                    brandlogo: brandLogoUrl,
                });

        // Response
        if (createBrands) {
            res.status(201).json({
                success: true,
                message: "Brands added successfully",
                brands: createBrands,
            });
        } else {
            res.status(500).json({ success: false, message: "Failed to create brands" });
        }
    } catch (error) {
        console.error("Error adding brand:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};


const getAllBrands = async(req:Request,res:Response):Promise<void> =>{
    try {
        const getBrands = await Brand.find({})
        if(!getBrands){
           res.status(404).json({ success: false, message: "Unable to get all the brands"})
           return
        }
        res.status(200).json({success:true, message:"All brands fetched successfully",getBrands})
    } catch (error) {
        console.error("Error fetching all brands:", error);
        res.status(500).json({success:false, message: "Failed to fetch all brands", error: error})
    }
}









export{addBrands,getAllBrands}