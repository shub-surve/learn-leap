// common.js
const { Router } = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();
const User = require('../Model/userModel');
const JWT_Token = require('./JWT.js');
const userModel = require('../Model/userModel');
const ProfileSchema = require('../Model/profileModel.js')

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

//Middleware yp varify user 

async function verifyUser(req , res, next) { 
    const {username} = req.method === "GET" ? req.query : req.body;
    
    let exist = await userModel.findOne({username});
    if(!exist) return res.status(404).send({error : "Username not found"});
    next(); 
}

// POST: User login
async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Username Not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "Please Enter Correct Password" });
        }

        const token = jwt.sign(
            {
                userid: user._id,
                username: user.username
            },
            JWT_Token,
            { expiresIn: '24h' }
        );
    
        return res.status(200).send({
            msg: "Login Success",
            username: user.username,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Internal server error" });
    }
}



// GET: Retrieve user by username
async function getUser(req, res) {
    const { username } = req.params;
  
    try {
      console.log('Received request for user:', username); // Log the request
  
      if (!username) {
        console.log('Invalid user'); // Log the error
        return res.status(400).send({ error: "Invalid user" });
      }
  
      console.log('Querying database for user:', username); // Log before querying
  
      const user = await userModel.findOne({ username }).exec();
  
      if (!user) {
        console.log('User not found'); // Log if user not found
        return res.status(404).send({ error: "User not found" });
      }
  
      console.log('User found:', user); // Log the found user
      return res.status(200).send({ user });
    } catch (error) {
      console.error('Error:', error); // Log any errors
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }

  //POST: Profile post
  async function createProfile(req, res) {
    const { firstName, lastName, dateOfBirth, mobileNumber, location, collegeName, courseName , profilePicture} = req.body;
     

    try {
        const profile = new ProfileSchema({
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

        return res.status(201).send({ message: "Profile Saved" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
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
    resetPass,
    verifyUser,
    createProfile
};
