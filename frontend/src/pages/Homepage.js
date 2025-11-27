import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center w-full text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Search thousands of verified apartments across Nigeria
          </p>

          <button
            onClick={() => navigate("/listings")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-semibold shadow-lg transition"
          >
            Browse Listings
          </button>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "Flats",
              img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
            },
            {
              label: "Self Contain",
              img: "https://images.unsplash.com/photo-1600585154154-98d5a9b9269d?w=600&q=80",
            },
            {
              label: "Duplex",
              img: "https://images.unsplash.com/photo-1600585154084-2de7e1b3c8c8?w=600&q=80",
            },
            {
              label: "Studio",
              img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="cursor-pointer bg-white rounded-xl overflow-hidden shadow hover:scale-105 transition"
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-32 object-cover"
              />
              <div className="p-3 text-center font-semibold">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED LISTINGS */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Featured Listings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  className="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
                  alt="Listing"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Luxury Apartment</h3>
                  <p className="text-gray-600">Lagos, Nigeria</p>
                  <p className="mt-2 font-semibold text-blue-600">
                    ₦500,000 / year
                  </p>

                  <button
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    onClick={() => navigate("/listings")}
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}


