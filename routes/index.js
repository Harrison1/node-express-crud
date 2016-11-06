const routes = require('express').Router();
const superheros = require('./superheros');

routes.use('/', superheros);

module.exports = routes;