const express = require('express');
const User = require('../../models/user');
const router = express.Router();

router.route('/profile').get(isAuthenticated, (req, res) => {
	res.render('user/profile', {user: req.user});
});

router.route('/admin').get(isAuthenticated, (req, res) => {
	User.find((err, data) => {
		(err) ? res.send(err) : res.render('user/admin', {users: data});
	});
});

function isAuthenticated(req, res, next) {
	console.log('is auth firing');
	req.isAuthenticated() ? next() : res.redirect('login');
}

module.exports = router;
