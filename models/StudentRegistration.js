// FILE: models/StudentRegistration.js

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    houseNumber: { type: String, required: true },
    village: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
  },
  { _id: false },
);

const studentRegistrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      unique: true,
      required: true,
    },

    // Student info
    studentName: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: "" },
    dob: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    // Parent info
    fatherName: { type: String, required: true, trim: true },
    motherName: { type: String, required: true, trim: true },
    guardianOccupation: { type: String, default: "" },

    // ── Responsible Guardian (the person who will receive emails & be contacted)
    guardianName: { type: String, default: "" }, // full name
    guardianRelation: {
      // relation to student
      type: String,
      enum: ["father", "mother", "other"],
      default: "father",
    },
    guardianEmail: { type: String, default: "" }, // email for receipt

    // Contact
    phone: { type: String, required: true },
    alternatePhone: { type: String, default: "" },
    email: { type: String, default: "" }, // legacy — kept for backward compat
    emergencyContact: { type: String, default: "" },

    // Address
    address: { type: addressSchema, required: true },

    // Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    razorpay_order_id: { type: String, default: "" },
    razorpay_payment_id: { type: String, default: "" },
    razorpay_signature: { type: String, default: "" },

    // Admin workflow
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "contacted"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.models.StudentRegistration ||
  mongoose.model("StudentRegistration", studentRegistrationSchema);
