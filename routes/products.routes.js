const express = require('express');
const router = express.Router();

const upload = require('../config/multer.config');

const productModels = require('../models/product.models');

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    if (!name || !price || !discount || !bgcolor || !panelcolor || !textcolor) {
      return res
        .status(400)
        .json({ message: 'Please fill all the products fields' });
    }

    const product = await productModels.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: req.file.buffer,
    });
    req.flash('product created successfully');
    res.redirect('/shop');
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

module.exports = router;
