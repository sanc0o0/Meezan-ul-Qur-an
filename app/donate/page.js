"use client";
import { useEffect, useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const amounts = [100, 500, 1000, 5000];

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000); // disappears after 3 sec

      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  if (loading) return;
  const handlePayment = async () => {
    try {
      if (!amount || !name || !email) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      // Create order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          name,
          email,
        }),
      });

      const order = await res.json();

      if (!res.ok) throw new Error("Order failed");

      // Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Meezan-ul-Quran",
        description: "Donation",
        order_id: order.id,

        handler: async function (response) {
          // Verify payment
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const data = await verifyRes.json();

          if (data.success) {
            setStatus("success");
            setAmount("");
            setName("");
            setEmail("");
          } else {
            setStatus("failed");
          }
        },

        modal: {
          ondismiss: function () {
            setStatus("cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">
          Support Maktab Meezan-ul-Qur&apos;an
        </h1>

        <p className="text-text-700 max-w-3xl mx-auto leading-relaxed">
          Your contribution helps us continue teaching the Holy Qur&apos;an,
          nurturing young students with authentic Islamic knowledge and
          providing a spiritually uplifting environment for learning.
        </p>
      </div>

      {/* Donation Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {amounts.map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="bg-background-50 border border-primary-200 rounded-xl py-8 shadow-sm hover:shadow-md hover:border-primary-500 transition"
          >
            <p className="text-2xl font-semibold text-primary-700">₹{amt}</p>
            <p className="text-sm text-text-600 mt-2">Contribute</p>
          </button>
        ))}
      </div>

      {/* Custom Donation */}
      <div className="max-w-md mx-auto text-center">
        <p className="text-text-700 mb-4">Enter your details</p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-text-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-text-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="number"
          placeholder="Enter amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-text-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <button
          onClick={handlePayment}
          disabled={loading || !amount || !name || !email}
          className="w-full bg-primary-700 text-white py-3 rounded-lg hover:bg-primary-800 transition disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>

        {/* ✅ Status Messages */}
        {status === "success" && (
          <p className="text-green-600 mt-4">Payment successful ✅</p>
        )}

        {status === "failed" && (
          <p className="text-red-600 mt-4">Payment failed ❌</p>
        )}

        {status === "cancelled" && (
          <p className="text-yellow-600 mt-4">Payment cancelled ⚠️</p>
        )}
      </div>

      {/* Trust Section */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-primary-700 mb-4">
          Why Your Support Matters
        </h2>

        <p className="text-text-700 leading-relaxed">
          Donations help us provide Qur&apos;anic education, maintain learning
          facilities, support teachers, and ensure that students have access to
          authentic Islamic knowledge regardless of their financial background.
        </p>
      </div>
    </section>
  );
}
