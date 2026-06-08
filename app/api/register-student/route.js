/**
 * app/api/register-student/route.js
 *
 * POST  — create a new registration (validate → rate-limit → duplicate check → save)
 * DELETE — remove a ghost registration created before payment (ondismiss handler)
 *
 * Security layers:
 *   1. Upstash rate limiting  (3 registrations / IP / day)
 *   3. XSS / SQLi / injection pattern detection
 *   4. Field-level sanitization + validation
 *   5. Duplicate detection  (same phone  OR  same student+father name)
 *   6. Suspicious-activity logging
 */

import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import mongoose from "mongoose";
import { validateEnrollmentPayload } from "@/lib/enroll-validation";

// ── DB connection ──────────────────────────────────────────────────────────
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  isConnected = true;
}

// ── Mongoose schema ────────────────────────────────────────────────────────
const registrationSchema = new mongoose.Schema(
  {
    registrationId: { type: String, unique: true, index: true },
    studentName: String,
    photoUrl: String,
    dob: String,
    age: Number,
    gender: String,
    fatherName: String,
    motherName: String,
    guardianOccupation: String,
    phone: { type: String, index: true },
    alternatePhone: String,
    emergencyContact: String,
    email: String,
    guardianRelation: String,
    guardianName: String,
    guardianEmail: String,
    address: Object,
    paymentStatus: { type: String, default: "pending" },
    paymentId: String,
  },
  { timestamps: true },
);

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

// ── Upstash rate limiter ───────────────────────────────────────────────────
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "24 h"), // 3 regs per IP per day
  analytics: true,
});

// ── Suspicious-activity logger ────────────────────────────────────────────
async function logSuspicious(ip, reason, payload) {
  try {
    const key = `suspicious:${ip}:${Date.now()}`;
    await redis.set(
      key,
      JSON.stringify({
        ip,
        reason,
        payload: JSON.stringify(payload).slice(0, 500),
      }),
      { ex: 60 * 60 * 24 * 7 }, // keep for 7 days
    );
    // Increment a counter so repeat offenders can be blocked at the edge
    await redis.incr(`suspicious_count:${ip}`);
  } catch (_) {
    // Never crash the request because of logging
  }
}

// ── Repeat-offender check ─────────────────────────────────────────────────
async function isBlocked(ip) {
  try {
    const count = await redis.get(`suspicious_count:${ip}`);
    return Number(count) >= 5; // block after 5 suspicious attempts
  } catch (_) {
    return false;
  }
}

// ── ID generator ──────────────────────────────────────────────────────────
function generateRegistrationId() {
  const year = new Date().getFullYear().toString().slice(-2);
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MMQ${year}-${rand}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function jsonError(message, status = 400, extra = {}) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

// ═══════════════════════════════════════════════════════════════════════════
// POST /api/register-student
// ═══════════════════════════════════════════════════════════════════════════
export async function POST(request) {
  const ip = getClientIp(request);

  // 1. Repeat-offender check
  if (await isBlocked(ip)) {
    return jsonError(
      "Too many suspicious requests. Please contact us directly.",
      403,
    );
  }

  // 2. Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body", 400);
  }

  // 3. Validate + sanitize (includes attack pattern checks)
  const { errors, clean, suspicious } = validateEnrollmentPayload(body);

  if (suspicious) {
    await logSuspicious(ip, "attack_pattern", body);
    // Return 200 with a fake success to confuse bots
    return NextResponse.json(
      { registrationId: "MMQ00-XXXXXX" },
      { status: 200 },
    );
  }

  if (Object.keys(errors).length > 0) {
    return jsonError("Validation failed", 422, { fields: errors });
  }

  // 4. Rate limiting
  const { success: ratePassed, remaining } = await ratelimit.limit(ip);
  if (!ratePassed) {
    await logSuspicious(ip, "rate_limit_exceeded", { phone: clean.phone });
    return jsonError(
      "You have reached the registration limit for today. Please try again tomorrow or contact us directly.",
      429,
      { retryAfter: "24h" },
    );
  }

  await connectDB();

  // 5. Duplicate detection
  // A parent may register multiple children — so we NEVER block on phone number alone.
  // We only block if the exact same student (name + father name) has already paid.
  // Pending/unpaid registrations are intentionally excluded so a retry after a
  // dismissed payment modal always succeeds.
  const duplicate = await Registration.findOne({
    studentName: { $regex: new RegExp(`^${clean.studentName}$`, "i") },
    fatherName: { $regex: new RegExp(`^${clean.fatherName}$`, "i") },
    paymentStatus: "paid",
  }).lean();

  if (duplicate) {
    return jsonError(
      "This student appears to be already registered and payment has been confirmed. " +
        "If you believe this is a mistake, please contact us directly.",
      409,
      { duplicate: true },
    );
  }

  // 6. Save
  const registrationId = generateRegistrationId();

  try {
    await Registration.create({ ...clean, registrationId });
  } catch (err) {
    if (err.code === 11000) {
      // Race condition — extremely rare, retry with a new ID
      const retryId = generateRegistrationId();
      await Registration.create({ ...clean, registrationId: retryId });
      return NextResponse.json({ registrationId: retryId }, { status: 201 });
    }
    console.error("[register-student] DB error:", err);
    return jsonError("Registration could not be saved. Please try again.", 500);
  }

  return NextResponse.json({ registrationId }, { status: 201 });
}

// ═══════════════════════════════════════════════════════════════════════════
// DELETE /api/register-student  — remove ghost registration on payment dismiss
// ═══════════════════════════════════════════════════════════════════════════
export async function DELETE(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body", 400);
  }

  const { registrationId } = body;
  if (!registrationId || typeof registrationId !== "string") {
    return jsonError("registrationId is required", 400);
  }

  // Only delete registrations that never got paid
  await connectDB();
  await Registration.deleteOne({ registrationId, paymentStatus: "pending" });

  return NextResponse.json({ deleted: true }, { status: 200 });
}
