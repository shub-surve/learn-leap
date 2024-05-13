const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const JWT_Token = require('./JWT.js');
const ProfileSchema = require('../Model/profileModel');
const { sendRegistrationEmail } = require('./Mailer.js');
const { isAuthenticated } = require('./Middleware/Auth.js');

const router = Router();


// Middleware to verify user
async function verifyUser(req, res, next) {
    const { username, _id } = req.query;
    const user = await User.findOne({ $or: [{ username }, { _id }] });
    if (!user) return res.status(404).json({ error: "User not found" });
    req.user = user;
    next();
}

// Register a new user
async function register(req, res) {
    try {
        const { username, password, email, firstName, lastName, mobileNumber } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email is already taken" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new user and save it to the database
        const newUser = new User({ username, password: hashedPassword, email, firstName, lastName, mobileNumber });
        const savedUser = await newUser.save();

        // Create a new profile for the user
        const newProfile = new ProfileSchema({
            userId: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            mobileNumber: savedUser.mobileNumber
        });
        await newProfile.save();

        // Send registration email
        await sendRegistrationEmail(email, username);

        return res.status(201).json({ msg: "New user registered and email sent" });
    } catch (error) {
        console.error("Error in registration:", error);

        // Check for specific errors
        if (error.name === 'ValidationError') {
            // Handle validation errors (e.g., required fields missing)
            return res.status(400).json({ error: error.message });
        } else {
            // Handle other unexpected errors
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}


// User login
async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "Username Not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Please Enter Correct Password" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_Token, { expiresIn: '24h' });

        return res.status(200).json({ msg: "Login Success", username: user.username, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Retrieve user by username
async function getUserByUsername(req, res) {
    // Retrieve user implementation
}

// Create user profile
async function createProfile(req, res) {
    const { userId, firstName, lastName, dateOfBirth, mobileNumber, location, collegeName, courseName, profilePicture } = req.body;

    try {
        const profile = new ProfileSchema({
            userId,
            firstName,
            lastName,
            dateOfBirth,
            mobileNumber,
            location,
            collegeName,
            courseName,
            profilePicture
        });

        await profile.save();

        return res.status(201).json({ message: "Profile Saved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Retrieve user profile
async function getProfile(req, res) {
    try {
        const { userId } = req.params;

        const profile = await ProfileSchema.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        return res.status(200).json({ profile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Update user profile
async function updateProfile(req, res) {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const updatedProfile = await ProfileSchema.findOneAndUpdate({ userId }, updates, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        return res.status(200).json({ updatedProfile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {
    register,
    login,
    verifyUser,
    createProfile,
    getProfile,
    updateProfile 
};
