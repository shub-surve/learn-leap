const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: true  // Ensures username is unique across the database
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true  // Ensures email is unique across the database
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    mobileNumber: {
        type: Number,
    }
});

module.exports = mongoose.model('User', UserSchema);
