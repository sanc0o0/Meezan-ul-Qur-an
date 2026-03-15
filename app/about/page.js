"use client";

import { useEffect } from "react";

const About = () => {
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
    <div className="bg-background-50 text-text-900">
      {/* HERO SECTION */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
          Maktab Meezan-ul-Qur&apos;an
        </h1>

        <p className="max-w-3xl mx-auto text-text-700 leading-relaxed mb-8">
          Maktab Meezan-ul-Qur&apos;an is dedicated to nurturing young hearts
          with the light of the Holy Qur’an. Through proper Tajweed, Islamic
          manners, and spiritual guidance, we aim to cultivate a generation that
          loves the Qur’an, lives by its teachings, and represents the Ummah
          with excellence.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/contact"
            className="bg-primary-900 w-2xs text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Enroll a Student
          </a>

          <a
            href="/donate"
            className="border w-2xs border-primary-900 text-primary-900 px-6 py-3 rounded-lg hover:bg-primary-900 hover:text-text-50 transition"
          >
            Support the Maktab
          </a>
        </div>
      </section>

      {/* QIRAT SHOWCASE */}

      <section className="reveal section-hidden bg-background-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium mb-6">
            Qur&apos;anic Recitation
          </h2>

          <p className="max-w-3xl mx-auto text-text-700 mb-10">
            Beautiful recitation of the Holy Qur&apos;an presented by Janab Qari
            Abul Kalam Sajjad Sahab during the International Religious
            Conference for World Peace at Khanqah-e-Sarwar-e-Aalam, Hyderabad.
          </p>

          <div className="relative w-full max-w-4xl mx-auto pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/zN4rnYcLv-8"
              title="Qirat e Kalam e Pak"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="reveal section-hidden bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-medium mb-6">Our Mission</h2>
            <p className="text-text-700 leading-relaxed">
              Our mission is to develop strong Qur&apos;anic recitation with
              proper Tajweed, instill Islamic manners (Akhlaq), and cultivate
              love for Salah and Sunnah. We aim to balance knowledge (Ilm) with
              character (Adab), preparing students to grow as confident and
              practicing Muslims.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium mb-6">Our Vision</h2>
            <p className="text-text-700 leading-relaxed">
              We envision raising a generation that recites the Qur’an
              beautifully, understands Islamic values deeply, and represents the
              Ummah with excellence in character and conduct.
            </p>
          </div>
        </div>
      </section>

      {/* OUR PROFICIENCY */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-medium mb-6 text-center">
          Our Proficiency
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Nazra with Tajweed</h3>
            <p className="text-text-700">
              Proper pronunciation (Makharij) and rules of Tajweed are taught
              with individual correction and daily practice.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Hifz Preparation</h3>
            <p className="text-text-700">
              Strong memorization techniques with structured revision systems to
              ensure long-term retention.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Islamic Studies</h3>
            <p className="text-text-700">
              Duas, Hadith, Seerah, basic Fiqh, and Islamic etiquette to build
              complete Islamic character.
            </p>
          </div>
        </div>
      </section>

      {/* OUR TEACHERS */}
      <section className="reveal section-hidden bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-medium mb-6 text-center">Our Teachers</h2>

          <p className="max-w-4xl mx-auto text-center text-text-700 leading-relaxed mb-10">
            Our teachers are qualified, experienced, and passionate about
            Islamic education. Many hold formal Islamic certifications (Aalim /
            Hafiz), possess strong expertise in Tajweed and Qur’anic sciences,
            and bring years of teaching experience with patience and wisdom.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-semibold text-lg mb-2">Qualified Scholars</h4>
              <p className="text-text-700">
                Formal Islamic education with deep understanding of Qur’an and
                Sunnah.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-semibold text-lg mb-2">
                Experienced Mentors
              </h4>
              <p className="text-text-700">
                Skilled in teaching children with compassion and discipline.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-semibold text-lg mb-2">Role Models</h4>
              <p className="text-text-700">
                Committed to Islamic character, serving as examples for
                students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-medium text-center  mb-6">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            Sincerity (Ikhlas)
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            Authentic Knowledge
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            Discipline & Respect
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            Love for Sunnah
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="reveal section-hidden bg-primary-700 text-text-50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xl italic mb-4">
            “Indeed, the best among you are those who learn the Qur’an and teach
            it.”
          </p>
          <p className="text-lg">
            At Maktab Meezan-ul-Qur&apos;an, we strive to live by this noble
            principle every day.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
