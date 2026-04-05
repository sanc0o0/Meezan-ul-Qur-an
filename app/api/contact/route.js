import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "All fields required" },
        { status: 400 },
      );
    }

    await connectDB();
    await Contact.create({ name, email, message });

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Meezan-ul-Quran" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: "New Contact Message",
        html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
      });
    } catch (err) {
      console.error("Email error:", err);
    }

    return Response.json({ success: true });

  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
