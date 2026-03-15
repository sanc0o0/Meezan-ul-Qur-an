import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Maktab Meezan ul Qur’an",
  description:
    "A platform dedicated to understanding the Qur’an with clarity, depth and balance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={"antialiased min-h-screen flex flex-col bg-background-50 text-text-900"}
      >
        <Navbar />

        <main className="grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
