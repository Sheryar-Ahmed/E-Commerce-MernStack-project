const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');


const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(409);
        throw new Error("User not logged In");
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`Role: ${req.user.role} is not allowed to do this.`)
        }
        next();
    }
}
module.exports = { isAuthenticated, authorizeRole };