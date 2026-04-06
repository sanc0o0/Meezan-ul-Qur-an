import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

export async function POST(req) {
  try {
    const body = await req.text();
    console.log("Webhook received:", body);
    const signature = req.headers.get("x-razorpay-signature");

    console.log("Received signature:", signature);

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      await connectDB();

      await Payment.findOneAndUpdate(
        { razorpay_order_id: payment.order_id },
        {
          razorpay_payment_id: payment.id,
          status: "paid",
        },
        { returnDocument: "after" },
      );
      console.log("Payment updated for order:", payment.order_id);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Webhook failed", { status: 500 });
  }
}