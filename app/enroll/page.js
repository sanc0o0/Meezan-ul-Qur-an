"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";

const STEPS = ["Student Info", "Address", "Photo & Terms", "Payment"];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const SVG = {
  Mosque: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" y1="29" x2="30" y2="29" />
      <rect x="10" y="19" width="12" height="10" rx="1" />
      <path d="M13 29 L13 23 C13 21.3 14.3 20 16 20 C17.7 20 19 21.3 19 23 L19 29" />
      <path d="M10 19 C10 15 13 13 16 11 C19 13 22 15 22 19" />
      <line x1="16" y1="11" x2="16" y2="8" />
      <path d="M14 8 C14 6.3 14.9 5 16 5 C17.1 5 18 6.3 18 8" />
      <line x1="5" y1="29" x2="5" y2="23" />
      <line x1="27" y1="29" x2="27" y2="23" />
      <path d="M3 23 C3 21 4 20 5 20 C6 20 7 21 7 23" />
      <path d="M25 23 C25 21 26 20 27 20 C28 20 29 21 29 23" />
    </svg>
  ),
  CreditCard: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="28" height="18" rx="3" />
      <line x1="2" y1="13" x2="30" y2="13" />
      <line x1="7" y1="20" x2="12" y2="20" />
      <line x1="15" y1="20" x2="18" y2="20" />
    </svg>
  ),
  Shield: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 3 L27 7 L27 16 C27 22 22 26.5 16 29 C10 26.5 5 22 5 16 L5 7 Z" />
      <polyline points="11,16 14,19 21,12" />
    </svg>
  ),
  Upload: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M28 20 L28 26 C28 27.1 27.1 28 26 28 L6 28 C4.9 28 4 27.1 4 26 L4 20" />
      <polyline points="22,10 16,4 10,10" />
      <line x1="16" y1="4" x2="16" y2="22" />
    </svg>
  ),
  Person: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="10" r="5" />
      <path d="M4 28 C4 21 9 17 16 17 C23 17 28 21 28 28" />
    </svg>
  ),
  Check: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="2,8 6,12 14,4" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,5 5,12 12,19" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  Students: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="4" />
      <circle cx="22" cy="10" r="4" />
      <path d="M2 28 C2 22 5.6 18 10 18" />
      <path d="M30 28 C30 22 26.4 18 22 18" />
      <path d="M10 18 C10 18 13 16 16 16 C19 16 22 18 22 18 C22 22 19.3 28 16 28 C12.7 28 10 22 10 18Z" />
    </svg>
  ),
  GradCap: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="16,5 30,12 16,19 2,12" />
      <path d="M7 15 L7 22 C7 22 11 26 16 26 C21 26 25 22 25 22 L25 15" />
      <line x1="30" y1="12" x2="30" y2="20" />
    </svg>
  ),
  Lock: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="14" width="20" height="14" rx="3" />
      <path d="M10 14 L10 10 C10 6.7 12.7 4 16 4 C19.3 4 22 6.7 22 10 L22 14" />
      <circle cx="16" cy="21" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  QuranBook: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 6 C12 4 6 4 4 5 L4 27 C6 26 12 26 16 28 C20 26 26 26 28 27 L28 5 C26 4 20 4 16 6Z" />
      <line x1="16" y1="6" x2="16" y2="28" />
      <line x1="8" y1="10" x2="13" y2="10" />
      <line x1="8" y1="14" x2="13" y2="14" />
      <line x1="19" y1="10" x2="24" y2="10" />
      <line x1="19" y1="14" x2="24" y2="14" />
    </svg>
  ),
  Leaf: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 28 C16 28 16 14 28 6 C28 6 28 20 16 28Z" />
      <path d="M16 28 C16 28 16 18 8 14 C8 14 10 24 16 28Z" />
      <line x1="16" y1="28" x2="16" y2="22" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 3 L27 7 L27 16 C27 22 22 26.5 16 29 C10 26.5 5 22 5 16 L5 7 Z" />
      <polyline points="11,16 14,19 21,12" />
    </svg>
  ),
  Sound: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12 L8 20 L14 20 L22 26 L22 6 L14 12 Z" />
      <path d="M26 10 C28 12 28 20 26 22" />
    </svg>
  ),
  FormIcon: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="20" height="24" rx="2" />
      <line x1="11" y1="12" x2="21" y2="12" />
      <line x1="11" y1="16" x2="21" y2="16" />
      <line x1="11" y1="20" x2="17" y2="20" />
    </svg>
  ),
  PayIcon: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="28" height="18" rx="3" />
      <line x1="2" y1="13" x2="30" y2="13" />
      <circle cx="8" cy="21" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  ReviewIcon: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="16" r="12" />
      <polyline points="10,16 14,20 22,12" />
    </svg>
  ),
  SchoolIcon: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 28 L4 14 L16 6 L28 14 L28 28 Z" />
      <rect x="12" y="18" width="8" height="10" />
    </svg>
  ),
};

