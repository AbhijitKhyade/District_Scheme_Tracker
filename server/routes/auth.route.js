const express = require('express');
const { loginController, registerController, verifyOfficerController } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
// router.post('/forgot-password', forgotPasswordController);
// router.post('/reset-password', resetPasswordController);

//verify officer
router.post('/verify-officer', verifyOfficerController);

module.exports = router;