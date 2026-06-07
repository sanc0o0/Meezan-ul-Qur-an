// FILE: app/admin/page.js
// CHANGE: added <colgroup> with fixed widths to the desktop table,
//         added whiteSpace:"nowrap" + maxWidth + textOverflow to Student cell,
//         everything else is identical to what you sent.

"use client";
import { useEffect, useState, useMemo } from "react";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RegistrationDetail from "@/components/RegistrationDetail";

const fmt = (n) =>
  Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
const fmtDate = (d) =>
  new Date(d).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const fmtDateShort = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Ic = {
  Donate: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Reg: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Analytics: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Search: () => (
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Download: () => (
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Phone: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.37 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Copy: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  ChevronDown: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

function StatCard({ label, value, sub, accentBorder, spark }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${accentBorder ?? "#e5e7eb"}`,
        borderRadius: 12,
        padding: "14px 16px",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#9ca3af",
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#111827",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {value}
          </p>
          {sub && (
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>
              {sub}
            </p>
          )}
        </div>
        {spark && <Sparkline values={spark} />}
      </div>
    </div>
  );
}

function Sparkline({ values }) {
  if (!values?.length || values.every((v) => v === 0)) return null;
  const max = Math.max(...values, 1),
    W = 72,
    H = 24;
  const pts = values.map(
    (v, i) => `${(i / (values.length - 1)) * W},${H - (v / max) * H}`,
  );
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: 72, height: 24, flexShrink: 0 }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="spk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M${pts.join("L")}L${W},${H}L0,${H}Z`} fill="url(#spk)" />
      <path
        d={`M${pts.join("L")}`}
        fill="none"
        stroke="#16a34a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyChip({ text }) {
  const [copied, setCopied] = useState(false);
  if (!text || text === "N/A")
    return (
      <span style={{ color: "#9ca3af", fontSize: 12, fontStyle: "italic" }}>
        N/A
      </span>
    );
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      style={{
        fontFamily: "monospace",
        fontSize: 11,
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        color: "#374151",
        padding: "3px 8px",
        borderRadius: 6,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        maxWidth: "100%",
      }}
    >
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: 160,
        }}
      >
        {text}
      </span>
      <span style={{ flexShrink: 0, color: "#9ca3af" }}>
        {copied ? "✓" : <Ic.Copy />}
      </span>
    </button>
  );
}

function filterByDate(list, dateFilter) {
  const now = new Date();
  return list.filter((item) => {
    const d = new Date(item.createdAt);
    if (dateFilter === "today") return d.toDateString() === now.toDateString();
    if (dateFilter === "week") {
      const w = new Date(now);
      w.setDate(now.getDate() - 7);
      return d >= w;
    }
    if (dateFilter === "month")
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    return true;
  });
}

