import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    category: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((img) => form.append("images", img));
        } else {
          form.append(key, formData[key]);
        }
      });

      await axios.post("http://localhost:4000/api/listings", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Listing created successfully!");
      navigate("/listings");

    } catch (err) {
      console.error(err);
      toast.error("Failed to create listing");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Listing</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-xl space-y-6">

        {/* TITLE */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Luxury 3-bedroom apartment"
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block font-semibold mb-1">Price (₦)</label>
          <input
            type="number"
            name="price"
            placeholder="e.g. 500000"
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Lekki Phase 1, Lagos"
            className="w-full border rounded-lg px-4 py-2"
            onChange={handleChange}
            required
          />
        </div>

        {/* GRID FOR BEDROOMS, BATHROOMS, CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block font-semibold mb-1">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              placeholder="3"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              placeholder="2"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              className="w-full border rounded-lg px-4 py-2"
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Flat">Flat</option>
              <option value="Self Contain">Self Contain</option>
              <option value="Duplex">Duplex</option>
              <option value="Studio">Studio</option>
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter detailed description..."
            className="w-full border rounded-lg px-4 py-2 h-32"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* IMAGES */}
        <div>
          <label className="block font-semibold mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full"
            onChange={handleImageUpload}
          />
          <p className="text-sm text-gray-600 mt-1">You can upload multiple images.</p>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}
