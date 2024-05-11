const express = require("express");
const router = express.Router();
const { register, login, getUser,  updateUser,   verifyUser,  createProfile, getProfile } = require('../Controller/appController');
const { authenticateUser } = require('../Controller/Middleware/Auth.js');
// POST methods for login
router.post('/register', register);


router.post('/login', login); // login in app
router.post('/profile', createProfile); // create user profile

// Get Methods

router.get('/:username', getUser); // get user details by username

router.get('/profile/:userId' , getProfile); // get user profile by userId

// PUT methods
router.put('/Profile-update', updateUser); // update profile details


module.exports = router;
