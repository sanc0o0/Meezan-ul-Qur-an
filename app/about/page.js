"use client";

import { useEffect } from "react";
import Link from "next/link";

// ── High-quality, meaningful SVG icon components
const Icons = {
  // Open Quran with visible pages and text lines
  QuranBook: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 6 C12 4 6 4 4 5 L4 27 C6 26 12 26 16 28 C20 26 26 26 28 27 L28 5 C26 4 20 4 16 6Z" />
      <line x1="16" y1="6" x2="16" y2="28" />
      <line x1="8" y1="10" x2="13" y2="10" />
      <line x1="8" y1="13.5" x2="13" y2="13.5" />
      <line x1="8" y1="17" x2="13" y2="17" />
      <line x1="8" y1="20.5" x2="11" y2="20.5" />
      <line x1="19" y1="10" x2="24" y2="10" />
      <line x1="19" y1="13.5" x2="24" y2="13.5" />
      <line x1="19" y1="17" x2="24" y2="17" />
      <line x1="19" y1="20.5" x2="22" y2="20.5" />
    </svg>
  ),

  // Sound waves emanating from a mouth — Tajweed/recitation
  Tajweed: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="16" r="4" />
      <path d="M19 10 C22 12 22 20 19 22" />
      <path d="M22 7 C27 10 27 22 22 25" />
      <path d="M5 13 C3 14.5 3 17.5 5 19" />
      <line x1="12" y1="9" x2="12" y2="7" />
      <line x1="12" y1="23" x2="12" y2="25" />
    </svg>
  ),

  // Two hands open in dua/supplication
  Hands: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20 C5 18 4 14 5 10 C5 8.5 6.5 8 7.5 9 L8 11" />
      <path d="M8 11 L8 8 C8 6.5 10 6.5 10 8 L10 11" />
      <path d="M10 11 L10 7 C10 5.5 12 5.5 12 7 L12 11" />
      <path d="M12 11 L12 8 C12 6.5 14 6.5 14 8 L14 12" />
      <path d="M7 20 L10 24 L14 24 L14 12" />
      <path d="M25 20 C27 18 28 14 27 10 C27 8.5 25.5 8 24.5 9 L24 11" />
      <path d="M24 11 L24 8 C24 6.5 22 6.5 22 8 L22 11" />
      <path d="M22 11 L22 7 C22 5.5 20 5.5 20 7 L20 11" />
      <path d="M20 11 L20 8 C20 6.5 18 6.5 18 8 L18 12" />
      <path d="M25 20 L22 24 L18 24 L18 12" />
    </svg>
  ),

  // Crescent moon with a star
  Moon: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 A10 10 0 1 0 20 26 A7 7 0 1 1 20 6Z" />
      <circle cx="23" cy="9" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),

  // Glowing light bulb with rays
  Bulb: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 5 A7 7 0 0 1 23 12 C23 15.5 20.5 18 20 20 L12 20 C11.5 18 9 15.5 9 12 A7 7 0 0 1 16 5Z" />
      <line x1="13" y1="23" x2="19" y2="23" />
      <line x1="14" y1="26" x2="18" y2="26" />
      <line x1="16" y1="2" x2="16" y2="4" />
      <line x1="24" y1="4" x2="22.5" y2="5.5" />
      <line x1="8" y1="4" x2="9.5" y2="5.5" />
      <line x1="27" y1="12" x2="25" y2="12" />
      <line x1="7" y1="12" x2="5" y2="12" />
    </svg>
  ),

  // Scroll with writing — Islamic history
  Scroll: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6 C8 4 10 3 11 4 C11 3 13 2 13 4 L13 28 C13 30 11 31 10 30 C10 31 8 30 8 28 Z" />
      <path d="M13 5 L24 5 C26 5 27 6 27 8 L27 26 C27 28 26 29 24 29 L13 29" />
      <line x1="17" y1="11" x2="23" y2="11" />
      <line x1="17" y1="15" x2="23" y2="15" />
      <line x1="17" y1="19" x2="21" y2="19" />
    </svg>
  ),

  // Graduation cap
  GradCap: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="16,5 30,12 16,19 2,12" />
      <path d="M7 15 L7 22 C7 22 11 26 16 26 C21 26 25 22 25 22 L25 15" />
      <line x1="30" y1="12" x2="30" y2="20" />
      <circle cx="30" cy="21" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),

  // Shield with checkmark — safe environment
  Shield: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L27 7 L27 16 C27 22 22 26.5 16 29 C10 26.5 5 22 5 16 L5 7 Z" />
      <polyline points="11,16 14,19 21,12" />
    </svg>
  ),

  // Clipboard with checklist
  Clipboard: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="5" width="14" height="22" rx="2" />
      <path d="M13 5 L13 3 L19 3 L19 5" />
      <line x1="12" y1="12" x2="15" y2="12" />
      <line x1="12" y1="16" x2="15" y2="16" />
      <line x1="12" y1="20" x2="15" y2="20" />
      <line x1="17" y1="12" x2="21" y2="12" />
      <line x1="17" y1="16" x2="21" y2="16" />
      <line x1="17" y1="20" x2="20" y2="20" />
    </svg>
  ),

  // Seedling / growing leaf — character building
  Leaf: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 28 C16 28 16 14 28 6 C28 6 28 20 16 28Z" />
      <path d="M16 28 C16 28 16 18 8 14 C8 14 10 24 16 28Z" />
      <line x1="16" y1="28" x2="16" y2="22" />
    </svg>
  ),

  // Bar chart with upward trend
  BarChart: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="18" width="5" height="9" rx="1" />
      <rect x="12" y="12" width="5" height="15" rx="1" />
      <rect x="20" y="7" width="5" height="20" rx="1" />
      <polyline points="6.5,17 14.5,11 22.5,6" />
      <circle cx="6.5" cy="17" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="11" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="22.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),

  // Sunrise with rays breaking the horizon
  Sunrise: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20 A10 10 0 0 1 26 20" />
      <line x1="16" y1="6" x2="16" y2="4" />
      <line x1="7" y1="9" x2="5.5" y2="7.5" />
      <line x1="25" y1="9" x2="26.5" y2="7.5" />
      <line x1="4" y1="18" x2="2" y2="18" />
      <line x1="28" y1="18" x2="30" y2="18" />
      <line x1="3" y1="23" x2="29" y2="23" />
      <line x1="3" y1="27" x2="29" y2="27" />
    </svg>
  ),

  // Sunset with horizon lines
  Sunset: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16 A10 10 0 0 1 26 16" />
      <line x1="16" y1="3" x2="16" y2="5" />
      <line x1="7" y1="6" x2="8.5" y2="7.5" />
      <line x1="25" y1="6" x2="23.5" y2="7.5" />
      <line x1="3" y1="14" x2="2" y2="14" />
      <line x1="29" y1="14" x2="30" y2="14" />
      <line x1="3" y1="20" x2="29" y2="20" />
      <line x1="3" y1="24" x2="29" y2="24" />
      <line x1="3" y1="28" x2="29" y2="28" />
    </svg>
  ),

  // Calendar with days
  Calendar: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="26" height="23" rx="3" />
      <line x1="3" y1="13" x2="29" y2="13" />
      <line x1="10" y1="3" x2="10" y2="9" />
      <line x1="22" y1="3" x2="22" y2="9" />
      <circle cx="10" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="22" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="10" cy="25" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="25" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),

  // Heart — compassion
  Heart: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 27 C16 27 4 20 4 11 A6 6 0 0 1 10 5 C12.5 5 14.5 6.5 16 9 C17.5 6.5 19.5 5 22 5 A6 6 0 0 1 28 11 C28 20 16 27 16 27Z" />
    </svg>
  ),

  // Star — excellence
  Star: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L19.5 12 L29.5 12.5 L22 19 L24.5 29 L16 24 L7.5 29 L10 19 L2.5 12.5 L12.5 12 Z" />
    </svg>
  ),

  // Dove in flight — peace / ikhlas
  Dove: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18 C4 18 10 14 16 16 C22 18 26 14 28 10" />
      <path d="M28 10 C26 10 22 12 20 15 L16 16" />
      <path d="M16 16 L14 22 C14 24 16 25 18 24 L22 20" />
      <path d="M22 20 C24 18 28 14 28 10" />
      <circle cx="26" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <path d="M14 22 L10 26" />
    </svg>
  ),

  // Radiant sun — Sunnah
  Sun: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="6" />
      <line x1="16" y1="3" x2="16" y2="6" />
      <line x1="16" y1="26" x2="16" y2="29" />
      <line x1="3" y1="16" x2="6" y2="16" />
      <line x1="26" y1="16" x2="29" y2="16" />
      <line x1="7.1" y1="7.1" x2="9.2" y2="9.2" />
      <line x1="22.8" y1="22.8" x2="24.9" y2="24.9" />
      <line x1="7.1" y1="24.9" x2="9.2" y2="22.8" />
      <line x1="22.8" y1="9.2" x2="24.9" y2="7.1" />
    </svg>
  ),

  // Checkmark circle
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),

  // Mosque silhouette — enrollment CTA
  Mosque: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="28" x2="30" y2="28" />
      <rect x="10" y="18" width="12" height="10" rx="1" />
      <path d="M13 28 L13 22 C13 20.3 14.3 19 16 19 C17.7 19 19 20.3 19 22 L19 28" />
      <path d="M10 18 C10 14 13 12 16 10 C19 12 22 14 22 18" />
      <line x1="16" y1="10" x2="16" y2="7" />
      <path d="M14 7 C14 5.3 14.9 4 16 4 C17.1 4 18 5.3 18 7" />
      <line x1="5" y1="28" x2="5" y2="22" />
      <line x1="27" y1="28" x2="27" y2="22" />
      <path d="M3 22 C3 20 4 19 5 19 C6 19 7 20 7 22" />
      <path d="M25 22 C25 20 26 19 27 19 C28 19 29 20 29 22" />
    </svg>
  ),
};

