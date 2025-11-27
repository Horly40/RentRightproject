import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/listings/${id}`);
        const data = res.data;

        setFormData({
          title: data.title,
          price: data.price,
          location: data.location,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          category: data.category,
          description: data.description,
          images: [],
        });

        setImagesPreview(data.images || []);
        setLoading(false);

      } catch (err) {
        toast.error("Failed to fetch listing.");
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({...formData, images: files });

    setImagesPreview(files.map(file => URL.createObjectURL(file)));
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

      await axios.put(`http://localhost:4000/api/listings/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Listing updated!");
      navigate(`/listings/${id}`);

    } catch (err) {
      toast.error("Failed to update listing.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Listing</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-xl space-y-6">

        {/* TITLE */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block font-semibold mb-1">Price (₦)</label>
          <input
            type="number"
            name="price"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border rounded-lg px-4 py-2"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        {/* GRID FOR BEDROOMS, BATHROOMS, CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className="block font-semibold mb-1">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              className="w-full border rounded-lg px-4 py-2"
              value={formData.bedrooms}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              className="w-full border rounded-lg px-4 py-2"
              value={formData.bathrooms}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              className="w-full border rounded-lg px-4 py-2"
              value={formData.category}
              onChange={handleChange}
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
            className="w-full border rounded-lg px-4 py-2 h-32"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* IMAGES */}
        <div>
          <label className="block font-semibold mb-1">Upload New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* IMAGE PREVIEW */}
        <div className="grid grid-cols-3 gap-3">
          {imagesPreview.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full h-32 object-cover rounded-md"
              alt="preview"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}
