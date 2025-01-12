const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose');
const config = require('config');

mongoose
  .connect(`${config.get('MONGO_URI')}/shops`)
  .then(() => {
    debug('Connected to MongoDB');
  })
  .catch((error) => {
    debug('Error connecting to MongoDB', error);
  });

module.exports = mongoose.connection;
