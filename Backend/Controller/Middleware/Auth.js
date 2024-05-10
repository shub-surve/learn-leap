// authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js'); // Assuming you have a JWT secret stored in a config file

function authenticateUser(req, res, next) {
    // Check if the authorization header is present in the request
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    // Extract the JWT token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the JWT token
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).send({ error: 'Invalid token' });
        }

        // Attach the decoded token (user data) to the request object for further processing
        req.user = decodedToken;

        // Move to the next middleware or route handler
        next();
    });
}

module.exports = authenticateUser;
