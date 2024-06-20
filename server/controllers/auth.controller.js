const User = require('../models/user.model');
const Officer = require('../models/officers.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { hashPassword, comparePassword } = require('../utils/passwords');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/EmailService');

const registerController = async (req, res) => {
    const { name, email, password, role, district } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return ApiError(400, 'Email already exists. Please Login!', null, res);
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword, role: role, district });

        return ApiResponse(201, 'User created successfully', data = null, res);
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
        const isMatch = await comparePassword(password, existingUser.password); // Pass the existing user's password here
        if (!isMatch) {
            return ApiError(400, 'Incorrect Password', null, res);
        }
        const token = await generateToken(existingUser);
        const user = { id: existingUser.id, name: existingUser.name, email: existingUser.email, role: existingUser.role, district: existingUser.district, token };
        return ApiResponse(200, 'Login successful', data = user, res);
    } catch (error) {
        console.log('Server Error: ', error.message);
        return ApiError(500, error.message, error, res);
    }
};

const verifyOfficerController = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingOfficer = await Officer.findOne({ officerEmail: email });
        if (!existingOfficer) {
            return ApiError(400, 'Your are not assigned to any District!', null, res);
        }
        const hashedPassword = await hashPassword(password);
        await User.create({ name, email, password: hashedPassword, role: role });

        return ApiResponse(201, 'Verification Successful', data = null, res);
    }
    catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

const sendEmailController = async (req, res) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
        return ApiError(400, 'User not found! Please Register', null, res);
    }
    subject = 'Password Reset';

    const resetUrl = `${process.env.RESET_PASSWORD_URL}/auth/reset-password`;
    // const text = `Click reset password to reset your password: ${resetUrl}`;
    const textContent = `
    Hi,

    You requested to reset your password. Please click the link below to reset your password:
    ${resetUrl}

    If you did not request this, please ignore this email.
`;
    try {
        sendEmail(email, subject, textContent);
        return ApiResponse(200, 'Email sent', data = null, res);
    }
    catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

const resetPasswordController = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;
    // console.log(req.body)
    if (newPassword !== confirmPassword) {
        return ApiError(400, 'Passwords do not match!', null, res);
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return ApiError(400, 'User not found!', null, res);
        }
        const hashedPassword = await hashPassword(newPassword);
        await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
        return ApiResponse(200, 'Password reset successful', data = null, res);
    }
    catch (error) {
        return ApiError(500, error.message, error, res);
    }
}

module.exports = {
    registerController, loginController,
    verifyOfficerController, sendEmailController, resetPasswordController
};