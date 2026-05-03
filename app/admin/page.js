"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// ── helpers ───────────────────────────────────────────────────────────────────
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

// All colors are fully hardcoded — zero dependency on Tailwind primary-* vars
const STATUS = {
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
const getStatus = (s) =>
  STATUS[s] ?? {
    label: s,
    badge: {
      bg: "#f3f4f6",
      text: "#374151",
      dot: "#9ca3af",
      border: "#e5e7eb",
    },
  };

const PAGE_SIZE = 10;

// ── sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({ values }) {
  if (!values?.length || values.every((v) => v === 0)) return null;
  const max = Math.max(...values, 1);
  const W = 72,
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

// ── stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, spark, accentBorder }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: `1px solid ${accentBorder ?? "#e5e7eb"}`,
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#9ca3af",
          margin: 0,
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

// ── copy chip ─────────────────────────────────────────────────────────────────
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
      title={text}
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
        {copied ? "✓" : "⎘"}
      </span>
    </button>
  );
}

// ── detail field ──────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
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
        {label}
      </p>
      <div
        style={{
          fontSize: 13,
          color: "#111827",
          fontWeight: 500,
          wordBreak: "break-word",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── pagination ────────────────────────────────────────────────────────────────
function Pagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  const range = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++)
    range.push(i);

  const base = {
    padding: "5px 10px",
    borderRadius: 8,
    fontSize: 12,
    cursor: "pointer",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#374151",
  };
  const active = {
    ...base,
    background: "#14532d",
    color: "#ffffff",
    border: "1px solid #14532d",
    fontWeight: 700,
  };
  const disabled = { ...base, opacity: 0.3, cursor: "not-allowed" };

  return (
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
        {Math.min((page - 1) * pageSize + 1, total)}–
        {Math.min(page * pageSize, total)} of {total}
      </p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <button
          style={page === 1 ? disabled : base}
          disabled={page === 1}
          onClick={() => onChange(1)}
        >
          «
        </button>
        <button
          style={page === 1 ? disabled : base}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        >
          ‹
        </button>
        {range[0] > 1 && (
          <span style={{ color: "#d1d5db", padding: "5px 2px", fontSize: 12 }}>
            …
          </span>
        )}
        {range.map((pg) => (
          <button
            key={pg}
            style={pg === page ? active : base}
            onClick={() => onChange(pg)}
          >
            {pg}
          </button>
        ))}
        {range[range.length - 1] < totalPages && (
          <span style={{ color: "#d1d5db", padding: "5px 2px", fontSize: 12 }}>
            …
          </span>
        )}
        <button
          style={page === totalPages ? disabled : base}
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
        >
          ›
        </button>
        <button
          style={page === totalPages ? disabled : base}
          disabled={page === totalPages}
          onClick={() => onChange(totalPages)}
        >
          »
        </button>
      </div>
    </div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPaid: 0,
    successCount: 0,
    failedCount: 0,
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        setPayments(data.payments ?? []);
        setStats(
          data.stats ?? { totalPaid: 0, successCount: 0, failedCount: 0 },
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

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
    setPage(1);
    setOpenId(null);
  }, [filter, search, sortBy]);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
        }}
      >
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#111827",
    fontSize: 12,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };
  const selectStyle = {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#111827",
    fontSize: 12,
    outline: "none",
    fontFamily: "inherit",
    cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .adrow { transition: background 0.1s; cursor: pointer; }
        .adrow:hover { background: #f9fafb !important; }
      `}</style>

      {/* slim admin bar */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 16px",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
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
            <span style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>
              Admin Dashboard
            </span>
            <span style={{ color: "#e5e7eb", fontSize: 12 }}>·</span>
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
            }}
          >
            Logout
          </button>
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
        {/* stat cards: 2-col always, 4-col on wider screens via inline media — using CSS class */}
        <style>{`
          .stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
          @media (min-width: 768px) { .stat-grid { grid-template-columns: repeat(4, 1fr); } }
          .filter-row { display: flex; flex-direction: column; gap: 8px; }
          @media (min-width: 600px) { .filter-row { flex-direction: row; align-items: center; } }
          .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          @media (min-width: 600px) { .detail-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (min-width: 900px) { .detail-grid { grid-template-columns: repeat(4, 1fr); } }
        `}</style>

        <div className="stat-grid">
          <StatCard
            label="Total Collected"
            value={`₹${fmt(stats.totalPaid)}`}
            sub="from paid donations"
            spark={sparkData}
            accentBorder="#bbf7d0"
          />
          <StatCard
            label="Successful"
            value={stats.successCount}
            sub="confirmed payments"
            accentBorder="#bfdbfe"
          />
          <StatCard
            label="Pending / Failed"
            value={`${payments.filter((p) => p.status === "created").length} / ${stats.failedCount}`}
            sub="need attention"
            accentBorder="#fde68a"
          />
          <StatCard
            label="Avg Donation"
            value={`₹${fmt(avgDonation)}`}
            sub="per paid record"
          />
        </div>

        {/* table card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          {/* toolbar */}
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
                {filtered.length} record{filtered.length !== 1 ? "s" : ""} ·
                page {page} of{" "}
                {Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}
              </p>
            </div>
            <div className="filter-row">
              <div style={{ position: "relative", flex: 1 }}>
                <span
                  style={{
                    position: "absolute",
                    left: 9,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#d1d5db",
                    fontSize: 13,
                    pointerEvents: "none",
                  }}
                >
                  ⌕
                </span>
                <input
                  type="text"
                  placeholder="Name, email, payment ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 28 }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={selectStyle}
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="created">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={selectStyle}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="amount_desc">Amount ↓</option>
                  <option value="amount_asc">Amount ↑</option>
                </select>
              </div>
            </div>
          </div>

          {/* records */}
          {paginated.length === 0 ? (
            <div style={{ padding: "48px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 24, margin: "0 0 8px" }}>🤲</p>
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
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>
                Try adjusting filters or search
              </p>
            </div>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {paginated.map((p) => {
                const s = getStatus(p.status);
                const isOpen = openId === p._id;
                return (
                  <li key={p._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {/* row — hardcoded white bg, dark text */}
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
                        background: "#ffffff",
                      }}
                    >
                      {/* avatar */}
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

                      {/* name + email */}
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

                      {/* amount */}
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

                      {/* badge */}
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

                      {/* chevron */}
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
                        ▾
                      </span>
                    </button>

                    {/* expanded */}
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
                        <div className="
                        detail-grid">
                          <Field label="Full Name">{p.name || "—"}</Field>
                          <Field label="Email">
                            <span style={{ wordBreak: "break-all" }}>
                              {p.email || "—"}
                            </span>
                          </Field>
                          <Field label="Amount">₹{fmt(p.amount)}</Field>
                          <Field label="Status">
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
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: s.badge.dot,
                                }}
                              />
                              {s.label}
                            </span>
                          </Field>
                          <Field label="Payment ID">
                            <CopyChip text={p.razorpay_payment_id} />
                          </Field>
                          <Field label="Receipt ID">
                            <CopyChip text={p._id} />
                          </Field>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <Pagination
            page={page}
            total={filtered.length}
            pageSize={PAGE_SIZE}
            onChange={(pg) => {
              setPage(pg);
              setOpenId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>

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
