const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
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

module.exports = mongoose.model('owner', ownerSchema);