function exportCSV(registrations) {
  const headers = [
    "Student Name",
    "Father Name",
    "Mother Name",
    "Age",
    "Gender",
    "Contact",
    "Alternate Contact",
    "Email",
    "Address",
    "City",
    "State",
    "PIN",
    "Registration Date",
    "Registration ID",
    "Payment ID",
  ];
  const rows = registrations.map((r) => [
    r.studentName,
    r.fatherName,
    r.motherName,
    r.age,
    r.gender,
    r.phone,
    r.alternatePhone || "",
    r.email || "",
    `${r.address?.houseNumber || ""} ${r.address?.village || ""}`.trim(),
    r.address?.city || "",
    r.address?.state || "",
    r.address?.pinCode || "",
    fmtDateShort(r.createdAt),
    r.registrationId,
    r.razorpay_payment_id || "",
  ]);
  const csv = [headers, ...rows]
    .map((row) =>
      row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `MMQ-Registrations-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const PAGE_SIZE = 10;

// ── Column widths — declared outside to prevent re-creation on render
const COL_WIDTHS = [
  "52px",
  "220px",
  "160px",
  "150px",
  "60px",
  "110px",
  "110px",
  "130px",
];

function TH({ children }) {
  return (
    <th
      style={{
        padding: "10px 14px",
        textAlign: "left",
        fontSize: 11,
        fontWeight: 700,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        whiteSpace: "nowrap",
        background: "#f9fafb",
      }}
    >
      {children}
    </th>
  );
}

// ── REGISTRATIONS TAB
function RegistrationsTab({ registrations }) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [detailReg, setDetailReg] = useState(null);

  const today = registrations.filter(
    (r) => new Date(r.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  const thisMonth = registrations.filter((r) => {
    const d = new Date(r.createdAt),
      n = new Date();
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  }).length;
  const revenue = registrations.length * 100;

  const filtered = useMemo(() => {
    let list = filterByDate(registrations, dateFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.studentName?.toLowerCase().includes(q) ||
          r.fatherName?.toLowerCase().includes(q) ||
          r.phone?.includes(q),
      );
    }
    return list;
  }, [registrations, dateFilter, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const inputS = {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#111827",
    fontSize: 12,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <>
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard
          label="Total Registrations"
          value={registrations.length}
          sub="all time"
          accentBorder="#bbf7d0"
        />
        <StatCard
          label="Today"
          value={today}
          sub="registered today"
          accentBorder="#bfdbfe"
        />
        <StatCard
          label="This Month"
          value={thisMonth}
          sub={new Date().toLocaleString("en-IN", { month: "long" })}
          accentBorder="#fde68a"
        />
        <StatCard
          label="Registration Revenue"
          value={`₹${fmt(revenue)}`}
          sub={`₹100 × ${registrations.length}`}
          accentBorder="#c7d2fe"
        />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Toolbar */}
        <div
          style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                }}
              >
                Student Registrations
              </h2>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>
                {filtered.length} record{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => exportCSV(filtered)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                color: "#374151",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                padding: "7px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <Ic.Download /> Export CSV
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <span
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  pointerEvents: "none",
                }}
              >
                <Ic.Search />
              </span>
              <input
                type="text"
                placeholder="Search student name, father name, phone…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{ ...inputS, paddingLeft: 32, width: "100%" }}
              />
            </div>
            {["all", "today", "week", "month"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setDateFilter(f);
                  setPage(1);
                }}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "7px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  border: "1px solid #e5e7eb",
                  background: dateFilter === f ? "#14532d" : "#fff",
                  color: dateFilter === f ? "#fff" : "#374151",
                }}
              >
                {f === "all"
                  ? "All Time"
                  : f === "today"
                    ? "Today"
                    : f === "week"
                      ? "This Week"
                      : "This Month"}
              </button>
            ))}
          </div>
        </div>

        {paginated.length === 0 ? (
          <div style={{ padding: "56px 16px", textAlign: "center" }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1.5"
              style={{ margin: "0 auto 10px", display: "block" }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                fontWeight: 600,
                margin: 0,
              }}
            >
              No registrations found
            </p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>
              Try adjusting search or filter
            </p>
          </div>
        ) : (
          <>
            {/* ── DESKTOP TABLE — fixed column widths prevent misalignment */}
            <div className="desktop-table" style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                  tableLayout: "fixed",
                }}
              >
                <colgroup>
                  {COL_WIDTHS.map((w, i) => (
                    <col key={i} style={{ width: w }} />
                  ))}
                </colgroup>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <TH>Photo</TH>
                    <TH>Student</TH>
                    <TH>Father</TH>
                    <TH>Contact</TH>
                    <TH>Age</TH>
                    <TH>Registered</TH>
                    <TH>Fee</TH>
                    <TH></TH>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((r) => (
                    <motion.tr
                      key={r._id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderBottom: "1px solid #f9fafb" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f9fafb")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#fff")
                      }
                    >
                      {/* Photo */}
                      <td style={{ padding: "10px 14px" }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            overflow: "hidden",
                            background: "#dcfce7",
                            color: "#14532d",
                            fontWeight: 700,
                            fontSize: 14,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {r.photoUrl ? (
                            <Image
                              width={36}
                              height={36}
                              src={r.photoUrl}
                              alt={r.studentName}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            (r.studentName?.[0] ?? "?").toUpperCase()
                          )}
                        </div>
                      </td>
                      {/* Student — overflow ellipsis prevents cell stretching */}
                      <td style={{ padding: "10px 14px", maxWidth: 220 }}>
                        <p
                          style={{
                            fontWeight: 600,
                            color: "#111827",
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.studentName}
                        </p>
                        <p
                          style={{
                            fontSize: 11,
                            color: "#9ca3af",
                            margin: "2px 0 0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.registrationId}
                        </p>
                      </td>
                      {/* Father */}
                      <td
                        style={{
                          padding: "10px 14px",
                          color: "#374151",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 160,
                        }}
                      >
                        {r.fatherName}
                      </td>
                      {/* Contact */}
                      <td style={{ padding: "10px 14px" }}>
                        <a
                          href={`tel:${r.phone}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            color: "#14532d",
                            fontWeight: 600,
                            textDecoration: "none",
                            fontSize: 13,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Ic.Phone />
                          {r.phone}
                        </a>
                      </td>
                      {/* Age */}
                      <td
                        style={{
                          padding: "10px 14px",
                          color: "#374151",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.age ? `${r.age} yrs` : "—"}
                      </td>
                      {/* Date */}
                      <td
                        style={{
                          padding: "10px 14px",
                          color: "#6b7280",
                          whiteSpace: "nowrap",
                          fontSize: 12,
                        }}
                      >
                        {fmtDateShort(r.createdAt)}
                      </td>
                      {/* Fee */}
                      <td style={{ padding: "10px 14px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#15803d",
                            background: "#dcfce7",
                            padding: "3px 10px",
                            borderRadius: 20,
                            border: "1px solid #bbf7d0",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#22c55e",
                              display: "inline-block",
                            }}
                          />
                          ₹100 Paid
                        </span>
                      </td>
                      {/* Action */}
                      <td style={{ padding: "10px 14px" }}>
                        <button
                          onClick={() => setDetailReg(r)}
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#374151",
                            background: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            padding: "6px 14px",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            whiteSpace: "nowrap",
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── MOBILE CARDS — unchanged */}
            <div className="mobile-cards">
              {paginated.map((r) => (
                <motion.div
                  key={r._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ padding: "16px", borderBottom: "1px solid #f3f4f6" }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "#dcfce7",
                        color: "#14532d",
                        fontWeight: 700,
                        fontSize: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: "2px solid #bbf7d0",
                      }}
                    >
                      {r.photoUrl ? (
                        <Image
                          width={52}
                          height={52}
                          src={r.photoUrl}
                          alt={r.studentName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        (r.studentName?.[0] ?? "?").toUpperCase()
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#111827",
                          margin: "0 0 2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.studentName}
                      </p>
                      <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
                        {r.registrationId}
                      </p>
                    </div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#15803d",
                        background: "#dcfce7",
                        padding: "3px 9px",
                        borderRadius: 20,
                        border: "1px solid #bbf7d0",
                        flexShrink: 0,
                      }}
                    >
                      ₹100 Paid
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "6px 12px",
                      marginBottom: 12,
                    }}
                  >
                    {[
                      ["Father", r.fatherName],
                      ["Age", r.age ? `${r.age} years` : "—"],
                      ["Registered", fmtDateShort(r.createdAt)],
                      ["City", r.address?.city || "—"],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: "#9ca3af",
                            margin: "0 0 2px",
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#374151",
                            margin: 0,
                          }}
                        >
                          {val}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a
                      href={`tel:${r.phone}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#14532d",
                        background: "#ecfdf5",
                        border: "1px solid #bbf7d0",
                        padding: "8px 14px",
                        borderRadius: 8,
                        textDecoration: "none",
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Ic.Phone />
                      {r.phone}
                    </a>
                    <button
                      onClick={() => setDetailReg(r)}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#fff",
                        background: "#14532d",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        flex: 1,
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              borderTop: "1px solid #f3f4f6",
              background: "#fafafa",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
              {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div style={{ display: "flex", gap: 4 }}>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    cursor: "pointer",
                    border: "1px solid #e5e7eb",
                    fontFamily: "inherit",
                    background: page === i + 1 ? "#14532d" : "#fff",
                    color: page === i + 1 ? "#fff" : "#374151",
                    fontWeight: page === i + 1 ? 700 : 400,
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {detailReg && (
        <RegistrationDetail
          registration={detailReg}
          onClose={() => setDetailReg(null)}
        />
      )}
    </>
  );
}

// ── DONATIONS TAB
const PAYMENT_STATUS = {
  paid: {
    label: "Paid",
    badge: {
      bg: "#dcfce7",
      text: "#15803d",
      dot: "#22c55e",
      border: "#bbf7d0",
    },
  },
  failed: {
    label: "Failed",
    badge: {
      bg: "#fee2e2",
      text: "#dc2626",
      dot: "#ef4444",
      border: "#fecaca",
    },
  },
  created: {
    label: "Pending",
    badge: {
      bg: "#fef9c3",
      text: "#92400e",
      dot: "#f59e0b",
      border: "#fde68a",
    },
  },
};
const getPS = (s) =>
  PAYMENT_STATUS[s] ?? {
    label: s,
    badge: {
      bg: "#f3f4f6",
      text: "#374151",
      dot: "#9ca3af",
      border: "#e5e7eb",
    },
  };

function DonationsTab({ payments, donationStats }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  const avgDonation = useMemo(() => {
    const paid = payments.filter((p) => p.status === "paid");
    if (!paid.length) return 0;
    return Math.round(
      paid.reduce((s, p) => s + Number(p.amount), 0) / paid.length,
    );
  }, [payments]);

  const sparkData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toDateString();
    });
    return days.map((day) =>
      payments
        .filter(
          (p) =>
            p.status === "paid" && new Date(p.createdAt).toDateString() === day,
        )
        .reduce((s, p) => s + Number(p.amount), 0),
    );
  }, [payments]);

  const filtered = useMemo(() => {
    let list = [...payments];
    if (filter !== "all") list = list.filter((p) => p.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.email?.toLowerCase().includes(q) ||
          p.razorpay_payment_id?.toLowerCase().includes(q),
      );
    }
    list.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "amount_desc") return Number(b.amount) - Number(a.amount);
      if (sortBy === "amount_asc") return Number(a.amount) - Number(b.amount);
      return 0;
    });
    return list;
  }, [payments, filter, search, sortBy]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setOpenId(null);
    }, 0);
    return () => clearTimeout(t);
  }, [filter, search, sortBy]);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const inputS = {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#111827",
    fontSize: 12,
    outline: "none",
    fontFamily: "inherit",
    cursor: "pointer",
  };

  return (
    <>
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard
          label="Total Collected"
          value={`₹${fmt(donationStats.totalPaid)}`}
          sub="from paid donations"
          spark={sparkData}
          accentBorder="#bbf7d0"
        />
        <StatCard
          label="Successful"
          value={donationStats.successCount}
          sub="confirmed payments"
          accentBorder="#bfdbfe"
        />
        <StatCard
          label="Pending / Failed"
          value={`${payments.filter((p) => p.status === "created").length} / ${donationStats.failedCount}`}
          sub="need attention"
          accentBorder="#fde68a"
        />
        <StatCard
          label="Avg Donation"
          value={`₹${fmt(avgDonation)}`}
          sub="per paid record"
        />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6" }}
        >
          <div style={{ marginBottom: 10 }}>
            <h2
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Donation Records
            </h2>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>
              {filtered.length} record{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
              <span
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  pointerEvents: "none",
                }}
              >
                <Ic.Search />
              </span>
              <input
                type="text"
                placeholder="Name, email, payment ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  ...inputS,
                  paddingLeft: 30,
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={inputS}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="created">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={inputS}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount_desc">Amount ↓</option>
              <option value="amount_asc">Amount ↑</option>
            </select>
          </div>
        </div>

        {paginated.length === 0 ? (
          <div style={{ padding: "48px 16px", textAlign: "center" }}>
            <p
              style={{
                fontSize: 13,
                color: "#6b7280",
                fontWeight: 600,
                margin: 0,
              }}
            >
              No donations found
            </p>
          </div>
        ) : (
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {paginated.map((p) => {
              const s = getPS(p.status),
                isOpen = openId === p._id;
              return (
                <li key={p._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <button
                    className="adrow"
                    onClick={() => setOpenId(isOpen ? null : p._id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "11px 16px",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "#dcfce7",
                        color: "#14532d",
                        fontWeight: 700,
                        fontSize: 13,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        textTransform: "uppercase",
                      }}
                    >
                      {p.name?.[0] ?? "?"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#111827",
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.name || "—"}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#6b7280",
                          margin: "1px 0 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.email || "—"}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#111827",
                        flexShrink: 0,
                        margin: 0,
                      }}
                    >
                      ₹{fmt(p.amount)}
                    </p>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "3px 9px",
                        borderRadius: 20,
                        background: s.badge.bg,
                        color: s.badge.text,
                        border: `1px solid ${s.badge.border}`,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: s.badge.dot,
                          flexShrink: 0,
                        }}
                      />
                      {s.label}
                    </span>
                    <span
                      style={{
                        color: "#d1d5db",
                        fontSize: 11,
                        flexShrink: 0,
                        display: "inline-block",
                        transition: "transform 0.2s",
                        transform: isOpen ? "rotate(180deg)" : "none",
                      }}
                    >
                      <Ic.ChevronDown />
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        background: "#f9fafb",
                        borderTop: "1px solid #f3f4f6",
                        padding: "14px 16px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 11,
                          color: "#9ca3af",
                          margin: "0 0 12px",
                        }}
                      >
                        {fmtDate(p.createdAt)}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(140px, 1fr))",
                          gap: 14,
                        }}
                      >
                        {[
                          ["Full Name", p.name || "—"],
                          ["Email", p.email || "—"],
                          ["Amount", `₹${fmt(p.amount)}`],
                        ].map(([l, v]) => (
                          <div key={l}>
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
                              {l}
                            </p>
                            <p
                              style={{
                                fontSize: 13,
                                color: "#111827",
                                fontWeight: 500,
                                margin: 0,
                                wordBreak: "break-word",
                              }}
                            >
                              {v}
                            </p>
                          </div>
                        ))}
                        <div>
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
                            Payment ID
                          </p>
                          <CopyChip text={p.razorpay_payment_id} />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {Math.ceil(filtered.length / PAGE_SIZE) > 1 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              padding: "12px 16px",
              borderTop: "1px solid #f3f4f6",
              background: "#fafafa",
            }}
          >
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
              {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div style={{ display: "flex", gap: 4 }}>
              {[...Array(Math.ceil(filtered.length / PAGE_SIZE))].map(
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPage(i + 1);
                      setOpenId(null);
                    }}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      fontSize: 12,
                      cursor: "pointer",
                      border: "1px solid #e5e7eb",
                      background: page === i + 1 ? "#14532d" : "#fff",
                      color: page === i + 1 ? "#fff" : "#374151",
                      fontWeight: page === i + 1 ? 700 : 400,
                      fontFamily: "inherit",
                    }}
                  >
                    {i + 1}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── ANALYTICS TAB
function AnalyticsTab({ payments, registrations }) {
  const donationsByDay = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toDateString();
    });
    return days.map((day) => ({
      label: new Date(day).toLocaleDateString("en-IN", { weekday: "short" }),
      amount: payments
        .filter(
          (p) =>
            p.status === "paid" && new Date(p.createdAt).toDateString() === day,
        )
        .reduce((s, p) => s + Number(p.amount), 0),
    }));
  }, [payments]);
  const regsByDay = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toDateString();
    });
    return days.map((day) => ({
      label: new Date(day).toLocaleDateString("en-IN", { weekday: "short" }),
      count: registrations.filter(
        (r) => new Date(r.createdAt).toDateString() === day,
      ).length,
    }));
  }, [registrations]);
  const maxD = Math.max(...donationsByDay.map((d) => d.amount), 1),
    maxR = Math.max(...regsByDay.map((d) => d.count), 1);
  const totalRevenue = registrations.length * 100;
  const todayRegs = registrations.filter(
    (r) => new Date(r.createdAt).toDateString() === new Date().toDateString(),
  ).length;
  const weekRegs = filterByDate(registrations, "week").length;
  const monthRegs = filterByDate(registrations, "month").length;
  return (
    <div>
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <StatCard
          label="Total Donations"
          value={`₹${fmt(payments.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0))}`}
          sub="all time"
          accentBorder="#bbf7d0"
        />
        <StatCard
          label="Total Registrations"
          value={registrations.length}
          sub="all time"
          accentBorder="#bfdbfe"
        />
        <StatCard
          label="Registration Revenue"
          value={`₹${fmt(totalRevenue)}`}
          sub={`${registrations.length} × ₹100`}
          accentBorder="#fde68a"
        />
        <StatCard
          label="This Month"
          value={monthRegs}
          sub="new registrations"
          accentBorder="#c7d2fe"
        />
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          padding: 16,
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 14px",
          }}
        >
          Registration Breakdown
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
            gap: 12,
          }}
        >
          {[
            ["Today", todayRegs],
            ["This Week", weekRegs],
            ["This Month", monthRegs],
            ["All Time", registrations.length],
          ].map(([label, val]) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                padding: "12px 8px",
                background: "#f9fafb",
                borderRadius: 10,
                border: "1px solid #f3f4f6",
              }}
            >
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#14532d",
                  margin: "0 0 2px",
                }}
              >
                {val}
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
                {label}
              </p>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6b7280",
                  margin: "4px 0 0",
                }}
              >
                ₹{fmt(val * 100)}
              </p>
            </div>
          ))}
        </div>
      </div>
      {[
        {
          title: "Donations — Last 7 Days",
          data: donationsByDay,
          max: maxD,
          key: "amount",
          color: "#14532d",
        },
        {
          title: "Registrations — Last 7 Days",
          data: regsByDay,
          max: maxR,
          key: "count",
          color: "#1d4ed8",
        },
      ].map(({ title, data, max, key, color }) => (
        <div
          key={title}
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            padding: 16,
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 14px",
            }}
          >
            {title}
          </p>
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "flex-end",
              height: 80,
            }}
          >
            {data.map((d) => (
              <div
                key={d.label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    background: d[key] > 0 ? color : "#e5e7eb",
                    borderRadius: "4px 4px 0 0",
                    height:
                      d[key] > 0
                        ? `${Math.max(8, (d[key] / max) * 64)}px`
                        : "4px",
                  }}
                />
                <span style={{ fontSize: 9, color: "#9ca3af" }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── MAIN
export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState("registrations");
  const [payments, setPayments] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [donationStats, setDonationStats] = useState({
    totalPaid: 0,
    successCount: 0,
    failedCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const dRes = await fetch("/api/verify-payment", {
          method: "GET",
          credentials: "include",
        });
        if (dRes.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const dData = await dRes.json();
        setPayments(dData.payments ?? []);
        setDonationStats(
          dData.stats ?? { totalPaid: 0, successCount: 0, failedCount: 0 },
        );
        const rRes = await fetch("/api/registrations", {
          method: "GET",
          credentials: "include",
        });
        if (rRes.ok) {
          const rData = await rRes.json();
          setRegistrations(rData.registrations ?? []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
        }}
      >
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "3px solid #14532d",
              borderTopColor: "transparent",
              animation: "spin 0.7s linear infinite",
            }}
          />
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            Loading dashboard…
          </p>
        </div>
      </div>
    );
  }

  const TABS = [
    {
      id: "registrations",
      label: "Registrations",
      icon: <Ic.Reg />,
      count: registrations.length,
    },
    {
      id: "donations",
      label: "Donations",
      icon: <Ic.Donate />,
      count: donationStats.successCount,
    },
    { id: "analytics", label: "Analytics", icon: <Ic.Analytics /> },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .adrow:hover{background:#f9fafb !important;}
        .stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
        @media(min-width:640px){.stat-grid{grid-template-columns:repeat(4,1fr);}}
        .desktop-table{display:none;}
        .mobile-cards{display:block;}
        @media(min-width:640px){.desktop-table{display:block;}.mobile-cards{display:none;}}
      `}</style>

      {/* Top bar */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 16px",
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
              Admin Dashboard
            </span>
            <span style={{ color: "#e5e7eb" }}>·</span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#dc2626",
              background: "transparent",
              border: "1px solid #fecaca",
              padding: "4px 12px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Logout
          </button>
        </div>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            overflowX: "auto",
          }}
        >
          {TABS.map(({ id, label, icon, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: "transparent",
                fontFamily: "inherit",
                color: tab === id ? "#14532d" : "#6b7280",
                borderBottom:
                  tab === id ? "2px solid #14532d" : "2px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: 7,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span style={{ color: tab === id ? "#14532d" : "#9ca3af" }}>
                {icon}
              </span>
              {label}
              {count !== undefined && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 10,
                    background: tab === id ? "#dcfce7" : "#f3f4f6",
                    color: tab === id ? "#14532d" : "#9ca3af",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "18px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {tab === "registrations" && (
          <RegistrationsTab registrations={registrations} />
        )}
        {tab === "donations" && (
          <DonationsTab payments={payments} donationStats={donationStats} />
        )}
        {tab === "analytics" && (
          <AnalyticsTab payments={payments} registrations={registrations} />
        )}
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#d1d5db",
            paddingBottom: 16,
            margin: 0,
          }}
        >
          Maktab Meezan-ul-Qur&apos;an · Admin Panel · Secured
        </p>
      </main>
    </div>
  );
}
