import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

// Define Zod schema
const productSchema = z.object({
  productName: z.string().nonempty("Product name is required"),
  price: z.preprocess((val) => Number(val), z.number().positive("Price must be a positive number")),
  computerModel: z.string().nonempty("Computer model is required"),
  processor: z.string().nonempty("Processor is required"),
  chipset: z.string().nonempty("Chipset is required"),
  width: z.string().nonempty("Width is required"),
  height: z.string().nonempty("Height is required"),
  depth: z.string().nonempty("Depth is required"),
  weight: z.string().nonempty("Weight is required"),
  batteryCapacity: z.string().nonempty("Battery capacity is required"),
  batteryType: z.string().nonempty("Battery type is required"),
  displaySize: z.string().nonempty("Display size is required"),
  storage: z.string().nonempty("Storage is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  brand: z.string().nonempty("Brand is required"),
  image: z.string().nonempty("Image is required"), // Add validation for image
});

interface myBrands {
  _id: string;
  brandname: string;
}

const AddProducts = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    computerModel: "",
    processor: "",
    chipset: "",
    width: "",
    height: "",
    depth: "",
    weight: "",
    batteryCapacity: "",
    batteryType: "",
    displaySize: "",
    storage: "",
    description: "",
    brand: "",
    image: "" as string | File, // Allow both string and File for image
  });

  const [brands, setBrands] = useState<myBrands[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Set the file object
      }));
    }
  };

  const getBrands = async () => {
    try {
      const fetchBrands = await fetch("http://localhost:4000/admin/get-all-brands", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await fetchBrands.json();
      if (data.success) {
        setBrands(data.getBrands);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const fetchData = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data with Zod
    const result = productSchema.safeParse(formData);

    if (!result.success) {
      // Collect errors
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        validationErrors[err.path[0] as string] = err.message;
      });
      setErrors(validationErrors);
      setLoading(false);
      toast.error("Please fix the errors in the form.");
      return;
    }

    // Create FormData to include image
    const formDataToSend = new FormData();
    for (const key in formData) {
      // Append both strings and files to FormData
      // formDataToSend.append(key, formData[key as keyof typeof formData]);
      formDataToSend.append('image', formData.image); // Append the image file
    }

    try {
      const response = await fetch("http://localhost:4000/admin/add-product", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Product added successfully");
        setFormData({
          productName: "",
          price: "",
          computerModel: "",
          processor: "",
          chipset: "",
          width: "",
          height: "",
          depth: "",
          weight: "",
          batteryCapacity: "",
          batteryType: "",
          displaySize: "",
          storage: "",
          description: "",
          brand: "",
          image: "", // Reset the image field
        });
      } else {
        toast.error("Unable to add the product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-h-screen overflow-auto w-3/5 text-primary flex flex-col justify-start items-center">
        <h1 className="text-3xl font-bold mb-6 flex justify-center sticky">Add your products</h1>
        <div className="bg-secondary p-6 rounded-lg shadow-md w-4/5 mx-auto">
          <form onSubmit={fetchData}>
            {/* Product name */}
            <div className="mb-4">
              <label className="block mb-1">Product Name:</label>
              <Input
                type="text"
                name="productName"
                className="w-full"
                value={formData.productName}
                onChange={handleChange}
              />
              {errors.productName && <p className="text-red-500">{errors.productName}</p>}
            </div>

            {/* Brand */}
            <div className="mb-4">
              <label htmlFor="brands" className="block mb-1">
                Select your brand name:
              </label>
              <select
                name="brand"
                id="brands"
                className="w-full p-2 border rounded"
                value={formData.brand}
                onChange={handleChange}
              >
                <option value="">Select a brand</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand._id}>
                    {brand.brandname}
                  </option>
                ))}
              </select>
              {errors.brand && <p className="text-red-500">{errors.brand}</p>}
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block mb-1">Enter your price:</label>
              <Input
                type="number"
                name="price"
                className="w-full"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>

            {/* Computer Model */}
            <div className="mb-4">
              <label className="block mb-1">Computer Model:</label>
              <Input
                type="text"
                name="computerModel"
                className="w-full"
                value={formData.computerModel}
                onChange={handleChange}
              />
              {errors.computerModel && <p className="text-red-500">{errors.computerModel}</p>}
            </div>

            {/* Processor */}
            <div className="mb-4">
              <label className="block mb-1">Processor:</label>
              <Input
                type="text"
                name="processor"
                className="w-full"
                value={formData.processor}
                onChange={handleChange}
              />
              {errors.processor && <p className="text-red-500">{errors.processor}</p>}
            </div>

            {/* Chipset */}
            <div className="mb-4">
              <label className="block mb-1">Chipset:</label>
              <Input
                type="text"
                name="chipset"
                className="w-full"
                value={formData.chipset}
                onChange={handleChange}
              />
              {errors.chipset && <p className="text-red-500">{errors.chipset}</p>}
            </div>

            {/* Width */}
            <div className="mb-4">
              <label className="block mb-1">Width:</label>
              <Input
                type="text"
                name="width"
                className="w-full"
                value={formData.width}
                onChange={handleChange}
              />
              {errors.width && <p className="text-red-500">{errors.width}</p>}
            </div>

            {/* Height */}
            <div className="mb-4">
              <label className="block mb-1">Height:</label>
              <Input
                type="text"
                name="height"
                className="w-full"
                value={formData.height}
                onChange={handleChange}
              />
              {errors.height && <p className="text-red-500">{errors.height}</p>}
            </div>

            {/* Depth */}
            <div className="mb-4">
              <label className="block mb-1">Depth:</label>
              <Input
                type="text"
                name="depth"
                className="w-full"
                value={formData.depth}
                onChange={handleChange}
              />
              {errors.depth && <p className="text-red-500">{errors.depth}</p>}
            </div>

            {/* Weight */}
            <div className="mb-4">
              <label className="block mb-1">Weight:</label>
              <Input
                type="text"
                name="weight"
                className="w-full"
                value={formData.weight}
                onChange={handleChange}
              />
              {errors.weight && <p className="text-red-500">{errors.weight}</p>}
            </div>

            {/* Battery Capacity */}
            <div className="mb-4">
              <label className="block mb-1">Battery Capacity:</label>
              <Input
                type="text"
                name="batteryCapacity"
                className="w-full"
                value={formData.batteryCapacity}
                onChange={handleChange}
              />
              {errors.batteryCapacity && <p className="text-red-500">{errors.batteryCapacity}</p>}
            </div>

            {/* Battery Type */}
            <div className="mb-4">
              <label className="block mb-1">Battery Type:</label>
              <Input
                type="text"
                name="batteryType"
                className="w-full"
                value={formData.batteryType}
                onChange={handleChange}
              />
              {errors.batteryType && <p className="text-red-500">{errors.batteryType}</p>}
            </div>

            {/* Display Size */}
            <div className="mb-4">
              <label className="block mb-1">Display Size:</label>
              <Input
                type="text"
                name="displaySize"
                className="w-full"
                value={formData.displaySize}
                onChange={handleChange}
              />
              {errors.displaySize && <p className="text-red-500">{errors.displaySize}</p>}
            </div>

            {/* Storage */}
            <div className="mb-4">
              <label className="block mb-1">Storage:</label>
              <Input
                type="text"
                name="storage"
                className="w-full"
                value={formData.storage}
                onChange={handleChange}
              />
              {errors.storage && <p className="text-red-500">{errors.storage}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-1">Description:</label>
              <Textarea
                name="description"
                className="w-full"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block mb-1">Upload Image:</label>
              <Input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded mt-6"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
