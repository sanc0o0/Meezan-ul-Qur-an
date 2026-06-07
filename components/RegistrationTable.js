"use client";
import { useState, useMemo } from "react";
import Image from "next/image";

const PAGE_SIZE = 10;

const REG_STATUS = {
  pending: {
    label: "Pending",
    bg: "#fef9c3",
    text: "#92400e",
    dot: "#f59e0b",
    border: "#fde68a",
  },
  approved: {
    label: "Approved",
    bg: "#dcfce7",
    text: "#15803d",
    dot: "#22c55e",
    border: "#bbf7d0",
  },
  rejected: {
    label: "Rejected",
    bg: "#fee2e2",
    text: "#dc2626",
    dot: "#ef4444",
    border: "#fecaca",
  },
  contacted: {
    label: "Contacted",
    bg: "#dbeafe",
    text: "#1d4ed8",
    dot: "#3b82f6",
    border: "#bfdbfe",
  },
};

const PAY_STATUS = {
  paid: { label: "Paid", bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
  pending: {
    label: "Unpaid",
    bg: "#f3f4f6",
    text: "#6b7280",
    border: "#e5e7eb",
  },
  failed: {
    label: "Failed",
    bg: "#fee2e2",
    text: "#dc2626",
    border: "#fecaca",
  },
};

function Badge({ cfg }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 20,
        background: cfg.bg,
        color: cfg.text,
        border: `1px solid ${cfg.border}`,
        whiteSpace: "nowrap",
      }}
    >
      {cfg.dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: cfg.dot,
            flexShrink: 0,
          }}
        />
      )}
      {cfg.label}
    </span>
  );
}

function ActionBtn({ label, color, bg, border, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        border: `1px solid ${border}`,
        background: bg,
        color,
        opacity: disabled ? 0.5 : 1,
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

export default function RegistrationTable({
  registrations = [],
  onStatusChange,
  onViewDetail,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [payFilter, setPayFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState(null);

  const filtered = useMemo(() => {
    let list = [...registrations];
    if (filter !== "all") list = list.filter((r) => r.status === filter);
    if (payFilter !== "all")
      list = list.filter((r) => r.paymentStatus === payFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.studentName?.toLowerCase().includes(q) ||
          r.fatherName?.toLowerCase().includes(q) ||
          r.phone?.includes(q) ||
          r.registrationId?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [registrations, filter, payFilter, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleAction = async (registrationId, status) => {
    setUpdating(registrationId + status);
    await onStatusChange?.(registrationId, status);
    setUpdating(null);
  };

  const inputStyle = {
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

  const selStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ marginBottom: 10 }}>
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
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
              placeholder="Name, phone, registration ID…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{ ...inputStyle, paddingLeft: 28, width: "100%" }}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            style={selStyle}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="contacted">Contacted</option>
          </select>
          <select
            value={payFilter}
            onChange={(e) => {
              setPayFilter(e.target.value);
              setPage(1);
            }}
            style={selStyle}
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Unpaid</option>
          </select>
        </div>
      </div>

      {/* Rows */}
      {paginated.length === 0 ? (
        <div style={{ padding: "48px 16px", textAlign: "center" }}>
          <p style={{ fontSize: 24, margin: "0 0 8px" }}>📋</p>
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
            Try adjusting filters
          </p>
        </div>
      ) : (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {paginated.map((r) => {
            const rs = REG_STATUS[r.status] ?? REG_STATUS.pending;
            const ps = PAY_STATUS[r.paymentStatus] ?? PAY_STATUS.pending;
            const busy = updating?.startsWith(r.registrationId);

            return (
              <li
                key={r._id}
                style={{
                  borderBottom: "1px solid #f3f4f6",
                  padding: "12px 16px",
                }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "#dcfce7",
                      color: "#14532d",
                      fontWeight: 700,
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
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

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#111827",
                          margin: 0,
                        }}
                      >
                        {r.studentName}
                      </p>
                      <Badge cfg={rs} />
                      <Badge cfg={ps} />
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#6b7280",
                        margin: "3px 0 0",
                      }}
                    >
                      Father: {r.fatherName} · 📞 {r.phone} · {r.registrationId}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#9ca3af",
                        margin: "1px 0 0",
                      }}
                    >
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      {r.address?.city
                        ? ` · ${r.address.city}, ${r.address.state}`
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginTop: 10,
                  }}
                >
                  <ActionBtn
                    label="View Details"
                    color="#374151"
                    bg="#f9fafb"
                    border="#e5e7eb"
                    onClick={() => onViewDetail?.(r)}
                  />
                  <ActionBtn
                    label="✓ Approve"
                    color="#15803d"
                    bg="#dcfce7"
                    border="#bbf7d0"
                    disabled={r.status === "approved" || busy}
                    onClick={() => handleAction(r.registrationId, "approved")}
                  />
                  <ActionBtn
                    label="✗ Reject"
                    color="#dc2626"
                    bg="#fee2e2"
                    border="#fecaca"
                    disabled={r.status === "rejected" || busy}
                    onClick={() => handleAction(r.registrationId, "rejected")}
                  />
                  <ActionBtn
                    label="📞 Mark Contacted"
                    color="#1d4ed8"
                    bg="#dbeafe"
                    border="#bfdbfe"
                    disabled={r.status === "contacted" || busy}
                    onClick={() => handleAction(r.registrationId, "contacted")}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Pagination */}
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
            Page {page} of {totalPages}
          </p>
          <div style={{ display: "flex", gap: 4 }}>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  padding: "4px 10px",
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
  );
}
