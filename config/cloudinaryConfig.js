const cloudinary = require("cloudinary");
const uploader = cloudinary.uploader;
const config = cloudinary.config;
const cloudinaryConfig = () => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

module.exports = { cloudinaryConfig, uploader };
