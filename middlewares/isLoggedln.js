const jwt = require('jsonwebtoken');
const userModels = require('../models/user.models');

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash('error', 'You must be logged in to access this page');
    return res.redirect('/');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModels
      .findOne({ email: decoded.email })
      .select('-password');
    req.user = user;
    next();
  } catch (error) {
    req.flash('error', 'You must be logged in to access this page');
    return res.redirect('/');
  }
};
