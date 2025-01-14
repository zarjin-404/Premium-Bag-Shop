const express = require('express');
const router = express.Router();

const ownerModel = require('../models/owner.models');

router.post('/create', async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    res.status(400).send('Please provide all fields');
  }
  try {
    const owner = await ownerModel.create({ fullname, email, password });
    res.send(owner);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/admin', (req, res) => {
  const success = req.flash('success');
  res.render('./createproducts', { success });
});

module.exports = router;
