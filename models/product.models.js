const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  discount: {
    type: String,
  },
  image: {
    type: Buffer,
  },
  bgcolor: {
    type: String,
  },
  panelcolor: {
    type: String,
  },
  textcolor: {
    type: String,
  },
});

module.exports = mongoose.model('product', productSchema);
