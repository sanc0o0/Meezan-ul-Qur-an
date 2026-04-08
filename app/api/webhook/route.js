import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Payment from "@/models/Payment";

export async function POST(req) {
  try {
    const body = await req.text();
    // console.log("Webhook received:", body);
    const signature = req.headers.get("x-razorpay-signature");

    console.log("Webhook Received");

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== signature) {
      console.log("Invalid Webhook Signature");
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const paymentEntity = event.payload.payment.entity;

      if (!paymentEntity || paymentEntity.status !== "captured") {
        console.log("Payment not captured, ignoring");
        return new Response("Ignored", { status: 200 });
      }

      await connectDB();

      const existing = await Payment.findOne({ 
        razorpay_order_id: paymentEntity.order_id 
      });

      if(!existing){
        console.log("Order not found in DB for order_id:", paymentEntity.order_id);
        return new Response("Order not found", { status: 200 });
      }

      if(existing.status === "paid"){
        console.log("Payment already marked as paid for order_id:", paymentEntity.order_id);
        return new Response("Already processed", { status: 200 });
      }

      await Payment.findOneAndUpdate(
        { razorpay_order_id: paymentEntity.order_id },
        {
          razorpay_payment_id: paymentEntity.id,
          status: "paid",
        },
        { returnDocument: "after" },
      );
      console.log("Payment updated for order:", paymentEntity.order_id);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Webhook failed", { status: 500 });
  }
}