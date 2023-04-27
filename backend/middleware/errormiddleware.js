
const errorHandler = (err, req, res, next) => {
    const statusCode = re.statusCode ? res.statusCode : 500;

    res.statusCode(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
};

module.exports = { errorHandler };