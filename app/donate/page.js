export default function Donate() {
  const amounts = [100, 500, 1000, 5000];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">
          Support Maktab Meezan-ul-Qur’an
        </h1>

        <p className="text-text-700 max-w-3xl mx-auto leading-relaxed">
          Your contribution helps us continue teaching the Holy Qur’an,
          nurturing young students with authentic Islamic knowledge and
          providing a spiritually uplifting environment for learning.
        </p>
      </div>

      {/* Donation Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {amounts.map((amount) => (
          <button
            key={amount}
            className="bg-background-50 border border-primary-200 rounded-xl py-8 shadow-sm hover:shadow-md hover:border-primary-500 transition"
          >
            <p className="text-2xl font-semibold text-primary-700">₹{amount}</p>

            <p className="text-sm text-text-600 mt-2">Contribute</p>
          </button>
        ))}
      </div>

      {/* Custom Donation */}
      <div className="max-w-md mx-auto text-center">
        <p className="text-text-700 mb-4">Or enter a custom amount</p>

        <input
          type="number"
          placeholder="Enter amount (₹)"
          className="w-full border border-text-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition">
          Donate Now
        </button>
      </div>

      {/* Trust Section */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-primary-700 mb-4">
          Why Your Support Matters
        </h2>

        <p className="text-text-700 leading-relaxed">
          Donations help us provide Qur’anic education, maintain learning
          facilities, support teachers, and ensure that students have access to
          authentic Islamic knowledge regardless of their financial background.
        </p>
      </div>
    </section>
  );
}
