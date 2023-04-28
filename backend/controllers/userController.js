
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendTokenWithCookie = require('../utils/cookieToken');

const userRegistration = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Nothin in request");
    };

    const { name, email, password } = await req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Something is missing");
    };

    const userExists = await User.findOne({ 'email': email });
    if (userExists) {
        res.status(409);
        throw new Error("An email already exists, try with different email");
    };
    const registeredUser = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "temporary allotment",
            url: "temporary.com/profilepic",
        }
    });
    if (!registeredUser) {
        res.status(400)
        throw new Error("User not created, try again");
    };

    sendTokenWithCookie(registeredUser, 201, res);
});

const userLogin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Something is missing");
    };
    // +password because we exclude in our schema;
    const userFound = await User.findOne({ 'email': email }).select('+password');
    if (!userFound) {
        res.status(409);
        throw new Error("Invalid credentials");
    };
    //method to compare password with db
    const isPasswordMatched = await userFound.comparePassword(password);
    if (!isPasswordMatched) {
        res.status(409);
        throw new Error("Invalid credentials");
    };

    sendTokenWithCookie(userFound, 200, res);

});
//Logout function
const logout = expressAsyncHandler(async (req, res) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out Successfully",
    });
    
});
module.exports = { userRegistration, userLogin, logout };