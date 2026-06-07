import { connectDB } from "@/lib/db";
import StudentRegistration from "@/models/StudentRegistration";

/**
 * Generates a unique sequential registration ID like MMQ-2026-0001
 */
export async function generateRegistrationId() {
  await connectDB();

  const year = new Date().getFullYear();
  const prefix = `MMQ-${year}-`;

  // Find the latest registration for this year
  const latest = await StudentRegistration.findOne({
    registrationId: { $regex: `^${prefix}` },
  }).sort({ createdAt: -1 });

  let sequence = 1;
  if (latest?.registrationId) {
    const parts = latest.registrationId.split("-");
    const lastSeq = parseInt(parts[2], 10);
    if (!isNaN(lastSeq)) sequence = lastSeq + 1;
  }

  return `${prefix}${String(sequence).padStart(4, "0")}`;
}
