import Link from "next/link";
import logo from "../assets/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-background-50 text-text-800 mt-20 overflow-hidden flex flex-col relative  bottom-0 left-0 w-full">
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl px-6 flex flex-col md:flex-row justify-between gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-start gap-25 ">
          <div className="flex flex-col items-start gap-0">
            <Link href="/">
              <Image
                src={logo}
                alt="Meezan-ul-Quran Logo"
                width={120}
                height={60}
                className=" object-contain"
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
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-600 transition"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/donate"
                  className="hover:text-primary-600 transition"
                >
                  Contribute
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-600 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-text-900">Legal</h3>
            <ul className="space-y-2 text-text-600">
              <li>
                <Link
                  href="/privacyPolicy"
                  className="hover:text-primary-600 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/termsAndConditions"
                  className="hover:text-primary-600 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/refundPolicy"
                  className="hover:text-primary-600 transition"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-text-900">Contact</h3>
            <p className="text-text-600">Send us an email</p>

            <a
              href="mailto:abulkalam.mumbai@gmail.com"
              className="text-primary-600 mt-2 block hover:underline"
            >
              abulkalam.mumbai@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* BIG BACKGROUND TEXT */}
      <div className="relative overflow-hidden">
        <h1 className="font-italiana text-[9.60vw] font-light text-text-900 whitespace-nowrap leading-none tracking-tight text-center">
          Maktab Meezan ul Qur’an
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
