// FILE: components/RegistrationDetail.js

"use client";

import { useState } from "react";
import Image from "next/image";

function Field({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: 12 }}>
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "#9ca3af",
          margin: "0 0 3px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#111827",
          margin: 0,
          wordBreak: "break-word",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#14532d",
          margin: "0 0 10px",
          paddingBottom: 6,
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Full-screen image lightbox
function Lightbox({ src, alt, onClose }) {
  const [scale, setScale] = useState(1);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "rgba(255,255,255,0.15)",
          border: "none",
          color: "#fff",
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>

      {/* Zoom controls */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
        }}
      >
        {[
          {
            label: "−",
            action: () => setScale((s) => Math.max(0.5, s - 0.25)),
          },
          { label: `${Math.round(scale * 100)}%`, action: () => setScale(1) },
          { label: "+", action: () => setScale((s) => Math.min(3, s + 0.25)) },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={(e) => {
              e.stopPropagation();
              action();
            }}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.2s",
          maxWidth: "90vw",
          maxHeight: "80vh",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: 8,
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

export default function RegistrationDetail({ registration, onClose }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!registration) return null;
  const r = registration;

  const addr = r.address
    ? `${r.address.houseNumber}, ${r.address.village}, ${r.address.city}, ${r.address.state} - ${r.address.pinCode}`
    : "—";

  // Resolve guardian display
  const guardianName = r.guardianName || r.fatherName || "—";
  const guardianRelLabel =
    r.guardianRelation === "father"
      ? "Father"
      : r.guardianRelation === "mother"
        ? "Mother"
        : "Guardian";
  const guardianEmail = r.guardianEmail || r.email || "—";

  return (
    <>
      {lightboxOpen && r.photoUrl && (
        <Lightbox
          src={r.photoUrl}
          alt={r.studentName}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1000,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "20px 12px",
          overflowY: "auto",
        }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 16,
            width: "100%",
            maxWidth: 560,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            overflow: "hidden",
            margin: "auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#14532d",
              padding: "20px 20px 16px",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            {/* Clickable photo → lightbox */}
            <div
              onClick={() => r.photoUrl && setLightboxOpen(true)}
              title={r.photoUrl ? "Click to view full photo" : ""}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                flexShrink: 0,
                background: "rgba(255,255,255,0.2)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#fff",
                fontWeight: 700,
                cursor: r.photoUrl ? "zoom-in" : "default",
                border: r.photoUrl ? "2px solid rgba(255,255,255,0.4)" : "none",
                transition: "opacity 0.15s",
              }}
            >
              {r.photoUrl ? (
                <Image
                  width={64}
                  height={64}
                  src={r.photoUrl}
                  alt={r.studentName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                (r.studentName?.[0] ?? "?").toUpperCase()
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 2px",
                }}
              >
                {r.studentName}
              </h2>
              <p style={{ fontSize: 12, color: "#bbf7d0", margin: "0 0 6px" }}>
                {r.registrationId}
              </p>
              {r.photoUrl && (
                <button
                  onClick={() => setLightboxOpen(true)}
                  style={{
                    fontSize: 10,
                    color: "rgba(187,247,208,0.8)",
                    background: "transparent",
                    border: "1px solid rgba(187,247,208,0.3)",
                    padding: "2px 8px",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  View Photo
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#fff",
                width: 28,
                height: 28,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontFamily: "inherit",
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div
            style={{ padding: "20px", maxHeight: "72vh", overflowY: "auto" }}
          >
            <Section title="Student Information">
              <Field label="Full Name" value={r.studentName} />
              <Field label="Date of Birth" value={r.dob} />
              <Field label="Age" value={r.age ? `${r.age} years` : null} />
              <Field label="Gender" value={r.gender} />
            </Section>

            <Section title="Parent Information">
              <Field label="Father's Name" value={r.fatherName} />
              <Field label="Mother's Name" value={r.motherName} />
              <Field label="Occupation" value={r.guardianOccupation} />
            </Section>

            {/* Responsible Guardian — highlighted */}
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#14532d",
                  margin: "0 0 10px",
                  paddingBottom: 6,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Responsible Guardian
              </p>
              <div
                style={{
                  background: "#ecfdf5",
                  border: "1px solid #bbf7d0",
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 16px",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "#6b7280",
                      margin: "0 0 3px",
                    }}
                  >
                    Name
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#0d2618",
                      margin: 0,
                    }}
                  >
                    {guardianName}
                  </p>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "#6b7280",
                      margin: "0 0 3px",
                    }}
                  >
                    Relation
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#0d2618",
                      margin: 0,
                    }}
                  >
                    {guardianRelLabel}
                  </p>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: "#6b7280",
                      margin: "0 0 3px",
                    }}
                  >
                    Email (receipt sent to)
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#0d2618",
                      margin: 0,
                      wordBreak: "break-all",
                    }}
                  >
                    {guardianEmail}
                  </p>
                </div>
              </div>
            </div>

            <Section title="Contact Details">
              <Field label="Primary Phone" value={r.phone} />
              <Field label="Alternate Phone" value={r.alternatePhone} />
              <Field label="Emergency" value={r.emergencyContact} />
            </Section>

            {/* Address — full width */}
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#14532d",
                  margin: "0 0 10px",
                  paddingBottom: 6,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Address
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827",
                  margin: 0,
                }}
              >
                {addr}
              </p>
            </div>

            <Section title="Payment Information">
              <Field
                label="Payment Status"
                value={r.paymentStatus === "paid" ? "Paid" : r.paymentStatus}
              />
              <Field label="Amount" value="Rs. 100" />
              <Field label="Payment ID" value={r.razorpay_payment_id} />
              <Field label="Order ID" value={r.razorpay_order_id} />
            </Section>

            <div style={{ marginBottom: 8 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#14532d",
                  margin: "0 0 10px",
                  paddingBottom: 6,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Registered On
              </p>
              <p style={{ fontSize: 13, color: "#111827", margin: 0 }}>
                {new Date(r.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
