const ApiError = require("./ApiError");
const jwt = require('jsonwebtoken');

const VerifyUser = async (req, res, next) => {
    // const token = req.header('Authorization')?.split(' ')[1];
    // // console.log('user token: ', token);
    const token = req.cookies.__session; // Access token from cookie
    console.log('user token: ', token);
    if (!token) {
        return ApiError(401, 'Access Denied', 'No token provided', res);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log('user token verified successfully', req.user);
        next();
    } catch (error) {
        return ApiError(400, 'Invalid token', error.message, res);
    }
};

module.exports = VerifyUser;