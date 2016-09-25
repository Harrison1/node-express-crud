const mongoose = require('mongoose');
mongoose.connect('YOUR MONGO DB URI');

const Superhero = require('./app/models/superhero');

const express = require('express');
const app = express();
const swigEngine = require('swig');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const swig = new swigEngine.Swig();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

const port = process.env.PORT || 8000;

const router = express.Router();

router.use((req, res, next) => {
	console.log('something is happening');
	next();
});

router.get('/', (req, res) => {
	Superhero.find((err, data) => {
		swig.invalidateCache();
		(err) ? res.send(err) : res.render('index.html', {superheros: data});
	})
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
});


app.use('/', router);

app.listen(port);
console.log('We make stuff happen on port ' + port);