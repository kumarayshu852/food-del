import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_API_KEY) {
    console.log("❌ ENV NOT LOADED");
}



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("NAME:", process.env.CLOUDINARY_CLOUD_NAME)
console.log("KEY:", process.env.CLOUDINARY_API_KEY)
console.log("SECRET:", process.env.CLOUDINARY_API_SECRET)
export default cloudinary;