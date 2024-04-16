const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { hashPassword, comparePassword } = require('../utils/passwords');
const generateToken = require('../utils/generateToken');

const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return ApiError(400, 'Email already exists', null, res);
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return ApiResponse(201, 'User created successfully', data = newUser, res);
    } catch (error) {
        console.log('Server Error: ', error.message);
        return ApiError(500, error.message, error, res);
    }
};

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return ApiError(400, 'User not found!', null, res);
        }
        const isMatch = await User.comparePassword(password);
        if (!isMatch) {
            return ApiError(400, 'Incorrect Password', null, res);
        }
        const token = await user.generateToken();
        const user = { id: user.id, name: user.name, email: user.email, role: user.role, token };
        return ApiResponse(200, 'Login successful', data = user, res);
    } catch (error) {
        console.log('Server Error: ', error.message);
        return ApiError(500, error.message, error, res);
    }
};

module.exports = { registerController, loginController };