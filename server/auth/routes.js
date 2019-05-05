const router = require('express').Router(),
    controller = require('./controller')

// Register for Admin
router.post('/register', controller.register)
router.post('/addLocation', controller.location);
router.post('/login', controller.login);
// Register Signup for Merchant, Delivery and User
router.post('/verify',controller.verifyMobile);
router.post('/verifyOTP',controller.verifyOTP);

module.exports = router