//Cloudinary Upload
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "/globalaid/rentals",
};

const uploadImagesToCloudinary = async (images) => {
  try {
    const uploadPromises = images.map((image) => {
      return cloudinary.uploader.upload(image, opts);
    });

    const uploadResults = await Promise.all(uploadPromises);
    const uploadedUrls = uploadResults.map((result) => result.secure_url);

    return uploadedUrls;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default uploadImagesToCloudinary;
