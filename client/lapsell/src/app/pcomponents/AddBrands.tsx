import { Input } from '@/components/ui/input';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const AddBrands = () => {
  const [loading, setLoading] = useState(false);
  const [brandname, setBrandname] = useState('');
  const [brandlogo, setBrandlogo] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Safely extract the first file
    setBrandlogo(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append('brandname', brandname);

    if (brandlogo) {
      submitData.append('brandlogo', brandlogo); 
    }

    try {
      const response = await fetch('http://localhost:4000/admin/add-brand', {
        method: 'POST',
        body: submitData, // Pass FormData directly
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Brand Added Successfully');
        setBrandname(''); // Reset the brand name field
        setBrandlogo(null); // Reset the file input
      } else {
        toast.error(data.message || 'Failed to add brand');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-6">
      <h1 className="text-primary font-bold text-2xl mb-4">Add Brands</h1>
      <div className="w-2/4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Enter your Brand name:</label>
            <Input
              type="text"
              name="brandname"
              placeholder="Your brand..."
              value={brandname}
              onChange={(e) => setBrandname(e.target.value)}
            />
            <label htmlFor="brandlogo" className="block mt-2">
              Choose a brand logo:
            </label>
            <input
              type="file"
              id="brandlogo"
              name="brandlogo"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 transition-all"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrands;
