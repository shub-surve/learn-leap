const express = require("express");
const router = express.Router();
const { register, login, getUser, getFirstname, updateUser, generateOTP, verifyOTP, verifyUser, resetPass, createProfile } = require('../Controller/appController');
const { authenticateUser } = require('../Controller/Middleware/Auth.js');

// POST methods for login
router.post('/register', register);
router.post('/registerMail', (req, res) => res.end()); // send register mail
router.post('/authenticate', verifyUser, (req, res) => res.end()); // authenticate user
router.post('/login', verifyUser, login); // login in app
router.post('/profile', createProfile); // create user profile

// Get Methods
router.get('/user/:firstname', getFirstname); // get first name of user
router.get('/:username', getUser); // get username of the user
router.get('/generateOTP', generateOTP); // generate otp for password change
router.get('/verifyOTP', verifyOTP); // verify otp

// PUT methods
router.put('/Profile-update/', updateUser); // update profile details
router.put('/resetPass', resetPass); // update password

module.exports = router;
