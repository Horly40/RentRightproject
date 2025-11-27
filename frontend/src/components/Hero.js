export default function Hero() {
  return (
    <section className="w-full h-[90vh] bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center relative overflow-hidden">

      {/* Background decorative circles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-72 h-72 bg-white rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-indigo-300 rounded-full blur-3xl bottom-10 right-10"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Find Your Perfect Home <br />
          With <span className="text-yellow-300">RentRight</span>
        </h1>

        <p className="mt-5 text-lg md:text-xl max-w-xl text-gray-200">
          Search thousands of verified apartments and houses across Lagos.  
          Trusted, secure, and stress-free renting — the way it should be.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-8 bg-white rounded-xl flex items-center p-2 shadow-xl max-w-xl">
          <input
            type="text"
            placeholder="Search for city, area, or property type..."
            className="w-full px-4 py-3 rounded-xl text-gray-700 outline-none"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
