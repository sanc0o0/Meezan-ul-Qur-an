// FILE: app/api/verify-reg-payment/route.js

import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import StudentRegistration from "@/models/StudentRegistration";

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function getReceiptEmail(registration) {
  return registration.guardianEmail || registration.email || null;
}

function getGuardianLabel(registration) {
  const name = registration.guardianName || registration.fatherName;
  const rel = registration.guardianRelation || "father";
  const relLabel =
    rel === "father" ? "Father" : rel === "mother" ? "Mother" : "Guardian";
  return { name, relLabel };
}

async function sendGuardianReceipt(registration, paymentId) {
  const toEmail = getReceiptEmail(registration);
  if (!toEmail) return; // no email provided — skip

  const { name, relLabel } = getGuardianLabel(registration);
  const transporter = getTransporter();

  const addr = registration.address
    ? `${registration.address.houseNumber}, ${registration.address.village}, ${registration.address.city}, ${registration.address.state} - ${registration.address.pinCode}`
    : "—";

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `Registration Successful — ${registration.studentName} | Maktab Meezan-ul-Qur'an`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

          <div style="background:#14532d;color:#fff;padding:28px;text-align:center;">
            <div style="background:white;display:inline-block;padding:5px 5px 0 5px;border-radius:8px;margin-bottom:10px;">
              <img src="https://meezanulquran.com/logo.png" height="55" alt="Logo" />
            </div>
            <h2 style="margin:8px 0 4px;">Maktab Meezan-ul-Qur'an</h2>
            <p style="margin:0;font-size:14px;color:#bbf7d0;">Student Registration Receipt</p>
          </div>

          <div style="padding:28px;">
            <p style="font-size:16px;">Assalamu Alaikum <b>${name}</b> (${relLabel}),</p>
            <p style="color:#374151;">
              Alhamdulillah! Your child's registration at Maktab Meezan-ul-Qur'an has been
              successfully completed and the fee has been received.
            </p>

            <div style="background:#ecfdf5;border:1px solid #bbf7d0;padding:16px;border-radius:8px;text-align:center;margin:20px 0;">
              <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">Registration ID</p>
              <h1 style="margin:6px 0;color:#14532d;letter-spacing:0.05em;">${registration.registrationId}</h1>
              <p style="margin:0;font-size:12px;color:#6b7280;">Keep this ID for your records</p>
            </div>

            <table style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:20px;">
              <tr><td style="padding:8px 0;color:#6b7280;width:160px;">Student Name</td><td style="padding:8px 0;font-weight:600;">${registration.studentName}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Father's Name</td><td style="padding:8px 0;font-weight:600;">${registration.fatherName}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Mother's Name</td><td style="padding:8px 0;font-weight:600;">${registration.motherName}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Responsible ${relLabel}</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Date of Birth</td><td style="padding:8px 0;font-weight:600;">${registration.dob}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Gender</td><td style="padding:8px 0;font-weight:600;text-transform:capitalize;">${registration.gender}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;font-weight:600;">${registration.phone}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Address</td><td style="padding:8px 0;font-weight:600;">${addr}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Payment ID</td><td style="padding:8px 0;font-family:monospace;font-size:12px;">${paymentId}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Amount Paid</td><td style="padding:8px 0;font-weight:700;color:#14532d;">Rs. 100</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:8px 0;color:#6b7280;">Date</td>
                <td style="padding:8px 0;font-weight:600;">
                  ${new Date().toLocaleString("en-IN", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            </table>

            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-bottom:20px;">
              <p style="font-weight:700;color:#92400e;margin:0 0 8px;">Next Step — Visit the Maktab</p>
              <p style="color:#78350f;font-size:13px;margin:0 0 4px;">
                Please visit us to complete the physical admission process and document verification.
              </p>
              <p style="color:#92400e;font-size:13px;font-weight:600;margin:4px 0 2px;">
                Maktab Meezan-ul-Qur'an, Bihar, India
              </p>
            </div>

            <p style="color:#374151;font-style:italic;">
              May Allah accept your effort and bless ${registration.studentName} with the love of the Qur'an. Ameen.
            </p>
          </div>

          <div style="text-align:center;padding:0 28px 20px;">
            <a href="https://meezanulquran.com"
              style="background:#14532d;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:600;">
              Visit Our Website
            </a>
          </div>

          <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
            <p style="margin:0;">Maktab Meezan-ul-Qur'an · Bihar, India</p>
            <p style="margin:4px 0 0;">This is an automated receipt. Please keep it for your records.</p>
          </div>
        </div>
      </div>
    `,
  });
}

// ── Admin notification email
async function sendAdminNotification(registration, paymentId) {
  const transporter = getTransporter();
  const { name, relLabel } = getGuardianLabel(registration);
  const guardianEmailDisplay = getReceiptEmail(registration) || "—";

  const addr = registration.address
    ? `${registration.address.houseNumber}, ${registration.address.village}, ${registration.address.city}, ${registration.address.state} - ${registration.address.pinCode}`
    : "—";

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Registration — ${registration.studentName} (${registration.registrationId})`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

          <div style="background:#1e3a5f;color:#fff;padding:24px;text-align:center;">
            <h2 style="margin:0 0 4px;">New Student Registration</h2>
            <p style="margin:0;color:#bfdbfe;font-size:14px;">Payment confirmed</p>
          </div>

          <div style="padding:28px;">
            <div style="background:#dbeafe;border:1px solid #bfdbfe;border-radius:8px;padding:14px 16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <p style="margin:0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;">Registration ID</p>
                <p style="margin:4px 0 0;font-size:20px;font-weight:800;color:#1d4ed8;">${registration.registrationId}</p>
              </div>
              <div style="text-align:right;">
                <p style="margin:0;font-size:11px;color:#6b7280;">Amount Paid</p>
                <p style="margin:4px 0 0;font-size:20px;font-weight:800;color:#14532d;">Rs. 100</p>
              </div>
            </div>

            <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#14532d;border-bottom:1px solid #e5e7eb;padding-bottom:8px;margin:0 0 12px;">
              Student Information
            </h3>
            <table style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:20px;">
              <tr><td style="padding:7px 0;color:#6b7280;width:160px;">Student Name</td><td style="padding:7px 0;font-weight:600;">${registration.studentName}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Date of Birth</td><td style="padding:7px 0;font-weight:600;">${registration.dob}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Age</td><td style="padding:7px 0;font-weight:600;">${registration.age} years</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Gender</td><td style="padding:7px 0;font-weight:600;text-transform:capitalize;">${registration.gender}</td></tr>
            </table>

            <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#14532d;border-bottom:1px solid #e5e7eb;padding-bottom:8px;margin:0 0 12px;">
              Parent / Guardian
            </h3>
            <table style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:20px;">
              <tr><td style="padding:7px 0;color:#6b7280;width:160px;">Father's Name</td><td style="padding:7px 0;font-weight:600;">${registration.fatherName}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Mother's Name</td><td style="padding:7px 0;font-weight:600;">${registration.motherName}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Responsible ${relLabel}</td><td style="padding:7px 0;font-weight:700;color:#1d4ed8;">${name}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Guardian Email</td><td style="padding:7px 0;font-weight:600;">${guardianEmailDisplay}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Occupation</td><td style="padding:7px 0;font-weight:600;">${registration.guardianOccupation || "—"}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Phone</td><td style="padding:7px 0;font-weight:600;">${registration.phone}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Alt Phone</td><td style="padding:7px 0;font-weight:600;">${registration.alternatePhone || "—"}</td></tr>
            </table>

            <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#14532d;border-bottom:1px solid #e5e7eb;padding-bottom:8px;margin:0 0 12px;">
              Address
            </h3>
            <p style="font-size:14px;font-weight:600;color:#111827;margin:0 0 20px;">${addr}</p>

            <h3 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#14532d;border-bottom:1px solid #e5e7eb;padding-bottom:8px;margin:0 0 12px;">
              Payment
            </h3>
            <table style="width:100%;font-size:14px;border-collapse:collapse;margin-bottom:24px;">
              <tr><td style="padding:7px 0;color:#6b7280;width:160px;">Payment ID</td><td style="padding:7px 0;font-family:monospace;font-size:12px;">${paymentId}</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Status</td><td style="padding:7px 0;font-weight:700;color:#14532d;">PAID</td></tr>
              <tr style="border-top:1px solid #f3f4f6;"><td style="padding:7px 0;color:#6b7280;">Date</td>
                <td style="padding:7px 0;font-weight:600;">
                  ${new Date().toLocaleString("en-IN", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            </table>

            <div style="text-align:center;">
              <a href="https://meezanulquran.com/admin"
                style="background:#1e3a5f;color:#fff;padding:12px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:600;">
                Open Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationId,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !registrationId
    ) {
      return Response.json(
        { error: "Missing payment details" },
        { status: 400 },
      );
    }

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    await connectDB();

    if (expectedSign !== razorpay_signature) {
      await StudentRegistration.findOneAndUpdate(
        { registrationId },
        { paymentStatus: "failed" },
      );
      return Response.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    const registration = await StudentRegistration.findOneAndUpdate(
      { registrationId },
      { razorpay_payment_id, razorpay_signature, paymentStatus: "paid" },
      { new: true },
    );

    if (!registration) {
      return Response.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    // Send emails — fire both concurrently, don't block response if they fail
    try {
      await Promise.all([
        sendGuardianReceipt(registration, razorpay_payment_id),
        sendAdminNotification(registration, razorpay_payment_id),
      ]);
    } catch (emailErr) {
      console.error("Email send failed (non-fatal):", emailErr);
    }

    return Response.json({
      success: true,
      registrationId: registration.registrationId,
      studentName: registration.studentName,
      fatherName: registration.fatherName,
      paymentStatus: registration.paymentStatus,
      razorpay_payment_id,
      createdAt: registration.createdAt,
    });
  } catch (err) {
    console.error("Verify reg payment error:", err);
    return Response.json({ error: "Verification failed" }, { status: 500 });
  }
}
