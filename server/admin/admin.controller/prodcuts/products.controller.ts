import Product from "../../admin.schema/product";
import { Request, Response } from "express";
import { uploadFile } from "../../../utils/cloudinary";

interface MulterRequest extends Request {
    // file?: Express.Multer.File; // use File for a single file
    files?: Express.Multer.File[]; // use files for a multiple file
}



const addProduct = async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        // console.log(req.body);
        const { productName, price, brand, brandname, description, computerModel, processor, chipset, height, width, depth, weight, batteryCapacity, batteryType, displaySize, storage } = req.body;
        // const images = req.file; // Single file
        const image = req.files //multiple files
        // console.log({ productName, price, brand,brandname, description, computerModel, processor, chipset, height, width, depth, weight, batteryCapacity, batteryType, displaySize, storage })
        if (!productName || !price || !brand || !description || !computerModel || !processor || !chipset || !height || !width || !depth || !weight || !batteryCapacity || !batteryType || !displaySize || !storage) {
            res.status(400).json({ message: "Please fill all the fields correctly" });
            return;
        }

     

        if (!image || image.length === 0) {
            res.status(400).json({ message: "Please upload an image" });
            return;
        }

       
        
        // Upload the file to Cloudinary and get the URL
        // const uploadedImage = await uploadFile(images.path, "lapsell");

        const uploadedImages = await Promise.all(
            image.map((file)=> uploadFile(file.path,"lapsell"))
        )

         // Map Cloudinary responses to just the URLs
         const imageUrls = uploadedImages.map((img) => img.url);

        // Create a new product with the uploaded image URL
        const product = await Product.create({
            name:productName,
            price,
            brand,
            images: imageUrls, // Save image URLs as an array
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
            storage,
        });

        // console.log(product)

        res.status(201).json({ success:true, message: "Product added successfully", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({success:false, message: "Failed to add product", error: error.message });
    }
};

// const addBrand = async (req: MulterRequest, res: Response): Promise<void> => {
//     try {
//         console.log(req.body)
//         const { brandname } = req.body;
//         const {brandlogo} = req.file;
//         if (!brandname) {
//             res.status(400).json({ success:false, message: "Unable to get the brandnames" });
//             return;
//         }
//         if(!brandlogo){
//             res.status(400).json({ success:false, message: "Unable to get the brandlogo"})
//         }

//         const uploadedImage = await uploadFile(brandlogo.path, "lapsellBrands");
//         const brandLogoUrl = uploadedImage.url;

//         const createBrands = []
//         for(const brd of brandname){
//             const brands = await Brand.create({
//                 brandname: brd,
//                 brandlogo: brandLogoUrl
//             })
//             createBrands.push(brands)
//         }
//         if(createBrands.length > 0){
//             res.status(201).json({ success:true, message: "Brand added successfully", brand: createBrands})
//         }
//         else{
//             res.status(404).json({ success:false, message: "Unable to get the brandnames"})
//         }
//         // await brandname.map((brd:string)=>{
//         //     const brands = brand.create({
//         //         brandname: brd
//         //         })

//         //     if(!brands){
//         //         res.status(404).json({ success: false, message: "Unable to create brand" });
//         //         return;
//         //     }
//         //     res.status(200).json({ success: true, message: "Created successfully", brands });
//         // })
//     } catch (error) {
//         console.error("Error adding brand:", error);
//     }
// };


const getAllProducts = async(req:Request,res:Response):Promise<void>=>{
    try {
        const getProducts = await Product.find({}).populate('brand')
        if(!getProducts){
            res.status(404).json({ success: false, message: "Unable to get all the products"})
            return
        }
        res.status(200).json({success:true, message:"All products fetched successfully",data:getProducts})
    } catch (error) {
        console.error("Error fetching all brands:",error);
        res.status(500).json({success:false, message: "Failed to fetch all products",error:error})
    }
}

const getSingleProduct = async(req:Request, res:Response)=>{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
        if(!product){
            res.status(404).json({ success: false, message: "Unable to get the product"})
        }
         product.productViews += 1
         await product.save()   
        res.status(200).json({success:true, message:"Product fetched successfully",data:product})


    } catch (error:any) {
        console.log(error)
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message})
    }
}

export { addProduct,getAllProducts, getSingleProduct};
