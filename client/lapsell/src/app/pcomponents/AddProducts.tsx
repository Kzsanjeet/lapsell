import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface myBrands {
  _id: string
  brandname: string
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
  });

  const [brands, setBrands] = useState<myBrands[]>([])

  const[loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getBrands = async() =>{
    try {
      const fetchBrands = await fetch("http://localhost:4000/admin/get-all-brands",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          },
      })
      const data = await fetchBrands.json()
      // console.log(data)
      if(data.success){
        setBrands(data.getBrands)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getBrands()
  },[])

  // console.log("test",brands)


  const fetchData = async(e:FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    console.log(formData)
    try {
      const response = await fetch("http://localhost:4000/admin/add-product",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log(data)
      if(data.success){
        alert("Product Added Successfully")
        toast.success("Product added succesfully")
        setLoading(false)
      }else{
        alert("Failed to add product")
        toast.error("Unable to add the product.")
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      toast.error("Sth went wrong")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="max-h-screen overflow-auto w-3/5 text-primary flex flex-col justify-start items-center">
        <h1 className="text-3xl font-bold mb-6 flex justify-center sticky">Add your products</h1>

        <div className="bg-secondary p-6 rounded-lg shadow-md w-4/5 mx-auto">
          <form onSubmit={fetchData}>
            <div className="mb-4">
              <label className="block mb-1">Product Name:</label>
              <Input type="text" name="productName" className="w-full" value={formData.productName} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="brands" className="block mb-1">Select your brand name:</label>
              <select name="brand" id="brands" className="w-full p-2 border rounded"  value={formData.brand}
                onChange={handleChange} >
                {brands.map((brand, index) => (
                  <option key={index} value={brand._id} >{brand.brandname}</option>
                )
                )}
                
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Enter your price:</label>
              <Input type="number" name="price" className="w-full" value={formData.price} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Enter the product photo:</label>
              <Input type="file" name="images" multiple className="w-full" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Computer Model:</label>
              <Input type="text" name="computerModel" className="w-full" value={formData.computerModel} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Processor:</label>
              <Input type="text" name="processor" className="w-full" value={formData.processor} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Chipset:</label>
              <Input type="text" name="chipset" className="w-full" value={formData.chipset} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Dimensions (HxWxD):</label>
              <div className="flex gap-2">
                <Input type="text" name="height" placeholder="Height" className="w-1/3" value={formData.height} onChange={handleChange} />
                <Input type="text" name="width" placeholder="Width" className="w-1/3" value={formData.width} onChange={handleChange} />
                <Input type="text" name="depth" placeholder="Depth" className="w-1/3" value={formData.depth} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Weight:</label>
              <Input type="text" name="weight" className="w-full" value={formData.weight} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Battery Capacity:</label>
              <Input type="text" name="batteryCapacity" className="w-full" value={formData.batteryCapacity} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Battery Type:</label>
              <Input type="text" name="batteryType" className="w-full" value={formData.batteryType} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Display Size:</label>
              <Input type="text" name="displaySize" className="w-full" value={formData.displaySize} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Storage:</label>
              <Input type="text" name="storage" className="w-full" value={formData.storage} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Description:</label>
              <Textarea name="description" placeholder="Type product description here." className="w-full" value={formData.description} onChange={handleChange} />
            </div>

            <button type="submit" className="w-full bg-primary text-secondary py-2 rounded-lg mt-4">
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
