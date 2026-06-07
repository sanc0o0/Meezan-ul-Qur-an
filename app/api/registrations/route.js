import { connectDB } from "@/lib/db";
import StudentRegistration from "@/models/StudentRegistration";
import { NextResponse } from "next/server";

function verifyAdmin(req) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  return token === process.env.ADMIN_SECRET_TOKEN;
}

// GET — list all registrations with stats
export async function GET(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const registrations = await StudentRegistration.find().sort({
    createdAt: -1,
  });

  const total = registrations.length;
  const paid = registrations.filter((r) => r.paymentStatus === "paid").length;
  const pending = registrations.filter((r) => r.status === "pending").length;
  const approved = registrations.filter((r) => r.status === "approved").length;
  const rejected = registrations.filter((r) => r.status === "rejected").length;

  return NextResponse.json({
    registrations,
    stats: { total, paid, pending, approved, rejected },
  });
}

// PATCH — update registration status (approve / reject / contacted)
export async function PATCH(req) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { registrationId, status } = body;

  const VALID_STATUSES = ["pending", "approved", "rejected", "contacted"];

  if (!registrationId || !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: "Invalid registrationId or status" },
      { status: 400 },
    );
  }

  await connectDB();

  const updated = await StudentRegistration.findOneAndUpdate(
    { registrationId },
    { status },
    { new: true },
  );

  if (!updated) {
    return NextResponse.json(
      { error: "Registration not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, registration: updated });
}
