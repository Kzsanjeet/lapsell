import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AddProducts = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
    <div className="max-h-screen overflow-auto w-3/5 text-primary flex flex-col justify-start items-center">
    <h1 className="text-3xl font-bold mb-6 flex justify-center sticky">Add your products</h1>

      <div className="bg-secondary p-6 rounded-lg shadow-md w-4/5 mx-auto">
        <form>
          <div className="mb-4">
            <label className="block mb-1">Product Name:</label>
            <Input type="text" name="name" className="w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="brands" className="block mb-1">Select your brand name:</label>
            <select name="brands" id="brands" className="w-full p-2 border rounded">
              <option value="apple">Apple</option>
              <option value="dell">Dell</option>
              <option value="accer">Accer</option>
              <option value="hp">HP</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Enter your price:</label>
            <Input type="number" name="price" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Enter the product photo:</label>
            <Input type="file" name="images" multiple className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Computer Model:</label>
            <Input type="text" name="computerModel" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Processor:</label>
            <Input type="text" name="processor" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Chipset:</label>
            <Input type="text" name="chipset" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Dimensions (HxWxD):</label>
            <div className="flex gap-2">
              <Input type="text" name="height" placeholder="Height" className="w-1/3" />
              <Input type="text" name="width" placeholder="Width" className="w-1/3" />
              <Input type="text" name="depth" placeholder="Depth" className="w-1/3" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Weight:</label>
            <Input type="text" name="weight" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Battery Capacity:</label>
            <Input type="text" name="batteryCapacity" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Battery Type:</label>
            <Input type="text" name="batteryType" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Display Size:</label>
            <Input type="text" name="displaySize" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Storage:</label>
            <Input type="text" name="storage" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Description:</label>
            <Textarea name="description" placeholder="Type product description here." className="w-full" />
          </div>

          <button type="submit" className="w-full bg-primary text-secondary py-2 rounded-lg mt-4">
            Submit Product
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddProducts
