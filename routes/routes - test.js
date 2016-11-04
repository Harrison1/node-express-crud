const routes = require('express').Router();
const superheros = require('./superheros');
const athletes = require('./athletes');

routes.use('/', superheros);
routes.use('/athletes', athletes);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;