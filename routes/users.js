const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email!').isEmail(),
  check('username', 'Minimum 4 characters required!').isLength({ min: 4 }),
  check('password', 'Minimum 6 characters required!').isLength({ min: 6 })
], async (req, res) => {
  // Get errors if any
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return bad request
    return res.status(400).json({ msg: errors.array() });
  }

  const { username, email, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(400).json({
      msg: [{
        msg: "Passwords do not match!",
        param: "password2"
      }]
    })
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      // Message is formated in such way to look similar to errors sent from validationResult
      return res.status(400).json({
        msg: [{
          msg: "User already exists!",
          param: "email"
        }]
      });
    }

    user = new User({
      username,
      email,
      password
    });

    // @genSalt - generate salt
    // @param - determines how secure the salt is
    // Need it to encrypt the password
    const salt = await bcrypt.genSalt(10);

    // Generate a hashed version of the password and reasign it to the user
    user.password = await bcrypt.hash(password, salt);

    // Save user in DB
    await user.save();

    // ### JWT Logic starts here
    // Create the object we want to send to the token
    // In our case, we only need user's ID 
    const payload = {
      user: {
        id: user.id
      }
    }

    // Sign the token using the secret variable from config
    jwt.sign(payload, config.get('jwtSecret'), {
      // Token expires in 2 hours from its creation
      expiresIn: 7200
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;