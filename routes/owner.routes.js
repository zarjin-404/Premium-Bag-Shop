const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Iam Owner');
});

module.exports = router;
