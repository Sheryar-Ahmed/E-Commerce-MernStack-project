const errorHanlder = (err, req, res, next) => {
    // if the statuscode which i set in the file is there then go with it else go with server error
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = { errorHanlder }