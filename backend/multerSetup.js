const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('./config'); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // The folder where you want to store your images on Cloudinary
  },
});

const cloudinaryUpload = multer({ storage: storage });

module.exports = cloudinaryUpload;
