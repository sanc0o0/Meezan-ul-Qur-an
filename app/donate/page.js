"use client";
import { useEffect, useState, useRef } from "react";

const PRESET_AMOUNTS = [100, 500, 1000, 5000];

const IMPACT_STATS = [
  { value: "150+", label: "Students Enrolled" },
  { value: "3+", label: "Years of Service" },
  { value: "10+", label: "Donors Trust Us" },
];

const TRUST_POINTS = [
  {
    icon: "🕌",
    title: "Authentic Islamic Education",
    desc: "Rooted in traditional Qur'anic scholarship and ijazah-based teaching.",
  },
  {
    icon: "👶",
    title: "Supporting Students in Need",
    desc: "Your contribution helps children access Qur'anic education regardless of financial background.",
  },
  {
    icon: "🔒",
    title: "Secure Payments via Razorpay",
    desc: "Your payment is encrypted and processed by India's most trusted gateway.",
  },
  {
    icon: "🤲",
    title: "Sadaqah Jariyah Opportunity",
    desc: "Every rupee you give keeps earning reward long after you give it.",
  },
];

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedAmount = amount || customAmount;
  const formRef = useRef(null);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);
  useEffect(() => {
    if (loading) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // or "auto" if you want instant
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background-50">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-text-600 font-medium tracking-wide">
          Opening secure payment gateway…
        </p>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      if (!selectedAmount || !name || !email) {
        alert("Please fill all fields and select an amount.");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(selectedAmount), name, email }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error("Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Meezan-ul-Qur'an",
        description: `Donation of ₹${selectedAmount}`,
        prefill: { name, email },
        order_id: order.id,
        theme: { color: "#065f46" },
        handler: async function (response) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, amount: selectedAmount }),
          });
          const data = await verifyRes.json();
          if (data.success) {
            window.location.href = `/donation-success?payment_id=${response.razorpay_payment_id}&amount=${selectedAmount}&name=${encodeURIComponent(name)}`;
          } else {
            window.location.href = `/donation-failed`;
          }
        },
        modal: {
          ondismiss: () => setStatus("cancelled"),
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
    <main className="bg-background-50 min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-primary-800 text-white py-16 px-6 text-center relative overflow-hidden">
        {/* subtle geometric accent */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <p className="text-primary-300 uppercase tracking-widest text-xs font-semibold mb-3">
          Maktab Meezan-ul-Qur&apos;an
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          Give Today. Earn Forever.
        </h1>
        <p className="text-primary-200 max-w-xl mx-auto text-sm leading-relaxed">
          Your sadaqah keeps the light of the Qur&apos;an alive — funding teachers,
          books, and students who cannot afford to learn.
        </p>

        {/* Impact stats */}
        <div className="mt-10 flex justify-center gap-8 md:gap-16 flex-wrap">
          {IMPACT_STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-primary-300 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Donation Card ── */}
      <section 
        ref={formRef}
        className="max-w-xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-primary-100 p-6 md:p-8">
          {/* Status banners */}
          {status === "cancelled" && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-3 rounded-lg">
              ⚠️ Payment was cancelled. You can try again below.
            </div>
          )}
          {status === "failed" && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              ❌ Something went wrong. Please try again or contact us.
            </div>
          )}

          <h2 className="text-primary-800 font-bold text-lg mb-1">
            Choose an Amount
          </h2>
          <p className="text-text-500 text-xs mb-4">
            All donations are secure and go directly to the maktab.
          </p>

          {/* Preset + Custom on same row grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(String(amt));
                  setCustomAmount("");

                  formRef.current.scrollIntoView({ 
                    behavior: "smooth",
                    block: "center",});
                }}
                className={`rounded-xl py-4 border-2 transition-all font-semibold text-base
                  ${
                    amount === String(amt)
                      ? "border-primary-600 bg-primary-50 text-primary-700 shadow-sm"
                      : "border-primary-100 bg-background-50 text-primary-800 hover:border-primary-400"
                  }`}
              >
                ₹{amt.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          {/* Custom amount — same visual row feel */}
          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-500 font-medium">
              ₹
            </span>
            <input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount("");
              }}
              className={`w-full border-2 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none transition
                ${
                  customAmount
                    ? "border-primary-600 bg-primary-50"
                    : "border-primary-100 bg-background-50 focus:border-primary-400"
                }`}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 h-px bg-primary-100" />
            <span className="text-xs text-text-400 uppercase tracking-widest">
              Your Details
            </span>
            <div className="flex-1 h-px bg-primary-100" />
          </div>

          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-text-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-text-200 rounded-xl px-4 py-3 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
          />

          <button
            onClick={handlePayment}
            disabled={loading || !selectedAmount || !name || !email}
            className="w-full bg-primary-700 hover:bg-primary-800 active:scale-95 text-white py-4 rounded-xl font-semibold tracking-wide transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>🤲</span>
            {selectedAmount
              ? `Donate ₹${Number(selectedAmount).toLocaleString("en-IN")} Now`
              : "Donate Now"}
          </button>

          <p className="text-center text-xs text-text-400 mt-3 flex items-center justify-center gap-1">
            <span>🔒</span> Secured by Razorpay · Your data is never shared
          </p>
        </div>
      </section>

      {/* ── Why Your Support Matters ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-primary-800 mb-2">
          Why Your Support Matters
        </h2>
        <p className="text-center text-text-500 text-sm mb-10 max-w-lg mx-auto">
          Every donation, big or small, directly fuels Islamic education for
          children who need it most.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRUST_POINTS.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-primary-100 rounded-2xl p-5 flex gap-4 shadow-sm hover:shadow-md transition"
            >
              <span className="text-2xl mt-0.5">{p.icon}</span>
              <div>
                <h3 className="font-semibold text-primary-800 text-sm mb-1">
                  {p.title}
                </h3>
                <p className="text-text-500 text-xs leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
