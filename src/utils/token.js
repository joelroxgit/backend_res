const jwt = require('jsonwebtoken');


// Verifying a token
const verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);


// Signing a token
const createToken = (payload) => jwt.sign(payload, process.env.SECRET_KEY);

module.exports = { verifyToken, createToken };
