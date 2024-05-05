const generateSecretKey = require('./config.js');

const JWT_Token = generateSecretKey();

// console.log(JWT_Token);
module.exports = JWT_Token;
