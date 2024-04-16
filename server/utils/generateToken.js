const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            role: user.role
        }
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
};

module.exports = generateToken;