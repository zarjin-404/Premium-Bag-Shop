const express = require('express');
const router = express.Router();

const ownerModel = require('../models/owner.models');

router.get('/', (req, res) => {
  res.send('Hello, I am Owner');
});

if (process.env.NODE_ENV === 'development') {
  router.post('/create', async (req, res) => {
    const owner = await ownerModel.findOne();
    if (owner) {
      return res.status(400).send('Owner already exists');
    }
    const { fullname, email, password } = req.body;
    try {
      const newOwner = await ownerModel.create({ fullname, email, password });
      res.status(201).send(newOwner);
    } catch (error) {
      res.status(500).send('Error creating owner');
    }
  });
}

// Export the router
module.exports = router;