const LEARN_CARDS = [
  {
    icon: <Icons.QuranBook />,
    title: "Qur'an Reading",
    desc: "Correct pronunciation (Makharij) and fluent reading with daily practice and individual correction.",
  },
  {
    icon: <Icons.Tajweed />,
    title: "Tajweed",
    desc: "Rules of Tajweed taught systematically — from Noon Sakin to Madd — until recitation becomes beautiful.",
  },
  {
    icon: <Icons.Hands />,
    title: "Islamic Manners",
    desc: "Adab in speech, behaviour, and daily life rooted in Sunnah — inside the class and outside it.",
  },
  {
    icon: <Icons.Moon />,
    title: "Daily Duas",
    desc: "Morning and evening Duas, Duas for eating, sleeping, entering the masjid — memorised and understood.",
  },
  {
    icon: <Icons.Bulb />,
    title: "Basic Aqeedah",
    desc: "Core Islamic beliefs taught in a simple, age-appropriate way to build a firm foundation of faith.",
  },
  {
    icon: <Icons.Scroll />,
    title: "Islamic History",
    desc: "Stories of the Prophets, Sahabah, and early Muslims to inspire character and love for the Deen.",
  },
];

const TRUST_CARDS = [
  {
    icon: <Icons.GradCap />,
    title: "Qualified Teachers",
    desc: "Certified Aalim and Hafiz instructors with deep expertise in Qur'anic sciences and Tajweed.",
  },
  {
    icon: <Icons.Shield />,
    title: "Safe Environment",
    desc: "A nurturing, disciplined, and welcoming space where every child feels respected and secure.",
  },
  {
    icon: <Icons.Clipboard />,
    title: "Structured Curriculum",
    desc: "A well-planned syllabus with clear milestones ensuring consistent and measurable progress.",
  },
  {
    icon: <Icons.Leaf />,
    title: "Character Building",
    desc: "Education goes beyond recitation — we focus equally on Akhlaq, Adab, and Islamic values.",
  },
  {
    icon: <Icons.BarChart />,
    title: "Regular Progress",
    desc: "Parents are regularly informed about their child's performance, attendance, and development.",
  },
];

