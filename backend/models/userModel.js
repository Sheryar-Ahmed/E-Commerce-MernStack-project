const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

}, {
    timestamps: true
});
// hasing password before uploading to mongodb
userSchema.pre('save', async function (next) { // this line
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});
//generate jwt toekn
userSchema.methods.getJWTToken = function () {
    const user = this;
    const id = user.id;
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};
//to compare password
userSchema.methods.comparePassword = async function (currentpassword) {
    const user = this;
    const pass = await user.password;
    return await bcrypt.compare(currentpassword, pass);
};
//generating reset password token using crypto
userSchema.methods.getResetPasswordToken = function () {
    //generating Token with randombytes
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    //expire time set to 15min
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    //return resettoken just a randombyte
    return resetToken;
};


const user = mongoose.Models?.user || mongoose.model("user", userSchema);
module.exports = user;