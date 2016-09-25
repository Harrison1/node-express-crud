const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuperheroSchema = new Schema({
	name: String,
	power: String,
	email: String,
	phone: String,
	url: String
});

module.exports = mongoose.model('Superhero', SuperheroSchema);