const TIMINGS = [
  {
    batch: "Morning Batch",
    time: "6:00 AM – 8:00 AM",
    days: "Monday – Saturday",
    icon: <Icons.Sunrise />,
  },
  {
    batch: "Evening Batch",
    time: "5:00 PM – 7:00 PM",
    days: "Monday – Saturday",
    icon: <Icons.Sunset />,
  },
  {
    batch: "Weekend Batch",
    time: "9:00 AM – 12:00 PM",
    days: "Friday & Saturday",
    icon: <Icons.Calendar />,
  },
];

const JOURNEY = [
  { step: "01", label: "Enroll Online", desc: "Fill the form and pay ₹100 registration fee" },
  { step: "02", label: "Registration", desc: "Receive your unique Registration ID instantly" },
  { step: "03", label: "Admission", desc: "Visit the maktab for document verification" },
  { step: "04", label: "Learning", desc: "Begin structured Qur'anic education" },
  { step: "05", label: "Progress", desc: "Regular assessments and parent updates" },
];

// Journey step SVG icons
const JourneyIcons = {
  Enroll: () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="20" height="24" rx="2" />
      <line x1="11" y1="12" x2="21" y2="12" />
      <line x1="11" y1="16" x2="21" y2="16" />
      <line x1="11" y1="20" x2="17" y2="20" />
      <path d="M19 20 L22 23 L27 18" />
    </svg>
  ),
  ID: () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="26" height="16" rx="3" />
      <circle cx="11" cy="16" r="3" />
      <line x1="17" y1="13" x2="25" y2="13" />
      <line x1="17" y1="17" x2="23" y2="17" />
      <line x1="17" y1="21" x2="21" y2="21" />
    </svg>
  ),
  Document: () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4 L20 4 L26 10 L26 28 L8 28 Z" />
      <path d="M20 4 L20 10 L26 10" />
      <line x1="12" y1="16" x2="22" y2="16" />
      <line x1="12" y1="20" x2="22" y2="20" />
      <line x1="12" y1="24" x2="18" y2="24" />
    </svg>
  ),
  Lamp: () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 6 A6 6 0 0 1 22 12 C22 15 20 17 20 19 L12 19 C12 17 10 15 10 12 A6 6 0 0 1 16 6Z" />
      <line x1="13" y1="22" x2="19" y2="22" />
      <line x1="14.5" y1="25" x2="17.5" y2="25" />
      <line x1="16" y1="3" x2="16" y2="5" />
      <line x1="22" y1="5" x2="21" y2="6.5" />
      <line x1="10" y1="5" x2="11" y2="6.5" />
    </svg>
  ),
  Growth: () => (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 28 L10 20 L16 24 L22 14 L28 8" />
      <circle cx="10" cy="20" r="2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="24" r="2" fill="currentColor" stroke="none" />
      <circle cx="22" cy="14" r="2" fill="currentColor" stroke="none" />
      <circle cx="28" cy="8" r="2" fill="currentColor" stroke="none" />
      <line x1="4" y1="28" x2="28" y2="28" />
    </svg>
  ),
};

