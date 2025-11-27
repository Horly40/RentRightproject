import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/listings");
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Available Properties
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Browse through verified apartments, homes, and rentals
      </p>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center text-lg font-medium text-gray-700">
          Loading listings...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && listings.length === 0 && (
        <div className="text-center text-gray-600 text-lg py-20">
          No listings available yet.
        </div>
      )}

      {/* GRID LISTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={listing.images?.[0] || "https://via.placeholder.com/400"}
              alt="Property"
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 truncate">
                {listing.title}
              </h2>

              <p className="text-gray-700 mt-1">
                {listing.location}
              </p>

              <p className="text-blue-600 font-semibold mt-3 text-lg">
                ₦{listing.price.toLocaleString()}
              </p>

              <Link
                to={`/listings/${listing._id}`}
                className="block mt-4 w-full bg-blue-600 text-center text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
