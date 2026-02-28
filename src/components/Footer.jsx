import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-background-100 text-text-800 mt-20 overflow-hidden flex flex-col relative  bottom-0 left-0 w-full">
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-start gap-25">
          <div className="flex flex-col items-start gap-0">
            <Link to="/home">
              <img
                src={logo}
                alt="Meezan-ul-Quran Logo"
                className="h-30 w-auto object-contain"
              />
            </Link>

            <p className="text-text-600 max-w-sm leading-relaxed">
              A platform dedicated to understanding the Qur’an with clarity,
              depth and balance.
            </p>
          </div>

          <p className="text-sm text-text-500">
            © 2024 Meezan-ul-Quran. All rights reserved.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col md:flex-row gap-16">
          {/* Sitemap */}
          <div>
            <h3 className="font-semibold mb-4 text-text-900">Sitemap</h3>
            <ul className="space-y-2 text-text-600">
              <li className="hover:text-primary-600 transition">About</li>
              <li className="hover:text-primary-600 transition">Blog</li>
              <li className="hover:text-primary-600 transition">Contribute</li>
              <li className="hover:text-primary-600 transition">Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-text-900">Contact</h3>
            <p className="text-text-600">Send me an email</p>
            <p className="text-primary-600 mt-2">abulkalam.mumbai@gmail.com</p>
          </div>
        </div>
      </div>

      {/* ================= BIG BACKGROUND TEXT ================= */}
      <div className="relative">
        <h1 className="font-italiana text-[9.60vw] font-light text-text-900 whitespace-nowrap leading-none tracking-tight ">
          Maktab Meezan ul Qur’an
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
