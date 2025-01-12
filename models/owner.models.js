const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
  },

  products: {
    type: Array,
    default: [],
  },

  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
  gstin: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
