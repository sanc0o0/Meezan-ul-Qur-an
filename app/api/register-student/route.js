import { connectDB } from "@/lib/db";
import StudentRegistration from "@/models/StudentRegistration";
import { generateRegistrationId } from "@/lib/registrationId";


// ── In-memory rate limit (resets on cold start; fine for serverless)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000;
  const MAX_ATTEMPTS = 10;
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) return false;
  entry.count += 1;
  return true;
}

function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""));
}
function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPinCode(pin) {
  return /^\d{6}$/.test(pin);
}

export async function POST(req) {
  try {
    const body = await req.json();
  
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "Too many attempts. Please try again tomorrow." },
        { status: 429 },
      );
    }

    const {
      studentName,
      photoUrl,
      dob,
      age,
      gender,
      fatherName,
      motherName,
      guardianOccupation,
      guardianName,
      guardianRelation,
      guardianEmail,
      phone,
      alternatePhone,
      email,
      emergencyContact,
      address,
    } = body;

    // Required fields
    const required = {
      studentName,
      dob,
      age,
      gender,
      fatherName,
      motherName,
      phone,
    };
    for (const [field, value] of Object.entries(required)) {
      if (!value && value !== 0) {
        return Response.json(
          { error: `${field} is required` },
          { status: 400 },
        );
      }
    }

    if (
      !address?.houseNumber ||
      !address?.village ||
      !address?.city ||
      !address?.state ||
      !address?.pinCode
    ) {
      return Response.json(
        { error: "Complete address is required" },
        { status: 400 },
      );
    }
    if (!isValidPhone(phone)) {
      return Response.json(
        {
          error: "Invalid phone number. Enter a 10-digit Indian mobile number.",
        },
        { status: 400 },
      );
    }

    // Validate both emails if provided
    const effectiveEmail = guardianEmail || email;
    if (!isValidEmail(effectiveEmail)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isValidPinCode(address.pinCode)) {
      return Response.json(
        { error: "Invalid PIN code. Must be 6 digits." },
        { status: 400 },
      );
    }

    await connectDB();

    const cleanPhone = phone.replace(/\s/g, "");
    const cleanName = studentName.trim().toLowerCase();

    // Ghost cleanup: delete unpaid registrations older than 30 min for this phone
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);
    await StudentRegistration.deleteMany({
      phone: cleanPhone,
      paymentStatus: "pending",
      createdAt: { $lt: thirtyMinAgo },
    });

    // True duplicate check: same student name + same phone that is PAID
    const paidDuplicate = await StudentRegistration.findOne({
      phone: cleanPhone,
      paymentStatus: "paid",
      studentName: { $regex: new RegExp(`^${cleanName}$`, "i") },
    });

    if (paidDuplicate) {
      return Response.json(
        {
          error: `${studentName.trim()} has already been registered from this number. To register a different child, continue — their name just needs to be different.`,
        },
        { status: 409 },
      );
    }

    // Clean up any existing UNPAID registration for this exact student+phone combo
    await StudentRegistration.deleteMany({
      phone: cleanPhone,
      paymentStatus: { $in: ["pending", "failed"] },
      studentName: { $regex: new RegExp(`^${cleanName}$`, "i") },
    });

    const registrationId = await generateRegistrationId();

    // Resolve guardian name: default to father/mother based on relation
    const resolvedGuardianRelation = guardianRelation || "father";
    let resolvedGuardianName = guardianName?.trim() || "";
    if (!resolvedGuardianName) {
      if (resolvedGuardianRelation === "father")
        resolvedGuardianName = fatherName.trim();
      else if (resolvedGuardianRelation === "mother")
        resolvedGuardianName = motherName.trim();
    }

    const registration = await StudentRegistration.create({
      registrationId,
      studentName: studentName.trim(),
      photoUrl: photoUrl || "",
      dob,
      age: Number(age),
      gender,
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      guardianOccupation: guardianOccupation || "",
      guardianName: resolvedGuardianName,
      guardianRelation: resolvedGuardianRelation,
      guardianEmail: guardianEmail ? guardianEmail.toLowerCase() : "",
      phone: cleanPhone,
      alternatePhone: alternatePhone || "",
      email: email ? email.toLowerCase() : "",
      emergencyContact: emergencyContact || "",
      address: {
        houseNumber: address.houseNumber.trim(),
        village: address.village.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
        pinCode: address.pinCode.trim(),
      },
      paymentStatus: "pending",
      status: "pending",
    });

    return Response.json({
      success: true,
      registrationId: registration.registrationId,
      _id: registration._id,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return Response.json(
      { error: "Registration failed. Please try again." },
      { status: 500 },
    );
  }
}

// DELETE — called when user dismisses Razorpay modal without paying
export async function DELETE(req) {
  try {
    const { registrationId } = await req.json();
    if (!registrationId) {
      return Response.json(
        { error: "registrationId required" },
        { status: 400 },
      );
    }
    await connectDB();
    await StudentRegistration.deleteOne({
      registrationId,
      paymentStatus: { $in: ["pending", "failed"] },
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error("Delete pending reg error:", err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
