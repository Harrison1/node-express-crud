const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const User = require('../../models/user');

router.route('/login').get((req, res) => {
	res.render('login', { message: req.flash('loginMessage') });
}).post(passport.authenticate('local-login', {
	successRedirect: '/all', 
	failureRedirect: '/login', 
	failureFlash: true })
);

router.route('/signup').get((req, res) => {
	res.render('signup', { message: req.flash('signupMessage') });
}).post(passport.authenticate('local-signup', { 
	successRedirect: '/all', 
	failureRedirect: '/signup', 
	failureFlash: true })
);

router.route('/logout').get((req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
