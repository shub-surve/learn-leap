const jwt = require('jsonwebtoken');
const JWT_Token = require('../JWT.js')

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_Token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
}

module.exports = { isAuthenticated };