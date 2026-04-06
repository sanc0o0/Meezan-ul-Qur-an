import Razorpay from "razorpay";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

export async function POST(req) {
  try {
    const { amount, name, email } = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    await connectDB();
    const existing = await Payment.findOne({
      email,
      amount,
      status: "created",
    });

    if (existing) {
      return Response.json(existing);
    }

    // ✅ Save initial payment
    await Payment.create({
      name,
      email,
      amount,
      razorpay_order_id: order.id,
      status: "created",
    });

    return Response.json(order);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Order failed" }, { status: 500 });
  }
}