function EtherealBackground() {
  const feColorMatrixRef = useRef(null);
  const animFrameRef = useRef(0);
  const startRef = useRef(0);
  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const hue = ((ts - startRef.current) / 80) % 360;
      if (feColorMatrixRef.current)
        feColorMatrixRef.current.setAttribute("values", String(hue));
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);
  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #0d2618 0%, #1b4b30 45%, #0d2618 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -80,
          filter: "url(#ethereal-filter) blur(3px)",
        }}
      >
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="ethereal-filter">
              <feTurbulence
                result="undulation"
                numOctaves="3"
                baseFrequency="0.0006,0.0018"
                seed="3"
                type="turbulence"
              />
              <feColorMatrix
                ref={feColorMatrixRef}
                in="undulation"
                type="hueRotate"
                values="180"
              />
              <feColorMatrix
                in="dist"
                result="circulation"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="circulation"
                scale="70"
                result="dist"
              />
              <feDisplacementMap
                in="dist"
                in2="undulation"
                scale="70"
                result="output"
              />
            </filter>
          </defs>
        </svg>
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(66,189,119,0.22) 0%, transparent 70%), radial-gradient(ellipse 50% 70% at 75% 40%, rgba(40,113,72,0.28) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 55% 75%, rgba(13,38,24,0.5) 0%, transparent 60%)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
          opacity: 0.06,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(to bottom, transparent, rgba(13,38,24,0.4))",
        }}
      />
    </div>
  );
}

const S = {
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14,
    color: "#111827",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  },
  inputError: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #ef4444",
    fontSize: 14,
    color: "#111827",
    background: "#fff1f1",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 5,
    letterSpacing: "0.02em",
  },
  required: { color: "#ef4444", marginLeft: 2 },
  error: { fontSize: 11, color: "#ef4444", marginTop: 4 },
  btn: {
    padding: "11px 28px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    transition: "all 0.15s",
  },
  primaryBtn: { background: "#14532d", color: "#fff" },
  outlineBtn: {
    background: "#fff",
    color: "#374151",
    border: "1px solid #d1d5db",
  },
};

function Field({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={S.label}>
        {label}
        {required && <span style={S.required}>*</span>}
      </label>
      {children}
      {error && <p style={S.error}>{error}</p>}
    </div>
  );
}

