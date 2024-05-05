const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique username"],  
        unique: true  // Ensures username is unique across the database
    },
    password : {
        type: String,
        required: [true , "Please Provide unique password"],
        unique: true
    }    
     
})



module.exports = mongoose.model('User' , UserSchema)

