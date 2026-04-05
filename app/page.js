"use client";

import { useEffect } from "react";
import StudentCard from "../components/StudentCard";
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
      {/* HERO SECTION */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight">
          Understanding the Qur&apos;an with
          <span className="text-primary-600"> Clarity</span>
        </h1>

        <p className="pt-6 text-text-900 max-w-2xl mx-auto text-xl leading-relaxed">
          A balanced and thoughtful approach to reflection, study, and
          engagement with the message of the Qur&apos;an.
        </p>

        <div className="flex justify-center pt-10">
          <a
            href="/about"
            className="bg-primary-900 w-2xs text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Explore more
          </a>
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
        <h2 className="text-3xl font-medium pb-12 text-center">
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
            <h3 className="text-xl font-medium pb-3">
              Reflection in Daily Life
            </h3>
            <p className="text-text-600 text-sm">
              How contemplation strengthens spiritual awareness.
            </p>
          </div>

          <div className="bg-background-100 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium pb-3">Language & Meaning</h3>
            <p className="text-text-600 text-sm">
              Exploring the depth of Qur’anic expression.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TOP STUDENTS SECTION (NO REVEAL) ================= */}
      <section className="py-20 bg-background-1000 overflow-hidden">
        <div className="px-6">
          <h2 className="text-3xl font-medium text-center pb-12">
            Top Students - Maktab Meezan ul Qur&apos;an
          </h2>

          <div
            className="group relative overflow-hidden whitespace-nowrap py-6 
    mask-[linear-gradient(to_right,transparent_0,white_0px,white_calc(100%-0px),transparent_100%)]"
          >
            {/* FIRST LOOP */}
            <div className="animate-slide-left-infinite group-hover:[animation-play-state:paused] inline-block w-max">
              {[
                {
                  name: "Shujauddin Ansari",
                  image: "/students/shujauddin.jpg",
                },
                { name: "Abdullah Khan", image: "/students/shujauddin.jpg" },
                { name: "Fatima Noor", image: "/students/shujauddin.jpg" },
                { name: "Yusuf Ali", image: "/students/shujauddin.jpg" },
              ].map((student, index) => (
                <span key={index} className="mx-4 inline-block">
                  <StudentCard name={student.name} image={student.image} />
                </span>
              ))}
            </div>

            {/* DUPLICATE LOOP */}
            <div className="animate-slide-left-infinite group-hover:[animation-play-state:paused] inline-block w-max">
              {[
                {
                  name: "Shujauddin Ansari",
                  image: "/students/shujauddin.jpg",
                },
                { name: "Abdullah Khan", image: "/students/shujauddin.jpg" },
                { name: "Fatima Noor", image: "/students/shujauddin.jpg" },
                { name: "Yusuf Ali", image: "/students/shujauddin.jpg" },
              ].map((student, index) => (
                <span key={"dup-" + index} className="mx-4 inline-block">
                  <StudentCard name={student.name} image={student.image} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
