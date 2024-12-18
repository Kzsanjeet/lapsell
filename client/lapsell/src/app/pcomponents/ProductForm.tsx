"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from './Loader';


interface myBrands{
  _id: number,
  brandname: string,
}

interface FormData {
  productName: string;
  price: string;
  brand:string;
  description: string;
  computerModel: string;
  processor: string;
  chipset: string;
  height: string;
  width: string;
  depth: string;
  weight: string;
  batteryCapacity: string;
  batteryType: string;
  displaySize: string;
  storage: string;
}

const initialFormData: FormData = {
  productName: '',
  price: '',
  brand:'',
  description: '',
  computerModel: '',
  processor: '',
  chipset: '',
  height: '',
  width: '',
  depth: '',
  weight: '',
  batteryCapacity: '',
  batteryType: '',
  displaySize: '',
  storage: ''
};

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [brands, setBrands] = useState<myBrands[]>([]);
  const [loading, setLoading] = useState(false)
  const [brandname, setBrandname] = useState("")

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setSelectedImage(file);
      // const reader = new FileReader();:

      // Creates a new FileReader instance to read the file data.
      // reader.onloadend = () => { setImagePreview(reader.result as string); };:
      
      // When the file has been read (onloadend), updates the imagePreview state with the file data (as a Base64 string).
      // reader.readAsDataURL(file);:
      
      // Reads the file as a Base64-encoded string, which can be used for previewing the image in the UI.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const getAllBrands = async() =>{
    const getBrand = await fetch("http://localhost:4000/admin/get-all-brands",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      } 
    })
    const brands = await getBrand.json()
    if(brands.success){
      setBrands(brands.getBrands)
    }else{
      console.log(brands.error)
    }
}

const handleBrand = (brandname: string) => {
  setBrandname(brandname);
};

useEffect(()=>{
  getAllBrands()
},[])
 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
  
    const submitData = new FormData();
  
    // Append form fields to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

  
    // Append the selected image to the FormData object
    if (selectedImage) {
      submitData.append('images', selectedImage);
    }

    if(brandname){
      submitData.append('brandname', brandname);
    }
  
    try {
      const response = await fetch("http://localhost:4000/admin/add-product", {
        method: "POST",
        body: submitData, // Use the FormData object here
        // Headers for FormData requests typically exclude "Content-Type"
      });
  
      const data = await response.json();
      console.log(data, "test brand");
  
      // Handle the response
      if (data.success) {
        console.log("Product added successfully!");
        alert("product added successfully")
        toast.success("product added success fully.")
        setFormData(initialFormData);
        setSelectedImage(null);
        setLoading(false)
      } else {
        console.error("Failed to add product:", data.message);
        toast.error("Failes to add products.");
        setLoading(false)
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }finally{
      setLoading(false)
    }
  };




  // to laod the screen
  if(loading) return <Loader/>

  return (

    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form typeof='multipart/form-data' onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <select
                name="brand"
                id="brands"
                className="w-full p-2 border rounded"
                value={formData.brand}
                onChange={handleChange}
              >
                <option value="">Select a brand</option>
                {brands.map((brand, index) => (
                  <option onClick={()=>handleBrand(brand.brandname)} key={index} value={brand._id}>
                    {brand.brandname}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="computerModel">Computer Model</Label>
              <Input
                id="computerModel"
                name="computerModel"
                value={formData.computerModel}
                onChange={handleChange}
                required
              />
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2">
              <Label htmlFor="processor">Processor</Label>
              <Input
                id="processor"
                name="processor"
                value={formData.processor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chipset">Chipset</Label>
              <Input
                id="chipset"
                name="chipset"
                value={formData.chipset}
                onChange={handleChange}
                required
              />
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <Label htmlFor="height">Height (mm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Width (mm)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                value={formData.width}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="depth">Depth (mm)</Label>
              <Input
                id="depth"
                name="depth"
                type="number"
                value={formData.depth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (g)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            {/* Battery */}
            <div className="space-y-2">
              <Label htmlFor="batteryCapacity">Battery Capacity (mAh)</Label>
              <Input
                id="batteryCapacity"
                name="batteryCapacity"
                type="number"
                value={formData.batteryCapacity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batteryType">Battery Type</Label>
              <Input
                id="batteryType"
                name="batteryType"
                value={formData.batteryType}
                onChange={handleChange}
                required
              />
            </div>

            {/* Display and Storage */}
            <div className="space-y-2">
              <Label htmlFor="displaySize">Display Size (inches)</Label>
              <Input
                id="displaySize"
                name="displaySize"
                type="number"
                step="0.1"
                value={formData.displaySize}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage">Storage (GB)</Label>
              <Input
                id="storage"
                name="storage"
                type="number"
                value={formData.storage}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="h-32"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Click to upload image
                </span>
              </label>
             
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full"
          disabled = {loading}
          >
            {loading? "Loading...":"Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;