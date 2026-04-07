"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, []);


  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch("/api/verify-payment");
      const data = await res.json();
      setPayments(data);
    };

    fetchPayments();
  }, []);

  // Stats
  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  const success = payments.filter((p) => p.status === "paid").length;
  const failed = payments.filter((p) => p.status === "failed").length;

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Donations Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total</p>
          <h2 className="text-xl font-bold text-green-700">₹{total}</h2>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Success</p>
          <h2 className="text-xl font-bold text-blue-700">{success}</h2>
        </div>

        <div className="bg-red-50 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Failed</p>
          <h2 className="text-xl font-bold text-red-700">{failed}</h2>
        </div>
      </div>

      {/* List UI */}
      <div className="space-y-4">
        {payments.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow border">
            {/* Row */}
            <div
              onClick={() => toggle(p._id)}
              className="flex justify-between items-center p-4 cursor-pointer hover:rounded-xl hover:bg-gray-50"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">₹{p.amount}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : p.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>

                {/* Arrow */}
                <img
                  src={openId === p._id ? "/arrowUp.png" : "/arrowDown.png"}
                  alt="toggle"
                  className="w-4 h-4"
                />
              </div>
            </div>

            {/* Expandable Details */}
            {openId === p._id && (
              <div className="border-t p-4 rounded-b-xl overflow-hidden bg-gray-50 text-sm">
                {/* Desktop view */}

                <div className="hidden md:grid grid-cols-2 gap-2 p-4">
                  <p className="text-gray-500">Email:</p>
                  <p>{p.email}</p>

                  <p className="text-gray-500">Amount:</p>
                  <p>₹{p.amount}</p>

                  <p className="text-gray-500">Status:</p>
                  <p>{p.status}</p>

                  <p className="text-gray-500">Date:</p>
                  <p>{new Date(p.createdAt).toLocaleString()}</p>

                  <p className="text-gray-500">Payment ID:</p>
                  <p>{p.razorpay_payment_id || "N/A"}</p>

                  <p className="text-gray-500">Receipt ID:</p>
                  <p>{p._id}</p>
                </div>

                {/* Mobile view */}
                <div className="md:hidden space-y-3">
                  <div>
                    <p className="text-gray-500">Email:</p>
                    <p className="font-medium break-all">{p.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Amount:</p>
                    <p className="font-medium">₹{p.amount}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Status:</p>
                    <p className="font-medium capitalize">{p.status}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Date:</p>
                    <p className="font-medium">
                      {new Date(p.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Payment ID:</p>
                    <p className="font-medium break-all">
                      {p.razorpay_payment_id || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Receipt ID:</p>
                    <p className="font-medium break-all">{p._id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
