"use client";
import { useState } from "react";
import logo from "../public/logo.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-background-100 text-text-900 shadow-md h-20 relative z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Mobile: hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden px-2.5 py-2 text-primary-100"
          aria-label="Toggle menu"
        >
          <svg
            width="18"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Desktop: Logo — left */}
        <div className="hidden md:flex items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Meezan-ul-Quran Logo"
              className="h-30 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Mobile: Donate button */}
        <div className="md:hidden">
          <Link
            href="/donate"
            onClick={closeMobileMenu}
            className="bg-primary-800 font-semibold text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition"
          >
            DONATE
          </Link>
        </div>

        {/* Desktop: Center nav — Home, About, Students, Contact */}
        <ul className="hidden md:flex items-center gap-2 font-medium absolute left-1/2 -translate-x-1/2">
          <li>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg hover:bg-primary-50 hover:text-primary-800 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg hover:bg-primary-50 hover:text-primary-800 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/students"
              className="px-4 py-2 rounded-lg hover:bg-primary-50 hover:text-primary-800 transition"
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg hover:bg-primary-50 hover:text-primary-800 transition"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop: Donate + Enroll — right */}
        <ul className="hidden md:flex items-center gap-3 font-medium">
          <li>
            <Link
              href="/donate"
              className="border border-primary-800 text-primary-900 px-5 py-2 rounded-lg hover:bg-primary-800 hover:text-white transition"
            >
              Donate
            </Link>
          </li>
          <li>
            <Link
              href="/enroll"
              className="bg-primary-800 text-white px-5 py-2 rounded-lg hover:bg-primary-600 transition font-semibold"
            >
              Enroll Student
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-background-50 shadow-lg transition-all duration-300 z-50 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 font-medium">
          <Link href="/">
            <Image
              src={logo}
              alt="Meezan-ul-Quran Logo"
              className="h-30 w-auto object-contain"
            />
          </Link>
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
            href="/students"
            onClick={closeMobileMenu}
            className="hover:text-primary-600 transition"
          >
            Students
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
            className="hover:text-primary-600 transition"
          >
            Donate
          </Link>
          <Link
            href="/enroll"
            onClick={closeMobileMenu}
            className="bg-primary-800 text-white px-10 py-2.5 rounded-lg hover:bg-primary-600 transition font-semibold"
          >
            Enroll Student
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
