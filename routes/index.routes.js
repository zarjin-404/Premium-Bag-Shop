const express = require('express');
const router = express.Router();

const productModels = require('../models/product.models.js');

const isLoggedIn = require('../middlewares/isLoggedln.js');
router.get('/', (req, res) => {
  res.render('./index');
});

router.get('/shop', isLoggedIn, async (req, res) => {
  const products = await productModels.find();
  res.render('./shop', { products });
});

module.exports = router;
