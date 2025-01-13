const express = require('express');
const router = express.Router();

const ownerModel = require('../models/owner.models');

router.get('/', (req, res) => {
  res.render('./admin');
});

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

// Export the router
module.exports = router;
