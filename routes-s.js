const express = require('express');
const Superhero = require('./app/models/superhero');
// const mongoose = require('mongoose');
const router = express.Router();
const swigEngine = require('swig');
const swig = new swigEngine.Swig();

router.use((req, res, next) => {
	console.log('something is happening');
	next();
});

router.get('/', (req, res) => {
	Superhero.find((err, data) => {
		swig.invalidateCache();
		(err) ? res.send(err) : res.render('index.html', {superheros: data});
	});
});

router.route('/superheros').post((req, res) => {
	const superhero = new Superhero(req.body);
	superhero.url = req.body.name.toLowerCase();

	superhero.save((err) => {
		(err) ? res.send(err) : res.redirect('/');
	});
}).get((req, res) => {
	Superhero.find((err, superheros) => {
		(err) ? res.send(err) : res.json(superheros);
	});
});

router.route('/superheros/:url').get((req, res) => {
	const query = {"url": req.params.url.toLowerCase()};
	Superhero.findOne(query, (err, data) => {
		(err) ? res.send(err) : res.render('./app/views/profile.html', {superhero: data});
	});	
}).post((req, res) => {
	const query = {"url": req.params.url.toLowerCase()};
	const superhero = req.body;
	superhero.url = req.body.name.toLowerCase();
	Superhero.findOneAndUpdate(query, superhero, { new: true }, function (err, superhero) {
	  if (err) {return res.send(err)};
	  // res.send(superhero);
	  // superhero.url = req.body.name.toLowerCase();
	  res.redirect('/superheros/' + superhero.url);
	});
	// Superhero.update({url: req.params.url.toLowerCase()}, req.body, function(err, superhero){

	// 	superhero.url = req.body.name.toLowerCase();

	// 	res.redirect('/superheros/' + superhero.url);
	// })
	// const query = {"url": req.params.url.toLowerCase()};
	// 	Superhero.findOne(query, (err, superhero) => {
	// 	if (err) {
	// 		res.send(err);
	// 	}

	// 	superhero.power = req.body.power;
		
	// 	superhero.save((err) => {
	// 		if (err) {
	// 			console.log("update error");
	// 			res.send(err)
	// 		}

	// 		console.log("update sucess");
	// 		res.redirect('/superheros/' + superhero.url);
	// 	});
	// });	
});

router.route('/superheros/:url/edit').get((req, res) => {
	swig.invalidateCache();
	const query = {"url": req.params.url.toLowerCase()};
	Superhero.findOne(query, (err, data) => {
		(err) ? res.send(err) : res.render('./app/views/edit.html', {superhero: data});
	});	
});

router.route('/superheros/:url/delete').get((req, res) => {
	const query = {"url": req.params.url.toLowerCase()};
	Superhero.findOneAndRemove(query, (err, data) => {
		(err) ? res.send(err) : res.redirect('/');
	});	
});

module.exports = router;
