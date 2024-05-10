const express = require("express");
const router = express.Router();
const { register, login, getUser, getFirstname, updateUser, generateOTP, verifyOTP, verifyUser, resetPass, createProfile, getProfile } = require('../Controller/appController');
const { authenticateUser } = require('../Controller/Middleware/Auth.js');

// POST methods for login
router.post('/register', register);
router.post('/registerMail', (req, res) => res.end()); // send register mail
router.post('/authenticate', authenticateUser, login); // authenticate user
router.post('/login', authenticateUser, login); // login in app
router.post('/profile', createProfile); // create user profile

// Get Methods
router.get('/user/firstname/:firstname', getFirstname); // get first name of user
router.get('/user/:username', getUser); // get user details by username
router.get('/generateOTP', generateOTP); // generate otp for password change
router.get('/verifyOTP', verifyOTP); // verify otp
router.get('/profile/:userId' , getProfile); // get user profile by userId

// PUT methods
router.put('/Profile-update', updateUser); // update profile details
router.put('/resetPass', resetPass); // update password

module.exports = router;
