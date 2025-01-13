const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModels = require('../models/user.models.js');
require('dotenv').config();

const registerUser = async function (req, res) {
  try {
    const { fullname, email, password } = req.body;

    // Validate input
    if (!fullname || !email || !password) {
      return res.status(400).send('Please provide all user fields');
    }

    // Check if user with the same email already exists
    const existingUser = await usersModels.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists with this email');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await usersModels.create({
      fullname,
      email,
      password: hash,
    });

    // Create JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
    );

    // Set token in cookie
    res.cookie('token', token);

    // Respond with user details (excluding password hash)
    res.status(201).json({
      id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send('Please provide all user fields');
    }

    // Check if user exists
    const user = await usersModels.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send('login failed');
      }

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
      );

      res.cookie('token', token);
      res.redirect('/shop');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('login failed');
  }
};

const logoutUser = async function (req, res) {
  try {
    res.clearCookie('token');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

module.exports = { registerUser, loginUser, logoutUser };
