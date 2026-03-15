"use client";

import { useEffect, useState } from "react";

const ContactUs = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-show");
          }
        });
      },
      { threshold: 0.15 },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setLoading(false);
  };
  return (
    <div className="bg-background-50 text-text-900">
      {/* HERO SECTION */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-text-700">
          We&apos;d love to hear from you. Reach out to Maktab
          Meezan-ul-Qur&apos;an for admissions, inquiries, or any questions
          regarding our programs.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE - CONTACT INFO */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-medium text-text-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-text-700 leading-relaxed">
                We are always happy to assist parents and students. Feel free to
                contact us through the following details or submit the form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold mb-2">📍 Address</h3>
              <p className="text-text-700">
                Maktab Meezan-ul-Qur&apos;an, At-Baunsi, Post-Tirhuta,
                Via-Babubarhi, Madhubani, Bihar - 847224
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold mb-2">📞 Phone</h3>
              <p className="text-text-700">+91 97698 47703</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold mb-2">✉ Email</h3>
              <a
                href="mailto:abulkalam.mumbai@gmail.com"
                className="text-primary-600 mt-2 block hover:underline"
              >
                abulkalam.mumbai@gmail.com
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-primary-900 mb-6">
              Send a Message
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-700 text-white py-3 rounded-lg hover:bg-primary-800 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <p className="text-green-600 mt-4 text-center transition-opacity duration-500">
                  Your message has been sent successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* OPTIONAL MAP SECTION */}
      <section className="reveal section-hidden bg-primary-50 py-16 text-center">
        <h2 className="text-2xl font-semibold text-primary-700 mb-4">
          Visit Us
        </h2>
        <p className="text-text-700">
          You can visit our Maktab during working hours for admissions and
          inquiries.
        </p>
      </section>
    </div>
  );
};

export default ContactUs;
