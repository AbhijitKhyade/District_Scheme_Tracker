const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const expiresIn = '3h'; // Token expiration time
    const payload = {
        user: {
            id: user.id,
            role: user.role,
            email: user.email,
        },
        expiresIn: expiresIn, // Include expiration time in payload
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
};

module.exports = generateToken;
