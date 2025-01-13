const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/auth.comtrollers.js');

router.get('/', (req, res) => {
  res.send('Hello I am User');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;
