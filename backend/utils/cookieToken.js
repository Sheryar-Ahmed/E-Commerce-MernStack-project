

const sendTokenWithCookie = (user, statusCode, res) => {
    const token = user.getJWTToken();
    //options for cookie to expire and http access
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 3600 * 1000
        ),
        httpOnly: true,
    }
    //sending and saving in cookie instead of localstorage which is not a good method
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    })
}

module.exports = sendTokenWithCookie