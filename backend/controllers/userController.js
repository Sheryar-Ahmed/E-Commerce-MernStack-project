
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendTokenWithCookie = require('../utils/cookieToken');
const sendEmail = require('../utils/sendEmail.js')

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

//forgot password
const forgotPassword = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ 'email': email });
    console.log(user);
    if (!user) {
        res.status(404);
        throw new Error("User not Found");
    };
    const resetToken = user.getResetPasswordToken(); //it return resetToken
    // our user has already created, we call getResetPasswordToken, it will add resetToken and expires time but will not save untill we do it manually.
    await user.save({ validateBeforeSave: false });
    //resetpasswordUrl
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    //message for customers
    const message = `Here is your password Reset Token :- \n\n ${resetPasswordUrl} 
    \n\n\n if you have not requested this email, please ignore it.`;
    //
    try {
        //send Email function with an object object
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Recovery.',
            message,
        });
        res.status(200).json({
            success: true,
            message: "Email sent Successfully 😎."
        })
    } catch (err) {
        //if any error comes, we need to undefine both resetpasswordtoken and expire time.
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        //its an server error;
        res.status(500);
        throw new Error(err.message);
    };

});


module.exports = { userRegistration, userLogin, logout, forgotPassword };