import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Donate from "./pages/Donate";

function App() {
  return (
    <div className="bg-background-50 text-text-900 min-h-screen flex flex-col">
      {/* Navbar stays fixed across pages */}
      <Navbar />

      {/* Page Content */}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>

      {/* Footer stays fixed across pages */}
      <Footer />
    </div>
  );
}

export default App;
