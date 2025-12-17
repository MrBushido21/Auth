import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"; // если используешь .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadTest() {
  try {
    const result = await cloudinary.uploader.upload("./photo.jpg", {
      folder: "images",
    });

    console.log("✅ Загрузка успешна");
    console.log("URL:", result.secure_url);
    console.log("public_id:", result.public_id);
  } catch (err) {
    console.error("❌ Ошибка загрузки", err);
  }
}

uploadTest();
