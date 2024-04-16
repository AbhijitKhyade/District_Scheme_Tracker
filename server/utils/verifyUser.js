const VerifyUser = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return ApiError(401, 'Access Denied', 'No token provided', res);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return ApiError(400, 'Invalid token', error.message, res);
    }
};

module.exports = VerifyUser;