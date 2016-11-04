const routes = require('express').Router();
const superheros = require('./superheros');

routes.use('/', superheros);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;