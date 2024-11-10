import { Input } from '@/components/ui/input';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const AddBrands = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState(['']);

  const addNewBrand = () => {
    setBrands([...brands, '']);
  };

  const handleChange = (index: number, value: string) => {
    const updatedBrands = [...brands];
    updatedBrands[index] = value;
    setBrands(updatedBrands);
  };
  const emptyInputs = () =>{
    setBrands([''])
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    setLoading(true);

    try {   
      if (brands.some((brand) => !brand.trim())) {
        toast.error("Please fill all the required fields");
        setLoading(false); // Stop loading if validation fails
        return;
      }

      const response = await fetch("http://localhost:4000/admin/add-brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brandname: brands })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Brand Added Successfully");
        emptyInputs()
      } else {
        toast.error(data.message);
        setLoading(false); // Stop loading if request is unsuccessful
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
      setLoading(false); // Stop loading if an error is caught
    } finally {
      setLoading(false); // Ensure loading is reset when done
    }
  };

  

  return (
    <div className="flex flex-col justify-center items-center w-full p-6">
      <h1 className="text-primary font-bold text-2xl mb-4">Add Brands</h1>
      <div className="w-2/4">
        <form onSubmit={handleSubmit}>
          {brands.map((brand, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1">{`Enter your Brand name ${index + 1}: `}</label>
              <Input 
                type="text" 
                placeholder="Your brand..." 
                value={brand}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addNewBrand}
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition-all"
          >
            Add New
          </button>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 transition-all"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrands;
