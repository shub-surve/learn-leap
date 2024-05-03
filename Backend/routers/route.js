const express = require("express");
const router = express.Router();
const { register,
    login,
    getUser,
    getFirstname,
    updateUser,
    generateOTP,
    verifyOTP,
    resetPass} = require('../Controller/appController')



{/*==== LOGIN ROUTES ====*/}
//POST methods for login  
router.route('/register').post(register)
router.route('registerMail').post(); //send register male
router.route('/authenticate').post(); //authenticate user
router.route('/login').post(login); //login in app

// Get Methods
router.route('/user/:firstname').get(getFirstname);//get first name of user
router.route('/user/:username').get(getUser); //get username of the user
router.route('/generateOTP').get(generateOTP); //generate otp for password change
router.route('/verifyOTP').get(verifyOTP);// verify otp


//PUT methods
router.route('/Profile-update').put(updateUser) //update profile details
router.route('/resetPass').put(resetPass); //update password




// Export the router
module.exports = router;
