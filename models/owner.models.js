const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },

  products: {
    type: Array,
    default: [],
  },

  contact: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
  },
  gstin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
