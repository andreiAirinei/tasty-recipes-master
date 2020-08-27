// Middleware is just a function that has access to request / response cycle
// Everytime we hit an endpoint we can fire off this middleware

// Anytime we need to protect a Route, we bring this middleware
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there is no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied!' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // If it verifies, get the user and call next()
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid!' });
  }
}