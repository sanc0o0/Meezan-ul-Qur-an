"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

const MAKTAB_ADDRESS = "Maktab Meezan-ul-Qur'an, Bihar, India";
const MAKTAB_PHONE = "+91 97698 47703";
const WHATSAPP_NUMBER = "919769847703";

function fmtDate(d) {
  return new Date(d).toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// SVG icons — no emojis
const Ic = {
  Check: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#14532d"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Download: () => (
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Share: () => (
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Whatsapp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
  Home: () => (
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  MapPin: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.37 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Step: ({ n }) => (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "#14532d",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  ),
};

function BtnOutline({ onClick, children, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "11px 10px",
        borderRadius: 10,
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        border: "1px solid #d1d5db",
        background: "#fff",
        color: "#374151",
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const registrationId = params.get("registrationId") || "—";
  const studentName = params.get("studentName") || "—";
  const fatherName = params.get("fatherName") || "—";
  const paymentId = params.get("paymentId") || "—";
  const now = new Date().toISOString();

  const handleDownload = () => {
    const content = [
      "MAKTAB MEEZAN-UL-QUR'AN",
      "Student Registration Receipt",
      "================================",
      `Registration ID : ${registrationId}`,
      `Student Name    : ${studentName}`,
      `Father's Name   : ${fatherName}`,
      `Payment ID      : ${paymentId}`,
      `Payment Status  : PAID`,
      `Amount Paid     : Rs.100`,
      `Date & Time     : ${fmtDate(now)}`,
      "================================",
      `Maktab Address  : ${MAKTAB_ADDRESS}`,
      `Contact         : ${MAKTAB_PHONE}`,
      "================================",
      "Please visit the maktab for further admission procedures.",
      "May Allah accept your effort. Ameen.",
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MMQ-Receipt-${registrationId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = `Alhamdulillah! I just registered my child at Maktab Meezan-ul-Qur'an.\n\nRegistration ID: ${registrationId}\nStudent: ${studentName}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Registration Successful", text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Assalamu Alaikum, I have registered my child at Maktab Meezan-ul-Qur'an. Registration ID: ${registrationId}, Student: ${studentName}. Please guide me for the next steps.`)}`;

  return (
    <ScrollReveal>
      <div
        style={{
          minHeight: "100vh",
          background: "#f9fafb",
          padding: "32px 16px 60px",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
        {/* Header card */}
        <div
          style={{
            background: "#14532d",
            borderRadius: "16px 16px 0 0",
            padding: "32px 24px",
            textAlign: "center",
          }}
        >
          {/* Logo as centerpiece */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "rgba(255,255,255,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              padding: 6,
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <Image
              src={logo}
              alt="Maktab Meezan-ul-Qur'an"
              width={56}
              height={56}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 4px",
            }}
          >
            Registration Successful
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#bbf7d0",
              margin: "0 0 2px",
              fontStyle: "italic",
            }}
          >
            JazakAllahu Khairan
          </p>
          <p
            style={{ fontSize: 12, color: "rgba(187,247,208,0.7)", margin: 0 }}
          >
            Your child has been registered at the Maktab
          </p>
        </div>

        {/* Registration ID highlight */}
        <div
          style={{
            background: "#fff",
            borderLeft: "1px solid #e5e7eb",
            borderRight: "1px solid #e5e7eb",
            padding: "20px 24px",
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          <div
            style={{
              background: "#ecfdf5",
              border: "1px solid #bbf7d0",
              borderRadius: 10,
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 10,
                color: "#6b7280",
                margin: "0 0 4px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Registration ID
            </p>
            <p
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#14532d",
                margin: 0,
                letterSpacing: "0.06em",
                fontFamily: "monospace",
              }}
            >
              {registrationId}
            </p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>
              Keep this ID for your records
            </p>
          </div>
        </div>

        {/* Details */}
        <div
          style={{
            background: "#fff",
            borderLeft: "1px solid #e5e7eb",
            borderRight: "1px solid #e5e7eb",
            padding: "0 24px",
          }}
        >
          {[
            ["Student Name", studentName],
            ["Father's Name", fatherName],
            ["Payment Status", "Paid"],
            ["Amount Paid", "Rs. 100"],
            ["Payment ID", paymentId],
            ["Date & Time", fmtDate(now)],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: "11px 0",
                borderBottom: "1px solid #f3f4f6",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  minWidth: 110,
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: label === "Payment Status" ? "#14532d" : "#111827",
                  textAlign: "right",
                  wordBreak: "break-all",
                }}
              >
                {label === "Payment Status" ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Ic.Check />
                    {value}
                  </span>
                ) : (
                  value
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Next steps */}
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderLeft: "1px solid #fde68a",
            borderRight: "1px solid #fde68a",
            padding: "20px 24px",
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#92400e",
              margin: "0 0 14px",
            }}
          >
            Next Steps
          </p>
          <StaggerContainer stagger={0.12}>
            {[
              "Your registration is complete and payment confirmed.",
              "Bring your child to the Maktab for physical admission verification.",
              "Carry original documents: birth certificate, address proof, and photos.",
              "Meet the administration and complete the admission process.",
            ].map((step, i) => (
              <StaggerItem key={i}>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: i < 3 ? 10 : 0,
                  }}
                >
                  <Ic.Step n={i + 1} />
                  <p
                    style={{
                      fontSize: 12,
                      color: "#78350f",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {step}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid #fde68a",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <Ic.MapPin />
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#92400e",
                  margin: 0,
                }}
              >
                {MAKTAB_ADDRESS}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Ic.Phone />
              <p style={{ fontSize: 12, color: "#78350f", margin: 0 }}>
                {MAKTAB_PHONE}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderTop: "none",
            borderRadius: "0 0 16px 16px",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <BtnOutline onClick={handleDownload}>
            <Ic.Download /> Download Receipt
          </BtnOutline>
          <BtnOutline onClick={handleShare}>
            <Ic.Share /> Share
          </BtnOutline>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "11px 10px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              border: "none",
              background: "#25d366",
              color: "#fff",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            <Ic.Whatsapp /> WhatsApp Us
          </a>
          <Link
            href="/"
            style={{
              padding: "11px 10px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              border: "none",
              background: "#14532d",
              color: "#fff",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            <Ic.Home /> Back to Home
          </Link>
        </div>

        {/* Footer blessing */}
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#9ca3af",
            marginTop: 20,
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          May Allah bless your family and increase your child
          <br />
          in beneficial knowledge. Ameen.
        </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function RegistrationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "#6b7280", fontSize: 14 }}>Loading…</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
