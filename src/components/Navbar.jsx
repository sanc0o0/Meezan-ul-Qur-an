import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <nav className="bg-background-100 text-text-900 shadow-md h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/home">
            <img
              src={logo}
              alt="Meezan-ul-Quran Logo"
              className="h-30 w-auto object-contain"
            />
          </Link>
        </div>
        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <Link
              to="/home"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contactus"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/donate"
              className="bg-primary-800 text-white px-5 py-2 rounded-lg hover:bg-primary-600 transition duration-200"
            >
              DONATE
            </Link>
          </li>
        </ul>
        {/* Mobile Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden px-3 py-2 text-primary-100 text-1.5xl"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-background-100 shadow-lg transition-all duration-300 z-50 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 font-medium">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="hover:text-primary-600 transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={closeMobileMenu}
            className="hover:text-primary-600 transition"
          >
            About
          </Link>

          <Link
            to="/contactus"
            onClick={closeMobileMenu}
            className="hover:text-primary-600 transition"
          >
            Contact
          </Link>

          <Link
            to="/donate"
            onClick={closeMobileMenu}
            className="bg-primary-800 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition"
          >
            DONATE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
