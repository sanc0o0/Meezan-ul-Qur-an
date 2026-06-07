import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import StudentRegistration from "@/models/StudentRegistration";

export async function POST(req) {
  try {
    const body = await req.json();


    const { registrationId } = body;


    if (!registrationId) {
      return Response.json(
        { error: "Registration ID is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const registration = await StudentRegistration.findOne({ registrationId });

    if (!registration) {
      return Response.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    if (registration.paymentStatus === "paid") {
      return Response.json(
        { error: "Registration fee already paid" },
        { status: 409 },
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: 100 * 100, // ₹100 in paise
      currency: "INR",
      receipt: `reg_${registrationId}_${Date.now()}`,
      notes: {
        registrationId,
        studentName: registration.studentName,
        type: "registration_fee",
      },
    });

    // Store order ID on the registration doc
    await StudentRegistration.findOneAndUpdate(
      { registrationId },
      { razorpay_order_id: order.id },
    );

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      registrationId,
      studentName: registration.studentName,
      fatherName: registration.fatherName,
      phone: registration.phone,
      email: registration.email,
    });
  } catch (err) {
    console.error("Create reg order error:", err);
    return Response.json({ error: "Order creation failed" }, { status: 500 });
  }
}
