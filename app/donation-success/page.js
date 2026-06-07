import ShareButton from "./ShareButton";
import Image from "next/image";
import logo from "../../public/logo.png";
import { ScrollReveal } from "@/components/animations";

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const paymentId = params.payment_id || "N/A";
  const amount = params.amount
    ? Number(params.amount).toLocaleString("en-IN")
    : null;
  const donorName = params.name ? decodeURIComponent(params.name) : null;

  return (
    <ScrollReveal>
      <div className="min-h-screen bg-background-50 flex flex-col items-center justify-center px-6 py-16">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-primary-100 max-w-md w-full px-8 py-10 text-center">
        <div className="w-30 h-30 bg-white border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Image
            src={logo}
            alt="Meezan-ul-Quran Logo"
            className="w-30 h-30 object-contain"
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-primary-800 mb-2">
          JazakAllah Khair{donorName ? `, ${donorName.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-text-500 text-sm leading-relaxed mb-6">
          Your donation has been received. May Allah accept it as sadaqah
          jariyah and reward you abundantly — in this life and the Akhirah.
        </p>

        {/* Transaction Detail */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl px-5 py-4 mb-6 text-left space-y-2">
          {amount && (
            <div className="flex justify-between text-sm">
              <span className="text-text-500">Amount</span>
              <span className="font-semibold text-primary-800">₹{amount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-text-500">Recipient</span>
            <span className="font-semibold text-primary-800">
              Maktab Meezan-ul-Qur&apos;an
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-500">Status</span>
            <span className="text-green-600 font-semibold">Confirmed ✓</span>
          </div>
          <div className="pt-2 border-t border-primary-100 flex justify-between text-xs">
            <span className="text-text-400">Payment ID</span>
            <span className="text-text-500 font-mono">{paymentId}</span>
          </div>
        </div>

        <ShareButton amount={amount} paymentId={paymentId} />

        <p className="text-xs text-text-400 mt-4">
          A confirmation will be sent to your email. Keep your Payment ID for
          records.
        </p>
      </div>

        </div>

        {/* Quranic note */}
        <p className="text-center text-primary-700 text-xs mt-8 max-w-xs italic opacity-70">
        &ldquo;Whoever saves one life, it is as if he has saved all of
        mankind.&rdquo;
        <br />
        <span className="not-italic">— Qur&apos;an 5:32</span>
      </p>
    </ScrollReveal>
  );
}
