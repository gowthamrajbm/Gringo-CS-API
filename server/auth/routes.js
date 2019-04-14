const router = require('express').Router(),
    verifyUser = require('./auth').verifyUser
    controller = require('./controller')

// Register for Admin
router.post('/register', controller.register);
router.post('/signin', verifyUser(), controller.signin)

// Register Signup for Merchant, Delivery and User
router.post('/signup',controller.signUp);
router.post('/signup-check/mobile',controller.signupCheckMobile);
router.post('/signup-check/email',controller.signupCheckEmail);
router.post('/signup-check/username',controller.signupCheckUserName);

router.post('/send-otp', controller.sendOTP);

module.exports = router