const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
  ],
  isadmin: {
    type: Boolean,
    default: false,
  },

  orders: {
    type: Array,
  },

  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
