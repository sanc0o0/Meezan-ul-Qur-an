import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a Buffer to Cloudinary.
 * @param {Buffer} buffer  - raw file bytes
 * @param {string} folder  - e.g. "meezan-ul-quran/student-photos"
 * @returns {Promise<string>} secure_url
 */
export async function uploadImage(buffer, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png"],
          transformation: [{ width: 800, crop: "limit" }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
}

export default cloudinary;
