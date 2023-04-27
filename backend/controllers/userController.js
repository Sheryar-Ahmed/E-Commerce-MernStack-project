
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');

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

    res.status(201).json({
        success: true,
        registeredUser
    })
});

module.exports = { userRegistration };