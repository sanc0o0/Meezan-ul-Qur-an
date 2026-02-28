import { useEffect } from "react";

const Home = () => {
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
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight">
          Understanding the Qur’an with{" "}
          <span className="text-primary-600">Clarity</span>
        </h1>

        <p className="mt-6 text-text-600 max-w-2xl mx-auto leading-relaxed">
          A balanced and thoughtful approach to reflection, study, and
          engagement with the message of the Qur’an.
        </p>

        <div className="mt-10">
          <button className="bg-primary-800 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition">
            Explore Articles
          </button>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="reveal section-left bg-background-100 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium mb-6">
            A Space for Reflection & Learning
          </h2>

          <p className="text-text-600 leading-relaxed">
            Meezan-ul-Quran is dedicated to presenting thoughtful insights,
            encouraging reflection, and promoting a balanced understanding
            rooted in scholarship and clarity.
          </p>
        </div>
      </section>

      {/* ================= FEATURED SECTION ================= */}
      <section className="reveal section-right max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-medium mb-12 text-center">
          Featured Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background-100 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-3">The Concept of Meezan</h3>
            <p className="text-text-600 text-sm">
              Understanding balance and justice in the Qur’anic worldview.
            </p>
          </div>

          <div className="bg-background-100 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-3">
              Reflection in Daily Life
            </h3>
            <p className="text-text-600 text-sm">
              How contemplation strengthens spiritual awareness.
            </p>
          </div>

          <div className="bg-background-100 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-3">Language & Meaning</h3>
            <p className="text-text-600 text-sm">
              Exploring the depth of Qur’anic expression.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TOP STUDENTS SECTION (NO REVEAL) ================= */}
      <section className="py-20 bg-background-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-medium text-center mb-12">
            Top Students – Maktab Meezan ul Qur’an
          </h2>

          <div className="relative group">
            <div className="flex gap-8 animate-scroll whitespace-nowrap group-hover:[animation-play-state:paused]">
              {[
                "Abdullah Khan",
                "Fatima Noor",
                "Yusuf Ali",
                "Ayesha Siddiqah",
                "Ibrahim Rahman",
                "Zainab Ahmed",
              ].map((student, index) => (
                <div
                  key={index}
                  className="bg-background-50 shadow-md rounded-xl px-8 py-6 min-w-[250px] text-center"
                >
                  <h3 className="text-lg font-medium text-primary-600">
                    {student}
                  </h3>
                  <p className="text-sm text-text-600 mt-2">
                    Excellence in Qur’anic Studies
                  </p>
                </div>
              ))}

              {/* Duplicate for seamless loop */}
              {[
                "Abdullah Khan",
                "Fatima Noor",
                "Yusuf Ali",
                "Ayesha Siddiqah",
                "Ibrahim Rahman",
                "Zainab Ahmed",
              ].map((student, index) => (
                <div
                  key={"dup-" + index}
                  className="bg-background-50 shadow-md rounded-xl px-8 py-6 min-w-[250px] text-center"
                >
                  <h3 className="text-lg font-medium text-primary-600">
                    {student}
                  </h3>
                  <p className="text-sm text-text-600 mt-2">
                    Excellence in Qur’anic Studies
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
