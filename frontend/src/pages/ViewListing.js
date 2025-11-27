import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewListing() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/listings/${id}`);
      setListing(res.data);
    } catch (err) {
      console.error("Error fetching listing:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading property...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Listing not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* HERO IMAGE */}
      <div className="w-full h-[60vh]">
        <img
          src={listing.images?.[0] || "https://via.placeholder.com/1000"}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-10">

        {/* TITLE + PRICE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
            <p className="text-gray-600 mt-1 text-lg">{listing.location}</p>
          </div>

          <div className="text-blue-600 text-2xl font-bold mt-4 md:mt-0">
            ₦{listing.price.toLocaleString()}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </div>

        {/* FEATURES */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold">Bedrooms:</p>
              <p className="text-gray-700">{listing.bedrooms || "N/A"}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold">Bathrooms:</p>
              <p className="text-gray-700">{listing.bathrooms || "N/A"}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold">Category:</p>
              <p className="text-gray-700">{listing.category || "N/A"}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold">Size:</p>
              <p className="text-gray-700">{listing.size || "Not Specified"}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-semibold">Year Built:</p>
              <p className="text-gray-700">{listing.year || "Unknown"}</p>
            </div>
          </div>
        </div>

        {/* CONTACT BUTTON */}
        <div className="mt-12">
          <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg shadow transition">
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
}
