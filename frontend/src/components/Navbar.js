import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Change navbar background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          RentRight
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            Home
          </Link>

          <Link
            to="/listings"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            Listings
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            Contact
          </Link>

          {/* AUTH BUTTONS */}
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 text-lg"
          >
            Home
          </Link>

          <Link
            to="/listings"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 text-lg"
          >
            Listings
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 text-lg"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 text-lg"
          >
            Contact
          </Link>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block text-blue-600 font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block bg-blue-600 text-white py-2 text-center rounded"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
