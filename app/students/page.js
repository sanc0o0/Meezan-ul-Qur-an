"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";

const BookIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 6 C12 4 6 4 4 5 L4 27 C6 26 12 26 16 28 C20 26 26 26 28 27 L28 5 C26 4 20 4 16 6Z" />
    <line x1="16" y1="6" x2="16" y2="28" />
    <line x1="8" y1="10" x2="13" y2="10" />
    <line x1="8" y1="13.5" x2="13" y2="13.5" />
    <line x1="8" y1="17" x2="13" y2="17" />
    <line x1="19" y1="10" x2="24" y2="10" />
    <line x1="19" y1="13.5" x2="24" y2="13.5" />
    <line x1="19" y1="17" x2="24" y2="17" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 2l2.9 8.9H23l-7.5 5.5 2.9 8.9L12 20l-7.5 5.4 2.9-8.9L0 10.9h8.1z" />
  </svg>
);

const UPCOMING = [
  {
    title: "Student Profiles",
    desc: "Individual learning profiles tracking Qur'anic progress, attendance, and achievements.",
  },
  {
    title: "Progress Reports",
    desc: "Detailed monthly reports shared with parents on recitation quality and Tajweed mastery.",
  },
  {
    title: "Activity Gallery",
    desc: "Photos and highlights from maktab events, competitions, and milestones.",
  },
  {
    title: "Leaderboard",
    desc: "Recognition for students with highest attendance, best Tajweed, and Qur'an memorisation.",
  },
  {
    title: "Class Announcements",
    desc: "Important updates, holiday schedules, and exam notices — all in one place.",
  },
  {
    title: "Parent Portal",
    desc: "Secure portal where parents can track their child's journey and communicate with teachers.",
  },
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-background-50 text-text-900">
      {/* Hero */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          <StarIcon />
          Coming Soon
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-primary-900 text-white flex items-center justify-center shadow-lg">
            <BookIcon />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6 leading-tight">
          Student Hub
        </h1>
        <p className="text-text-600 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
          We are building a dedicated space for students and parents — where you
          can track progress, view achievements, and stay connected with the
          Maktab.
        </p>
        <p className="text-text-500 text-sm">
          This section will be available soon, insha&apos;Allah.
        </p>
        </section>
      </ScrollReveal>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-background-200" />
      </div>

      {/* What's coming */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-700">
            What to expect
          </span>
          <h2 className="text-2xl font-medium mt-2 text-text-900">
            Features Being Built
          </h2>
        </div>

        <StaggerContainer stagger={0.08}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {UPCOMING.map(({ title, desc }, i) => (
              <StaggerItem key={title}>
                <div className="bg-white border border-background-200 rounded-xl p-6 hover:border-primary-200 hover:shadow-sm transition">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-700 text-sm font-bold mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-text-900">{title}</h3>
                  <p className="text-text-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </section>

      {/* CTA */}
      <section className="bg-primary-900 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-medium text-white mb-3">
            Want to enroll your child?
          </h2>
          <p className="text-primary-200 text-sm mb-8 leading-relaxed">
            Registration is open. Complete the online form and pay the ₹100 fee
            to secure your child&apos;s place at Maktab Meezan-ul-Qur&apos;an.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/enroll"
              className="bg-white text-primary-900 px-7 py-3 rounded-lg font-semibold text-sm hover:bg-primary-50 transition"
            >
              Enroll Student
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white px-7 py-3 rounded-lg text-sm hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="text-center py-8">
        <p className="text-text-400 text-xs">
          Maktab Meezan-ul-Qur&apos;an · Bihar, India · Building,
          insha&apos;Allah
        </p>
      </div>
    </div>
  );
}
