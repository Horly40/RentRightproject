export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-lg font-semibold">RentRight</h2>
        <p className="text-gray-400 mt-2">
          Find your next home with ease and confidence.
        </p>

        <div className="mt-4 flex justify-center space-x-6 text-gray-400">
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>

        <p className="mt-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} RentRight. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
