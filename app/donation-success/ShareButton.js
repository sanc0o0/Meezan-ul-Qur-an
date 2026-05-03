"use client";

export default function ShareButton({ amount, paymentId }) {
  const shareText = amount
    ? `🤲 I just donated ₹${amount} to Maktab Meezan-ul-Qur'an — supporting authentic Qur'anic education for children who need it most.\n\nMay Allah accept it. You can donate too:`
    : `🤲 I just donated to Maktab Meezan-ul-Qur'an — supporting authentic Qur'anic education.\n\nMay Allah accept it. You can donate too:`;

  const handleShare = async () => {
    const shareData = {
      title: "I donated to Meezan-ul-Qur'an 🕌",
      text: shareText,
      url: `${window.location.origin}/donate`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${shareText}\n${window.location.origin}/donate`,
        );
        alert(
          "Donation message copied to clipboard! Paste and share anywhere.",
        );
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-primary-700 hover:bg-primary-800 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
    >
      <span>🔗</span> Share Your Donation
    </button>
  );
}
