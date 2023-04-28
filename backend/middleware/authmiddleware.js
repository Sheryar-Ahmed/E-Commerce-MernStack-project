const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');


const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        res.status(409);
        throw new Error("User not logged In");
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});


module.exports = isAuthenticated;