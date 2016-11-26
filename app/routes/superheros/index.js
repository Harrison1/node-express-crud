const express = require('express');
const Superhero = require('../../models/superhero');
const router = express.Router();

router.use((req, res, next) => {
	console.log('something is happening');
	next();
});

router.get('/', (req, res) => {
	res.render('login');
});

router.route('/all').get(isAuthenticated, (req, res) => {

	Superhero.find((err, data) => {
		res.render('superheros/all', {superheros: data});
	})
	.catch(function(err) {
		console.log(err);
	});

});

router.route('/superheros').post(isAuthenticated, (req, res) => {
	const superhero = new Superhero(req.body);
	superhero.url = req.body.name.toLowerCase();

	superhero.save((err) => {
		(err) ? res.send(err) : res.redirect('/all');
	});
}).get(isAuthenticated, (req, res) => {
	Superhero.find((err, superheros) => {
		(err) ? res.send(err) : res.json(superheros);
	});
});

router.route('/superheros/:url').get(isAuthenticated, (req, res) => {
	const query = {"url": req.params.url.toLowerCase()};
	Superhero.findOne(query, (err, data) => {
		// (err) ? res.send(err) : res.render('./app/views/profile', {superhero: data});

		//hbs
		(err) ? res.send(err) : res.render('superheros/profile', {superhero: data});
	});	
}).post(isAuthenticated, (req, res) => {
	const query = {"url": req.params.url.toLowerCase()};
	const superhero = req.body;
	superhero.url = req.body.name.toLowerCase();
	Superhero.findOneAndUpdate(query, superhero, { new: true }, function (err, superhero) {
	  if (err) {return res.send(err)};
	  res.redirect('/superheros/' + superhero.url);
	});
});

router.route('/superheros/:url/edit').get(isAuthenticated, (req, res) => {
	const query = {"url": req.params.url.toLowerCase()};
	Superhero.findOne(query, (err, data) => {
		// (err) ? res.send(err) : res.render('./app/views/edit.html', {superhero: data});

		// hbs
		(err) ? res.send(err) : res.render('superheros/edit', {superhero: data});
	});	
});

router.route('/superheros/:url/delete').get(isAuthenticated, (req, res) => {
	const query = {"url": req.params.url.toLowerCase()};
	Superhero.findOneAndRemove(query, (err, data) => {
		(err) ? res.send(err) : res.redirect('/all');
	});	
});

function isAuthenticated(req, res, next) {
	console.log('is auth firing');
	req.isAuthenticated() ? next() : res.redirect('login');
}

module.exports = router;
