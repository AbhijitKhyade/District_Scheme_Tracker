const ApiError = async (status, message, data, res) => {
    return res.status(status).json({
        status,
        message,
        data
    });
};

module.exports = ApiError;