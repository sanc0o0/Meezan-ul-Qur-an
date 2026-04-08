import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

function verifyAdmin(req) {
  const token = req.cookies.get("adminToken")?.value;

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    await connectDB();

    if (expectedSign === razorpay_signature) {
      const payment = await Payment.findOneAndUpdate(
        { razorpay_order_id },
        {
          razorpay_payment_id,
          razorpay_signature,
          status: "paid",
        },
        { returnDocument: "after" },
      );
      
      if (!payment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }

      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: payment.email,
          subject: "Donation Received - Meezan-ul-Quran",
          html: `
            <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
              <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                
                <!-- Header -->
                <div style="background:#065f46; color:#ffffff; padding:25px; text-align:center;">
  
                  <div style="background:white; display:inline-block; padding:5px 5px 0px 5px; border-radius:8px; margin-bottom:10px;">
                    <img src="https://meezanulquran.com/logo.png" height="55" />
                  </div>

                  <h2 style="margin:0;">Meezan-ul-Quran</h2>
                  <p style="margin:5px 0 0;">Donation Receipt</p>

                </div>

                <!-- Body -->
                <div style="padding:25px;">
                  <p style="font-size:16px;">Assalamu Alaikum <b>${payment.name}</b>,</p>
                  <p>Thank you for your generous contribution. Your support helps us continue our mission.</p>

                  <!-- Highlight Amount -->
                  <div style="background:#ecfdf5; border:1px solid #10b981; padding:15px; border-radius:8px; text-align:center; margin:20px 0;">
                    <p style="margin:0; font-size:14px; color:#065f46;">Amount Donated</p>
                    <h1 style="margin:5px 0; color:#047857;">₹${payment.amount}</h1>
                  </div>

                  <!-- Details -->
                  <table style="width:100%; font-size:14px; border-collapse:collapse;">
                    <tr>
                      <td style="padding:8px 0; color:#555;">Payment ID:</td>
                      <td style="padding:8px 0;"><b>${payment.razorpay_payment_id || "N/A"}</b></td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0; color:#555;">Date:</td>
                      <td style="padding:8px 0;"><b>${new Date(payment.updatedAt).toLocaleString()}</b></td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0; color:#555;">Email:</td>
                      <td style="padding:8px 0;"><b>${payment.email}</b></td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0; color:#555;">Receipt ID:</td>
                      <td style="padding:8px 0;"><b>${payment._id}</b></td>
                    </tr>
                  </table>

                  <p style="margin-top:20px;">May Allah reward you abundantly 🤲</p>
                </div>

                <div style="text-align:center; margin-top:25px;">
                  <a href="https://meezanulquran.com" 
                    style="background:#047857; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; display:inline-block;">
                    Visit Our Website
                  </a>
                </div>

                <!-- Footer -->
                <div style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#777;">
                  <p style="margin:0;">Meezan-ul-Quran • Bihar, India</p>
                  <p style="margin:5px 0;">This is an automated receipt. Please keep it for your records.</p>
                </div>

              </div>
            </div>
          `,
        });
      } catch (err) {
        console.error("Email sending failed:", err);
      }

      return NextResponse.json({ success: true });
    } else {
      await Payment.findOneAndUpdate(
        { razorpay_order_id },
        { status: "failed" },
      );

      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

export async function GET(req) {
  const isAdmin = verifyAdmin(req);

  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const payments = await Payment.find().sort({ createdAt: -1 });

  return NextResponse.json(payments);
}