function StepBar({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {STEPS.map((step, i) => {
        const done = i < current,
          active = i === current;
        return (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              flex: i < STEPS.length - 1 ? 1 : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: done || active ? "#14532d" : "#e5e7eb",
                  color: done || active ? "#fff" : "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {done ? <SVG.Check /> : i + 1}
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  marginTop: 4,
                  color: active ? "#14532d" : done ? "#6b7280" : "#9ca3af",
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  margin: "0 6px",
                  marginBottom: 18,
                  background: done ? "#14532d" : "#e5e7eb",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const METRICS = [
  { icon: <SVG.Students />, value: "150+", label: "Students Learning" },
  { icon: <SVG.GradCap />, value: "3+", label: "Years of Service" },
  { icon: <SVG.QuranBook />, value: "Qualified", label: "Islamic Teachers" },
  { icon: <SVG.Lock />, value: "100%", label: "Secure Registration" },
];

const WHY_CARDS = [
  {
    icon: <SVG.GradCap />,
    title: "Qualified Teachers",
    desc: "Learn under experienced Qur'an teachers with authentic Islamic knowledge and Hafiz certifications.",
  },
  {
    icon: <SVG.Sound />,
    title: "Tajweed Focused",
    desc: "Strong emphasis on correct Makharij and rules of Tajweed for beautiful, accurate recitation.",
  },
  {
    icon: <SVG.Leaf />,
    title: "Character Development",
    desc: "Islamic manners (Akhlaq) and values taught alongside Qur'anic education every day.",
  },
  {
    icon: <SVG.ShieldCheck />,
    title: "Safe Environment",
    desc: "A structured, nurturing and respectful space where every child feels secure and valued.",
  },
];

const HOW_STEPS = [
  {
    icon: <SVG.FormIcon />,
    label: "Fill Registration Form",
    desc: "Complete student & parent details",
  },
  {
    icon: <SVG.PayIcon />,
    label: "Pay ₹100 Fee",
    desc: "Secure payment via Razorpay",
  },
  {
    icon: <SVG.ReviewIcon />,
    label: "Application Review",
    desc: "We review your submission",
  },
  {
    icon: <SVG.SchoolIcon />,
    label: "Visit & Begin Learning",
    desc: "Complete admission at maktab",
  },
];

export default function EnrollPage() {
  const router = useRouter();
  const formRef = useRef(null); // wraps entire form section
  const formCardRef = useRef(null); // the white card — scroll target on step change

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const pendingRegId = useRef(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setFormState] = useState({
    studentName: "",
    dob: "",
    age: "",
    gender: "",
    fatherName: "",
    motherName: "",
    guardianOccupation: "",
    phone: "",
    alternatePhone: "",
    email: "",
    emergencyContact: "",
    guardianName: "",
    guardianRelation: "father",
    guardianEmail: "",
    houseNumber: "",
    village: "",
    city: "",
    state: "",
    pinCode: "",
    photoUrl: "",
  });

  const set = (key, val) => {
    setFormState((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  // ── Scroll to the form card top, not window top
  const scrollToFormCard = () => {
    if (formCardRef.current) {
      const NAVBAR_HEIGHT = 80; // adjust to match your navbar height
      const top =
        formCardRef.current.getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_HEIGHT -
        16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      const NAVBAR_HEIGHT = 80;
      const top =
        formRef.current.getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_HEIGHT -
        16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleDobChange = (val) => {
    set("dob", val);
    if (val) {
      const today = new Date(),
        birth = new Date(val);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      if (age >= 0) set("age", String(age));
    }
  };

  const handleGuardianRelationChange = (val) => {
    set("guardianRelation", val);
    if (val === "father" && !form.guardianName)
      set("guardianName", form.fatherName);
    else if (val === "mother" && !form.guardianName)
      set("guardianName", form.motherName);
  };

  const processFile = (file) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setErrors((e) => ({ ...e, photo: "Only JPG, JPEG, PNG allowed" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, photo: "File must be under 5 MB" }));
      return;
    }
    setErrors((e) => ({ ...e, photo: "" }));
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handlePhotoChange = (e) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  const uploadPhoto = async () => {
    if (!photoFile) return null;
    setPhotoUploading(true);
    try {
      const fd = new FormData();
      fd.append("photo", photoFile);
      const res = await fetch("/api/upload-photo", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      set("photoUrl", data.photoUrl);
      return data.photoUrl;
    } catch (err) {
      setErrors((e) => ({ ...e, photo: err.message }));
      return null;
    } finally {
      setPhotoUploading(false);
    }
  };

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.studentName.trim()) e.studentName = "Student name is required";
      if (!form.dob) e.dob = "Date of birth is required";
      if (!form.gender) e.gender = "Gender is required";
      if (!form.fatherName.trim()) e.fatherName = "Father's name is required";
      if (!form.motherName.trim()) e.motherName = "Mother's name is required";
      if (!form.phone.trim()) e.phone = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
        e.phone = "Enter a valid 10-digit Indian mobile number";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Enter a valid email address";
      if (!form.guardianRelation)
        e.guardianRelation = "Please select a relationship";
      if (!form.guardianName.trim())
        e.guardianName = "Guardian name is required";
      if (
        form.guardianEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.guardianEmail)
      )
        e.guardianEmail = "Enter a valid email address";
    }
    if (s === 1) {
      if (!form.houseNumber.trim()) e.houseNumber = "Required";
      if (!form.village.trim()) e.village = "Required";
      if (!form.city.trim()) e.city = "Required";
      if (!form.state) e.state = "Required";
      if (!form.pinCode.trim()) e.pinCode = "Required";
      else if (!/^\d{6}$/.test(form.pinCode))
        e.pinCode = "6-digit PIN required";
    }
    if (s === 2) {
      if (!termsAccepted) e.terms = "You must accept the terms to proceed";
    }
    return e;
  };

  // ── next/back scroll to the card, NOT to window top
  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
    scrollToFormCard();
  };

  const back = () => {
    setErrors({});
    setStep((s) => s - 1);
    scrollToFormCard();
  };

  const handlePayment = async () => {
    const e = validate(2);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setGlobalError("");
    try {
      let photoUrl = form.photoUrl;
      if (photoFile && !photoUrl) {
        photoUrl = await uploadPhoto();
        if (!photoUrl) {
          setSubmitting(false);
          return;
        }
      }

      const regRes = await fetch("/api/register-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: form.studentName,
          photoUrl: photoUrl || "",
          dob: form.dob,
          age: Number(form.age),
          gender: form.gender,
          fatherName: form.fatherName,
          motherName: form.motherName,
          guardianOccupation: form.guardianOccupation,
          phone: form.phone,
          guardianName: form.guardianName,
          guardianRelation: form.guardianRelation,
          guardianEmail: form.guardianEmail,
          alternatePhone: form.alternatePhone,
          email: form.email,
          emergencyContact: form.emergencyContact,
          address: {
            houseNumber: form.houseNumber,
            village: form.village,
            city: form.city,
            state: form.state,
            pinCode: form.pinCode,
          },
        }),
      });
      const regData = await regRes.json();
      if (!regRes.ok) throw new Error(regData.error || "Registration failed");
      const { registrationId } = regData;
      pendingRegId.current = registrationId;

      const orderRes = await fetch("/api/create-reg-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok)
        throw new Error(orderData.error || "Payment setup failed");

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Maktab Meezan-ul-Qur'an",
        description: "Student Registration Fee",
        order_id: orderData.orderId,
        prefill: {
          name: orderData.fatherName || form.fatherName,
          contact: form.phone,
          email: form.email || "",
        },
        theme: { color: "#14532d" },
        handler: async (response) => {
          const verifyRes = await fetch("/api/verify-reg-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registrationId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            pendingRegId.current = null;
            const params = new URLSearchParams({
              registrationId,
              studentName: verifyData.studentName,
              fatherName: verifyData.fatherName,
              paymentId: response.razorpay_payment_id,
            });
            router.push(`/registration-success?${params.toString()}`);
          } else {
            setGlobalError(
              "Payment verification failed. Please contact us with your payment ID.",
            );
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            if (pendingRegId.current) {
              fetch("/api/register-student", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ registrationId: pendingRegId.current }),
              }).catch(() => {});
              pendingRegId.current = null;
            }
            setSubmitting(false);
            setGlobalError(
              "Payment was not completed. Click Pay again whenever you're ready.",
            );
          },
        },
      });
      rzp.open();
    } catch (err) {
      setGlobalError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const inp = (key, props = {}) => (
    <input
      {...props}
      value={form[key]}
      onChange={(e) => set(key, e.target.value)}
      style={errors[key] ? S.inputError : S.input}
    />
  );
  const sel = (key, options, placeholder) => (
    <select
      value={form[key]}
      onChange={(e) => set(key, e.target.value)}
      style={{ ...(errors[key] ? S.inputError : S.input), cursor: "pointer" }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) =>
        typeof o === "string" ? (
          <option key={o} value={o.toLowerCase()}>
            {o}
          </option>
        ) : (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ),
      )}
    </select>
  );
  const grid2 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 16px",
  };

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      <div style={{ background: "#f4f7ee", minHeight: "100vh" }}>
        {/* HERO */}
        <ScrollReveal>
          <section
            style={{
              position: "relative",
              minHeight: 480,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 24px 60px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <EtherealBackground />
            <div style={{ position: "relative", zIndex: 10, maxWidth: 640 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(66,189,119,0.15)",
                  border: "1px solid rgba(66,189,119,0.3)",
                  borderRadius: 100,
                  padding: "6px 16px",
                  marginBottom: 24,
                }}
              >
                <div style={{ color: "#8ed7ae" }}>
                  <SVG.Mosque />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8ed7ae",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Islamic Education · Bihar, India
                </span>
              </div>
              <h1
                style={{
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 16px",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                Enroll Your Child in
                <br />
                <span style={{ color: "#68ca92" }}>Meezan-ul-Qur&apos;an</span>
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.72)",
                  margin: "0 0 32px",
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}
              >
                Help your child learn the Holy Qur&apos;an with proper Tajweed,
                Islamic manners, daily duas, and authentic guidance in a
                nurturing environment.
              </p>
              <button
                onClick={scrollToForm}
                style={{
                  ...S.btn,
                  background: "#42bd77",
                  color: "#fff",
                  fontSize: 15,
                  padding: "14px 32px",
                  boxShadow: "0 4px 24px rgba(66,189,119,0.35)",
                }}
              >
                Start Registration
              </button>
            </div>
          </section>
        </ScrollReveal>

        {/* TRUST METRICS */}
        <ScrollReveal>
          <section
            style={{ background: "#fff", borderBottom: "1px solid #e9efdc" }}
          >
            <div
              style={{
                maxWidth: 800,
                margin: "0 auto",
                padding: "32px 24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 0,
              }}
            >
              {METRICS.map(({ icon, value, label }, i) => (
                <div
                  key={label}
                  style={{
                    textAlign: "center",
                    padding: "16px 12px",
                    borderRight:
                      i < METRICS.length - 1 ? "1px solid #e9efdc" : "none",
                  }}
                >
                  <div
                    style={{
                      color: "#287148",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    {icon}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#0d2618",
                      marginBottom: 2,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#758646",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* WHY CHOOSE US */}
        <ScrollReveal>
          <section
            style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px" }}
          >
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#287148",
                }}
              >
                Why Parents Choose Us
              </span>
              <h2
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#0d2618",
                  margin: "8px 0 0",
                }}
              >
                A trusted foundation for your child
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
              }}
            >
              {WHY_CARDS.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: "#fff",
                    border: "1px solid #d2deba",
                    borderRadius: 14,
                    padding: "24px 20px",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(40,113,72,0.12)";
                    e.currentTarget.style.borderColor = "#8ed7ae";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#d2deba";
                  }}
                >
                  <div style={{ color: "#287148", marginBottom: 12 }}>
                    {icon}
                  </div>
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0d2618",
                      margin: "0 0 6px",
                    }}
                  >
                    {title}
                  </h4>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#758646",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* HOW IT WORKS */}
        <ScrollReveal>
          <section
            style={{
              background: "#fff",
              borderTop: "1px solid #e9efdc",
              borderBottom: "1px solid #e9efdc",
            }}
          >
            <div
              style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}
            >
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#287148",
                  }}
                >
                  Process
                </span>
                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#0d2618",
                    margin: "8px 0 0",
                  }}
                >
                  How Enrollment Works
                </h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: 8,
                }}
              >
                {HOW_STEPS.map(({ icon, label, desc }, i) => (
                  <div
                    key={label}
                    style={{ textAlign: "center", padding: "16px 12px" }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: "#0d2618",
                        color: "#68ca92",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                      }}
                    >
                      {icon}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#287148",
                        marginBottom: 4,
                        letterSpacing: "0.06em",
                      }}
                    >
                      STEP {i + 1}
                    </div>
                    <h4
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0d2618",
                        margin: "0 0 4px",
                      }}
                    >
                      {label}
                    </h4>
                    <p style={{ fontSize: 11, color: "#758646", margin: 0 }}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* FORM — ref on the outer wrapper for "Start Registration" CTA */}
        <ScrollReveal>
          <div
            ref={formRef}
            style={{
              maxWidth: 660,
              margin: "0 auto",
              padding: "48px 16px 64px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "#d9f2e4",
                  marginBottom: 14,
                }}
              >
                <div style={{ color: "#1b4b30" }}>
                  <SVG.Mosque />
                </div>
              </div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0d2618",
                  margin: "0 0 6px",
                }}
              >
                Student Enrollment
              </h2>
              <p style={{ fontSize: 13, color: "#758646", margin: 0 }}>
                Maktab Meezan-ul-Qur&apos;an · Registration Fee ₹100
              </p>
            </div>

            {/* ── formCardRef goes on the white card so next/back scroll here */}
            <div
              ref={formCardRef}
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid #d2deba",
                padding: "30px 26px",
                boxShadow: "0 4px 24px rgba(13,38,24,0.06)",
              }}
            >
              <StepBar current={step} />

              {globalError && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: 8,
                    padding: "10px 14px",
                    marginBottom: 20,
                    fontSize: 13,
                    color: "#dc2626",
                  }}
                >
                  {globalError}
                </div>
              )}

              {/* STEP 0 */}
              {step === 0 && (
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0d2618",
                      margin: "0 0 20px",
                    }}
                  >
                    Student Information
                  </h3>
                  <Field
                    label="Student Full Name"
                    required
                    error={errors.studentName}
                  >
                    {inp("studentName", {
                      placeholder: "Enter student's full name",
                    })}
                  </Field>
                  <div style={grid2}>
                    <Field label="Date of Birth" required error={errors.dob}>
                      <input
                        type="date"
                        value={form.dob}
                        onChange={(e) => handleDobChange(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        style={errors.dob ? S.inputError : S.input}
                      />
                    </Field>
                    <Field label="Age" error={errors.age}>
                      <input
                        value={form.age}
                        readOnly
                        placeholder="Auto-calculated"
                        style={{ ...S.input, background: "#f4f7ee" }}
                      />
                    </Field>
                  </div>
                  <Field label="Gender" required error={errors.gender}>
                    {sel(
                      "gender",
                      [
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ],
                      "Select gender",
                    )}
                  </Field>
                  <div style={grid2}>
                    <Field
                      label="Father's Name"
                      required
                      error={errors.fatherName}
                    >
                      {inp("fatherName", { placeholder: "Father's full name" })}
                    </Field>
                    <Field
                      label="Mother's Name"
                      required
                      error={errors.motherName}
                    >
                      {inp("motherName", { placeholder: "Mother's full name" })}
                    </Field>
                  </div>
                  <Field
                    label="Guardian's Occupation"
                    error={errors.guardianOccupation}
                  >
                    {inp("guardianOccupation", {
                      placeholder: "e.g. Farmer, Teacher, Business",
                    })}
                  </Field>
                  <Field
                    label="Primary Contact Number"
                    required
                    error={errors.phone}
                  >
                    {inp("phone", {
                      type: "tel",
                      placeholder: "10-digit mobile number",
                      maxLength: 10,
                    })}
                  </Field>
                  <div style={grid2}>
                    <Field
                      label="Alternate Phone"
                      error={errors.alternatePhone}
                    >
                      {inp("alternatePhone", {
                        type: "tel",
                        placeholder: "Optional",
                        maxLength: 10,
                      })}
                    </Field>
                    <Field
                      label="Emergency Contact"
                      error={errors.emergencyContact}
                    >
                      {inp("emergencyContact", {
                        type: "tel",
                        placeholder: "Optional",
                        maxLength: 10,
                      })}
                    </Field>
                  </div>
                  <Field label="Email Address" error={errors.email}>
                    {inp("email", { type: "email", placeholder: "Optional" })}
                  </Field>

                  {/* Guardian section */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "14px 0 10px",
                      borderTop: "1px solid #e9efdc",
                      marginTop: 4,
                    }}
                  >
                    <div style={{ color: "#287148" }}>
                      <SVG.Person />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#0d2618",
                          margin: 0,
                        }}
                      >
                        Responsible Guardian
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#758646",
                          margin: "2px 0 0",
                        }}
                      >
                        Who should we contact and send the receipt to?
                      </p>
                    </div>
                  </div>
                  <Field
                    label="Guardian Relationship"
                    required
                    error={errors.guardianRelation}
                  >
                    <select
                      value={form.guardianRelation}
                      onChange={(e) =>
                        handleGuardianRelationChange(e.target.value)
                      }
                      style={{
                        ...(errors.guardianRelation ? S.inputError : S.input),
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select relationship</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="other">
                        Other (Uncle, Relative, etc.)
                      </option>
                    </select>
                  </Field>
                  <Field
                    label="Guardian Full Name"
                    required
                    error={errors.guardianName}
                  >
                    {inp("guardianName", {
                      placeholder:
                        form.guardianRelation === "father"
                          ? "Same as father — or enter another name"
                          : form.guardianRelation === "mother"
                            ? "Same as mother — or enter another name"
                            : "Full name of the responsible person",
                    })}
                  </Field>
                  <Field label="Guardian Email" error={errors.guardianEmail}>
                    {inp("guardianEmail", {
                      type: "email",
                      placeholder: "Receipt & updates will be sent here",
                    })}
                  </Field>
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0d2618",
                      margin: "0 0 20px",
                    }}
                  >
                    Address Information
                  </h3>
                  <Field
                    label="House Number / Area"
                    required
                    error={errors.houseNumber}
                  >
                    {inp("houseNumber", {
                      placeholder: "e.g. H.No. 12, Near Masjid",
                    })}
                  </Field>
                  <Field
                    label="Village / Locality"
                    required
                    error={errors.village}
                  >
                    {inp("village", {
                      placeholder: "Village or locality name",
                    })}
                  </Field>
                  <div style={grid2}>
                    <Field label="City" required error={errors.city}>
                      {inp("city", { placeholder: "City name" })}
                    </Field>
                    <Field label="PIN Code" required error={errors.pinCode}>
                      {inp("pinCode", {
                        placeholder: "6-digit PIN",
                        maxLength: 6,
                      })}
                    </Field>
                  </div>
                  <Field label="State" required error={errors.state}>
                    {sel("state", INDIAN_STATES, "Select state")}
                  </Field>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#0d2618",
                      margin: "0 0 20px",
                    }}
                  >
                    Photo & Terms
                  </h3>
                  <Field label="Student Photograph" error={errors.photo}>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      style={{
                        border: `2px dashed ${errors.photo ? "#ef4444" : dragOver ? "#287148" : "#b4e4c9"}`,
                        borderRadius: 12,
                        padding: "24px 20px",
                        textAlign: "center",
                        cursor: "pointer",
                        background: dragOver ? "#ecfdf5" : "#f4f7ee",
                        transition: "all 0.2s",
                      }}
                    >
                      {photoPreview ? (
                        <div>
                          <img
                            src={photoPreview}
                            alt="Preview"
                            style={{
                              width: 84,
                              height: 84,
                              borderRadius: "50%",
                              objectFit: "cover",
                              margin: "0 auto 10px",
                              display: "block",
                              border: "3px solid #b4e4c9",
                            }}
                          />
                          <p
                            style={{
                              fontSize: 12,
                              color: "#758646",
                              margin: 0,
                            }}
                          >
                            Click or drag to change photo
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div
                            style={{
                              color: "#287148",
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: 10,
                            }}
                          >
                            <SVG.Upload />
                          </div>
                          <p
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#0d2618",
                              margin: "0 0 4px",
                            }}
                          >
                            Upload student photo
                          </p>
                          <p
                            style={{
                              fontSize: 11,
                              color: "#92a758",
                              margin: 0,
                            }}
                          >
                            Drag & drop or click · JPG, JPEG, PNG · Max 5 MB
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                  </Field>
                  <div
                    style={{
                      background: "#f4f7ee",
                      border: "1px solid #d2deba",
                      borderRadius: 12,
                      padding: "16px",
                      marginBottom: 20,
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0d2618",
                        margin: "0 0 12px",
                      }}
                    >
                      Terms & Conditions
                    </h4>
                    {[
                      "I confirm that all information provided is accurate.",
                      "I understand that the ₹100 registration fee is non-refundable.",
                      "I understand that registration does not guarantee admission.",
                      "I agree to send my child to the listed maktab location for study if accepted.",
                      "The institution reserves the right to approve or reject applications.",
                    ].map((term, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 8,
                          marginBottom: 8,
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: "#287148",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                          }}
                        >
                          <SVG.Check />
                        </div>
                        <p
                          style={{
                            fontSize: 12,
                            color: "#374151",
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {term}
                        </p>
                      </div>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        marginTop: 14,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setTermsAccepted(!termsAccepted);
                        setErrors((e) => ({ ...e, terms: "" }));
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 5,
                          flexShrink: 0,
                          border: `2px solid ${termsAccepted ? "#14532d" : errors.terms ? "#ef4444" : "#b4e4c9"}`,
                          background: termsAccepted ? "#14532d" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {termsAccepted && <SVG.Check />}
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#0d2618",
                          margin: 0,
                        }}
                      >
                        I have read and agree to all the terms above
                      </p>
                    </div>
                    {errors.terms && (
                      <p style={{ ...S.error, marginTop: 6 }}>{errors.terms}</p>
                    )}
                  </div>
                  <div
                    style={{
                      background: "#ecfdf5",
                      border: "1px solid #b4e4c9",
                      borderRadius: 12,
                      padding: "14px 16px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#14532d",
                        margin: "0 0 10px",
                      }}
                    >
                      Registration Summary
                    </h4>
                    {[
                      ["Student", form.studentName],
                      ["Father", form.fatherName],
                      ["Mother", form.motherName],
                      ["DOB", form.dob],
                      ["Gender", form.gender],
                      ["Phone", form.phone],
                      ["City", form.city],
                      ["State", form.state],
                    ].map(
                      ([k, v]) =>
                        v && (
                          <div
                            key={k}
                            style={{ display: "flex", gap: 8, marginBottom: 4 }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                color: "#6b7280",
                                minWidth: 90,
                              }}
                            >
                              {k}:
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "#0d2618",
                                textTransform: "capitalize",
                              }}
                            >
                              {v}
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "#ecfdf5",
                      border: "2px solid #b4e4c9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      color: "#14532d",
                    }}
                  >
                    <SVG.CreditCard />
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#0d2618",
                      margin: "0 0 6px",
                    }}
                  >
                    Complete Payment
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#758646",
                      margin: "0 0 24px",
                    }}
                  >
                    Pay the one-time registration fee to complete enrollment
                  </p>
                  <div
                    style={{
                      background: "#ecfdf5",
                      border: "1px solid #b4e4c9",
                      borderRadius: 14,
                      padding: "22px",
                      marginBottom: 24,
                      display: "inline-block",
                      minWidth: 200,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        color: "#758646",
                        margin: "0 0 4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Registration Fee
                    </p>
                    <p
                      style={{
                        fontSize: 40,
                        fontWeight: 900,
                        color: "#14532d",
                        margin: "0 0 4px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      ₹100
                    </p>
                    <p style={{ fontSize: 11, color: "#92a758", margin: 0 }}>
                      One-time · Non-refundable
                    </p>
                  </div>
                  <div style={{ marginBottom: 24, textAlign: "left" }}>
                    {[
                      ["Student", form.studentName],
                      ["Father", form.fatherName],
                      ["Phone", form.phone],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "9px 0",
                          borderBottom: "1px solid #e9efdc",
                          fontSize: 13,
                        }}
                      >
                        <span style={{ color: "#758646" }}>{k}</span>
                        <span style={{ fontWeight: 600, color: "#0d2618" }}>
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handlePayment}
                    disabled={submitting}
                    style={{
                      ...S.btn,
                      ...S.primaryBtn,
                      width: "100%",
                      fontSize: 15,
                      padding: "14px",
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting
                      ? "Processing…"
                      : "Pay ₹100 & Complete Registration"}
                  </button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      marginTop: 10,
                      color: "#92a758",
                      fontSize: 11,
                    }}
                  >
                    <SVG.Shield />
                    <span>Secured by Razorpay</span>
                  </div>
                </div>
              )}

              {/* Navigation */}
              {step < 3 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 28,
                    paddingTop: 20,
                    borderTop: "1px solid #e9efdc",
                  }}
                >
                  {step > 0 ? (
                    <button
                      onClick={back}
                      style={{
                        ...S.btn,
                        ...S.outlineBtn,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <SVG.ArrowLeft /> Back
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={
                      step === 2
                        ? () => {
                            const e = validate(2);
                            if (Object.keys(e).length) {
                              setErrors(e);
                              return;
                            }
                            setStep(3);
                            scrollToFormCard();
                          }
                        : next
                    }
                    disabled={photoUploading}
                    style={{
                      ...S.btn,
                      ...S.primaryBtn,
                      opacity: photoUploading ? 0.7 : 1,
                      cursor: photoUploading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {step === 2 ? "Review & Pay" : "Continue"}{" "}
                    <SVG.ArrowRight />
                  </button>
                </div>
              )}
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#a8b979",
                marginTop: 18,
              }}
            >
              Maktab Meezan-ul-Qur&apos;an · Bihar, India
            </p>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
