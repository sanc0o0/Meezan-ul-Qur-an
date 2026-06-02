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
    icon: "education",
    title: "Authentic Islamic Education",
    desc: "Rooted in traditional Qur'anic scholarship and ijazah-based teaching.",
  },
  {
    icon: "students",
    title: "Supporting Students in Need",
    desc: "Your contribution helps children access Qur'anic education regardless of financial background.",
  },
  {
    icon: "secure",
    title: "Secure Payments via Razorpay",
    desc: "Your payment is encrypted and processed by India's most trusted gateway.",
  },
  {
    icon: "sadaqah",
    title: "Sadaqah Jariyah Opportunity",
    desc: "Every rupee you give keeps earning reward long after you give it.",
  },
];

function TrustIcon({ name }) {
  const svgProps = {
    viewBox: "0 0 24 24",
    width: 22,
    height: 22,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    education: (
      <svg {...svgProps}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    students: (
      <svg {...svgProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    secure: (
      <svg {...svgProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    sadaqah: (
      <svg {...svgProps}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  };

  return (
    <div className="w-11 h-11 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shrink-0">
      {icons[name] ?? null}
    </div>
  );
}

function HandsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 11.5 5c-.17.16-.34.34-.5.5-.16-.16-.33-.34-.5-.5A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.22" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        modal: { ondismiss: () => setStatus("cancelled") },
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
      {/* Hero */}
      <section className="bg-primary-800 text-white py-16 px-6 text-center relative overflow-hidden">
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
          Your sadaqah keeps the light of the Qur&apos;an alive — funding
          teachers, books, and students who cannot afford to learn.
        </p>
        <div className="mt-10 flex justify-center gap-8 md:gap-16 flex-wrap">
          {IMPACT_STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-primary-300 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Card */}
      <section
        ref={formRef}
        className="max-w-xl mx-auto px-4 -mt-6 relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-primary-100 p-6 md:p-8">
          {status === "cancelled" && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-3 rounded-lg">
              ⚠️ Payment was cancelled. You can try again below.
            </div>
          )}
          {status === "failed" && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              Something went wrong. Please try again or contact us.
            </div>
          )}

          <h2 className="text-primary-800 font-bold text-lg mb-1">
            Choose an Amount
          </h2>
          <p className="text-text-500 text-xs mb-4">
            All donations are secure and go directly to the maktab.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(String(amt));
                  setCustomAmount("");
                  formRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
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
            <HandsIcon />
            {selectedAmount
              ? `Donate ₹${Number(selectedAmount).toLocaleString("en-IN")} Now`
              : "Donate Now"}
          </button>

          <p className="text-center text-xs text-text-400 mt-3 flex items-center justify-center gap-1">
            <LockIcon /> Secured by Razorpay · Your data is never shared
          </p>
        </div>
      </section>

      {/* Why Your Support Matters */}
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
              className="bg-white border border-primary-100 rounded-2xl p-5 flex gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <TrustIcon name={p.icon} />
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
