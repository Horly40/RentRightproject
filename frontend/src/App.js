import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import ViewListing from "./pages/ViewListing";
import Messages from "./pages/Messages";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <Router>

        {/* NAVBAR ALWAYS VISIBLE */}
        <Navbar />

        {/* PAGES */}
        <div className="pt-20"> 
          {/* Push content down so navbar doesn't overlap */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/create" element={<CreateListing />} />
            <Route path="/listings/:id" element={<ViewListing />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>

        {/* FOOTER ALWAYS VISIBLE */}
        <Footer />

        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;

