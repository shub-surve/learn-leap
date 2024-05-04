// common.js
const { Router } = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();
const User = require('../Model/userModel');

// POST: Register a new user
async function register(req, res) {
   try {
        const { username, password, email } = req.body;
        
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Please use a unique username" });
        }
        
        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Please use a unique email" });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);
        
        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save()
        .then(result => res.status(201).send({msg: "New User"}))
        .catch(err =>res.status(500).send(err))
        
       

   } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
   }
}

// POST: User login
async function login(req, res) {
    const {username , password} = req.body;
    try{

        const user = userModel.findOne({username});
        if(!user){
            return res.status(404).send({error: "Username Not found"});  
        }

        const isMatch = await bcrypt.compair(password , user.password);
        if(!isMatch){
            return res.status(400).send({error: "Please Enter Correct Password"});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Internal server error" });
    }
}

// GET: Retrieve user by username
async function getUser(req, res) {
    // Implement logic to retrieve user by username
}

// GET: Retrieve user by firstname
async function getFirstname(req, res) {
    // Implement logic to retrieve user by firstname
}

// PUT: Update user profile
async function updateUser(req, res) {
    // Implement logic to update user profile
}

// POST: Generate OTP for user
async function generateOTP(req, res) {
    // Implement logic to generate OTP for user
}

// POST: Verify OTP for user
async function verifyOTP(req, res) {
    // Implement logic to verify OTP for user
}

// POST: Reset user password
async function resetPass(req, res) {
    // Implement logic to reset user password
}

// Export all functions as an object
module.exports = {
    register,
    login,
    getUser,
    getFirstname,
    updateUser,
    generateOTP,
    verifyOTP,
    resetPass
};