const JOURNEY_ICONS = [
  <JourneyIcons.Enroll key="e" />,
  <JourneyIcons.ID key="id" />,
  <JourneyIcons.Document key="d" />,
  <JourneyIcons.Lamp key="l" />,
  <JourneyIcons.Growth key="g" />,
];

const TERMS = [
  ["Sincerity", "Ikhlas", <Icons.Dove key="d" />],
  ["Authentic Knowledge", "Ilm", <Icons.QuranBook key="q" />],
  ["Discipline & Respect", "Adab", <Icons.Leaf key="l" />],
  ["Love for Sunnah", "Ittiba'", <Icons.Sun key="s" />],
];

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("section-show");
        });
      },
      { threshold: 0.1 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background-50 text-text-900">
      {/* HERO */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-700 bg-primary-50 border border-primary-200 px-4 py-1.5 rounded-full mb-6">
          Est. Bihar, India
        </span>
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
          Maktab Meezan-ul-Qur&apos;an
        </h1>
        <p className="max-w-2xl mx-auto text-text-600 leading-relaxed text-lg">
          Nurturing young hearts with the light of the Holy Qur&apos;an —
          through proper Tajweed, Islamic manners, and spiritual guidance that
          shapes a generation of confident, practising Muslims.
        </p>
        <div className="mt-10 flex justify-center gap-8 md:gap-16 text-center flex-wrap">
          {[
            ["Qur'anic Education", "Core Focus"],
            ["Character & Adab", "Beyond Recitation"],
            ["Every Child", "Warmly Welcome"],
          ].map(([val, lbl]) => (
            <div key={lbl}>
              <p className="text-sm font-semibold text-primary-800">{val}</p>
              <p className="text-xs text-text-500 mt-0.5">{lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QIRAT */}
      <section className="reveal section-hidden bg-background-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium mb-4">Qur&apos;anic Recitation</h2>
          <p className="max-w-2xl mx-auto text-text-600 mb-10">
            Beautiful recitation of the Holy Qur&apos;an presented by Janab Qari Abul Kalam Sajjad Sahab during
            the International Religious Conference for World Peace at Khanqah-e-Sarwar-e-Aalam, Hyderabad.
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
      <section className="reveal section-hidden py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-sm border border-background-200">
          <div className="bg-primary-900 text-white p-10 md:p-14">
            <span className="text-primary-300 text-xs font-bold uppercase tracking-widest">Our Mission</span>
            <h2 className="text-2xl font-semibold mt-3 mb-5">Why the Maktab Exists</h2>
            <p className="text-primary-100 leading-relaxed">
              We exist to develop strong Qur&apos;anic recitation with proper Tajweed, instill Islamic manners
              (Akhlaq), and cultivate love for Salah and Sunnah. We balance knowledge (Ilm) with character
              (Adab), preparing students to grow as confident and practising Muslims who carry the
              Qur&apos;an in their hearts and their actions.
            </p>
          </div>
          <div className="bg-background-100 p-10 md:p-14">
            <span className="text-primary-700 text-xs font-bold uppercase tracking-widest">Our Vision</span>
            <h2 className="text-2xl font-semibold mt-3 mb-5">The Generation We Aim to Raise</h2>
            <p className="text-text-700 leading-relaxed">
              We envision raising a generation that recites the Qur&apos;an beautifully, understands Islamic
              values deeply, and represents the Ummah with excellence in character and conduct — a
              generation that is a source of pride for their families and the community.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT STUDENTS LEARN */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-700">Curriculum</span>
          <h2 className="text-3xl font-medium mt-2">What Students Learn</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {LEARN_CARDS.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-background-200 rounded-xl p-6 hover:shadow-md hover:border-primary-200 transition group"
            >
              <div className="text-primary-700 mb-4">{icon}</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-800 transition">{title}</h3>
              <p className="text-text-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PARENTS TRUST US */}
      <section className="reveal section-hidden bg-background-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-700">Trust</span>
            <h2 className="text-3xl font-medium mt-2">Why Parents Trust Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {TRUST_CARDS.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition border border-background-200"
              >
                <div className="text-primary-700 flex justify-center mb-3">{icon}</div>
                <h4 className="font-semibold text-sm mb-2">{title}</h4>
                <p className="text-text-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR TEACHERS */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-700">Faculty</span>
          <h2 className="text-3xl font-medium mt-2">Our Teachers</h2>
          <p className="max-w-2xl mx-auto text-text-600 mt-4 leading-relaxed">
            Qualified, experienced, and passionate about Islamic education — many holding formal Aalim /
            Hafiz certifications with deep expertise in Tajweed and Qur&apos;anic sciences.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Icons.GradCap />,
              title: "Qualified Scholars",
              desc: "Formal Islamic education with deep understanding of Qur'an and Sunnah.",
            },
            {
              icon: <Icons.Heart />,
              title: "Experienced Mentors",
              desc: "Years of teaching children with compassion, patience, and discipline.",
            },
            {
              icon: <Icons.Star />,
              title: "Role Models",
              desc: "Committed to exemplary Islamic character — both inside and outside the classroom.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
              <div className="text-primary-700 flex justify-center mb-4">{icon}</div>
              <h4 className="font-semibold text-lg mb-2">{title}</h4>
              <p className="text-text-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLASS TIMINGS */}
      <section className="reveal section-hidden bg-primary-900 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-300">Schedule</span>
            <h2 className="text-3xl font-medium mt-2 text-white">Class Timings</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TIMINGS.map(({ batch, time, days, icon }) => (
              <div key={batch} className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
                <div className="flex justify-center text-primary-200 mb-3">{icon}</div>
                <h4 className="font-semibold text-white text-lg mb-1">{batch}</h4>
                <p className="text-primary-200 font-medium text-sm mb-1">{time}</p>
                <p className="text-primary-300 text-xs">{days}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-primary-300 text-sm mt-8">
            Timings may vary — contact us to confirm the current schedule.
          </p>
        </div>
      </section>

      {/* STUDENT JOURNEY */}
      <section className="reveal section-hidden max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-700">Process</span>
          <h2 className="text-3xl font-medium mt-2">Your Child&apos;s Journey</h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-background-200" />
          <div className="grid md:grid-cols-5 gap-6 relative">
            {JOURNEY.map(({ step, label, desc }, i) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-900 text-white flex items-center justify-center mb-4 shadow-md z-10 relative">
                  {JOURNEY_ICONS[i]}
                </div>
                <h4 className="font-semibold text-sm mb-1">{label}</h4>
                <p className="text-text-500 text-xs leading-relaxed">{desc}</p>
                {i < JOURNEY.length - 1 && (
                  <div className="md:hidden w-0.5 h-6 bg-background-200 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="reveal section-hidden bg-background-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-700">Values</span>
            <h2 className="text-3xl font-medium mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TERMS.map(([value, arabic, icon]) => (
              <div
                key={value}
                className="bg-white rounded-xl p-6 text-center border border-background-200 hover:border-primary-200 hover:shadow-sm transition"
              >
                <div className="text-primary-700 flex justify-center mb-3">{icon}</div>
                <p className="font-semibold text-sm">{value}</p>
                <p className="text-primary-600 text-xs mt-1 font-medium">{arabic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HADITH */}
      <section className="reveal section-hidden bg-primary-800 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-5xl mb-6 opacity-30 font-serif">&ldquo;</div>
          <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-4">
            Indeed, the best among you are those who learn the Qur&apos;an and teach it.
          </p>
          <p className="text-primary-300 text-sm">— Prophet Muhammad ﷺ &nbsp;(Sahih Bukhari)</p>
          <p className="text-primary-200 mt-6 leading-relaxed max-w-xl mx-auto">
            At Maktab Meezan-ul-Qur&apos;an, we strive to live by this noble principle every single day.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal section-hidden max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="text-primary-700">
            <Icons.Mosque />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-medium mb-4">Ready to Enroll Your Child?</h2>
        <p className="text-text-600 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
          Give your child the gift of Qur&apos;anic education and Islamic values. The enrollment process
          takes just a few minutes online.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/enroll"
            className="bg-primary-900 text-white px-8 py-3.5 rounded-lg hover:bg-primary-700 transition font-semibold text-base"
          >
            Enroll Student
          </Link>
          <Link
            href="/contact"
            className="border border-primary-900 text-primary-900 px-8 py-3.5 rounded-lg hover:bg-primary-900 hover:text-white transition text-base"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;