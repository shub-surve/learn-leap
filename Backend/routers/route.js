const express = require("express");
const router = express.Router();
const {
    register,
    login,
    verifyUser,
    createProfile,
    getProfile,
    updateProfile
} = require("../Controller/appController.js");
const { isAuthenticated } = require('../Controller/Middleware/Auth.js');



console.log('appController:', require('../Controller/appController'));
// POST methods
router.post('/register', register);
router.post('/login', login);

// POST: Create user profile
router.post('/profiles', isAuthenticated, createProfile);

// Middleware to verify user
router.use('/users/:username', verifyUser);

// GET: Retrieve user by username
router.get('/users/:username', (req, res) => {
    const user = req.user;
    return res.status(200).json({ user });
});

// GET: Retrieve user profile
router.get('/profiles/:userId', isAuthenticated, getProfile);

// PUT: Update user profile
router.put('/profiles/:userId', isAuthenticated, updateProfile);

module.exports = router;