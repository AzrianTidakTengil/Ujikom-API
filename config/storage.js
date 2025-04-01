require('dotenv').config()
const cloudinary = require('cloudinary')

cloudinary.v2.config({ 
    cloud_name: 'dxxl1ywmx', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary