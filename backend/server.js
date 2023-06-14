const app = require('./app');
const dbConn = require('./config/db');
const PORT = process.env.NODE_PORT || 5000;
const cloudinary = require('cloudinary');

dbConn(); //mongodb connection

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINAR_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  


app.listen(PORT, () => console.log(`server is running on ${PORT}`))