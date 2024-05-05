const crypto = require('crypto');

// Generate a secure random secret key
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Export the generateSecretKey function
module.exports = generateSecretKey;
