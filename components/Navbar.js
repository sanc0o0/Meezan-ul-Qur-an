"use client";
import { useState } from "react";

import logo from "../public/logo.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <nav className="bg-background-100 text-text-900 shadow-md h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
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
              href="/"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="hover:text-primary-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              href="/donate"
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
        className={`md:hidden absolute top-20 left-0 w-full bg-background-50 shadow-lg transition-all duration-300 z-50 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 font-medium">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="hover:text-primary-600 transition"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={closeMobileMenu}
            className="hover:text-primary-600 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="hover:text-primary-600 transition"
          >
            Contact
          </Link>

          <Link
            href="/donate"
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
