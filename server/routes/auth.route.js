const express = require('express');
const { loginController, registerController, verifyOfficerController, sendEmailController, resetPasswordController } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);

//verify officer
router.post('/verify-officer', verifyOfficerController);

//Password
router.post('/send-email', sendEmailController);
router.post('/reset-password',resetPasswordController );

module.exports = router;