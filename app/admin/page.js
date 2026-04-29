"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch("/api/verify-payment", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      setPayments(data);
    };

    fetchPayments();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    window.location.href = "/admin/login";
  };

  // Stats
  const paidPayments = payments.filter((p) => p.status === "paid");

  const total = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const success = paidPayments.length;
  const failed = payments.filter((p) => p.status === "failed").length;

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Donations Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-green-50 p-5 rounded-2xl shadow-sm">
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
        {payments.length === 0 && (
          <p className="text-center text-gray-500">No donations yet</p>
        )}
        {payments.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow border">
            {/* Row */}
            <div
              onClick={() => toggle(p._id)}
              className="flex justify-between items-center p-4 cursor-pointer hover:rounded-xl hover:bg-gray-50 transition"
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
                <Image
                  src={openId === p._id ? "/arrowUp.png" : "/arrowDown.png"}
                  alt="toggle"
                  width={16}
                  height={16}
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
