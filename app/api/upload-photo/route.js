import { uploadImage } from "@/lib/cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        { error: "Only JPG, JPEG, and PNG files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return Response.json(
        { error: "File size must be under 2 MB" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const photoUrl = await uploadImage(
      buffer,
      "meezan-ul-quran/student-photos",
    );

    return Response.json({ success: true, photoUrl });
  } catch (err) {
    console.error("Photo upload error:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
