const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      dateOfBirth: {
        type: Date
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
})
 

module.exports = mongoose.model('Profile' , ProfileSchema)
