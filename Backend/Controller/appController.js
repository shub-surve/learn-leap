// common.js
const { Router } = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = Router();
const User = require('../Model/userModel');
const JWT_Token = require('./JWT.js');
const userModel = require('../Model/userModel');
const ProfileSchema = require('../Model/profileModel.js')
const nodemailer = require('nodemailer')
const mailgen = require('mailgen')
const {EMAIL , PASSWORD} = require("./mail.js")

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
        await newUser.save();

        // Send registration email
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        let mailOptions = {
            from: EMAIL,
            to: email,
            subject: 'Welcome to LearnNleap!',
            text: `Hi ${username},\n\nThank you for registering with LearnNleap! We're excited to have you on board.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                return res.status(500).send({ error: "Failed to send registration email" });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(201).send({ msg: "New user registered and email sent" });
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}



//Middleware yp varify user 

async function verifyUser(req, res, next) {
    let exist;
    if (req.method === "GET") {
        const { username, _id } = req.query;
        exist = await userModel.findOne({ $or: [{ username }, { _id }] });
    } else {
        const { username, _id } = req.body;
        exist = await userModel.findOne({ $or: [{ username }, { _id }] });
        console.log(_id);
    }
    if (!exist) return res.status(404).send({ error: "User not found" });
    
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


let userId;
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
       userId = user._id;
      console.log(userId);
  
      console.log('User found:', user);
     // Log the found user
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
        if (!userId) {
            return res.status(400).send({ error: "User not found" });
        }
        const profile = new ProfileSchema({
           userId : userId,
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


// GET: Profile
// GET: Profile
async function getProfile(req, res) {
    try {
        // Extract the userId from the request parameters or wherever it's stored in the request
        const { userId } = req.params;

        // Query the database to find the profile associated with the userId
        const profile = await ProfileSchema.findOne({ userId });

        // Check if the profile exists
        if (!profile) {
            return res.status(404).send({ error: "Profile not found" });
        }

        // Return the profile data if found
        return res.status(200).send({ profile });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}


// PUT: Update user profile


// Assuming your profile model is named Profile

async function updateUser(req, res) {
   try {
    const id = req.query.id;

    if(id){
        const body = req.body;
        
        userModel.updateOne({_id :id}, body , function(err , data){
            if(err) throw err;
            return res.status(201)/send("User updated...!")
        })
    }
   } catch (error) {
    return res.status(500).send({error: "Internal Server Error"})
   }
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
    getProfile,
    updateUser,
    generateOTP,
    verifyOTP,
    resetPass,
    verifyUser,
    createProfile,
    userId
};
