const routes = require('express').Router();
const passport = require('./passport');
const superheros = require('./superheros');
const user = require('./user');
const contacts = require('./contacts');

routes.use('/', passport);
routes.use('/', superheros);
routes.use('/', user);
routes.use('/', contacts);

module.exports = routes;
