const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	name: String,
	number: String,
	address: String,
	email: String,
	img: String
});

const UserSchema = new Schema({
	username: String,
	password: String,
	role: {type: String, default: 'sub'},
	contacts: [contactSchema],
},{timestamps: true});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);