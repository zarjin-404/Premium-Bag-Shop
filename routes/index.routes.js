const express = require('express');
const router = express.Router();

const productModels = require('../models/product.models.js');
const userModels = require('../models/user.models.js');

const isLoggedIn = require('../middlewares/isLoggedln.js');

router.get('/', (req, res) => {
  const error = req.flash('error');
  res.render('./index', { error, isLoggedIn: false });
});

router.get('/shop', isLoggedIn, async (req, res) => {
  try {
    const products = await productModels.find();
    res.render('./shop', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/addtocart/:id', isLoggedIn, async (req, res) => {
  try {
    const user = await userModels.findOne({ email: req.user.email });
    user.cart.push(req.params.id); // Corrected here from _id to id
    await user.save();
    res.redirect('/shop');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/cart', isLoggedIn, async (req, res) => {
  try {
    const user = await userModels
      .findOne({ email: req.user.email })
      .populate('cart');

    const bill =
      Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

    res.render('./cart', { user, bill });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
