// Profile.js
const mongoose = require('mongoose');



const ProfileSchema = new mongoose.Schema({
  userId: { 
      type: mongoose.Schema.Types.ObjectId, 
     
  },
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  dateOfBirth: {
      type: String
  },
  mobileNumber: {
      type: String
  },
  location: {
      type: String
  },
  collegeName: {
      type: String
  },
  courseName: {
      type: String
  },
  profilePicture: {
      type: String 
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);