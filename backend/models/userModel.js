const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        uniqure: true,
        validate: [validator.isEmail, "Please enter a valid email"]

    },
    password: {
        type: String,
        required: [true, "Enter your name"],
        minLength: [8, "Password must be greater than or equal to 8 characters"],
        select: false // when get users list exclude password

    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre('save', async function(next) { // this line
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});
const user = mongoose.Models?.user || mongoose.model("user", userSchema);
module.exports = user;