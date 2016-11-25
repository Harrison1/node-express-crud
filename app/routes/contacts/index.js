const express = require('express');
const User = require('../../models/user');
const router = express.Router();

router.route('/contacts').get(isAuthenticated, (req, res) => {

	req.user.contacts.sort(function(a, b){
	    if(a.name < b.name) return -1;
	    if(a.name > b.name) return 1;
	    return 0;
	});

	res.render('contacts/contacts', {user: req.user});
}).post(isAuthenticated, (req, res) => {
	const query = req.user._id;
	const contact = req.body;

	User.findByIdAndUpdate(query, {$push: { contacts: contact }}, { new: true }, function (err, contact) {
		if (err) {return res.send(err)};
	  	res.redirect('/contacts');
	});
});

router.route('/contacts/:id/update').post(isAuthenticated, (req, res) => {
	const contact = req.body;
	const id = req.params.id;

	User.update({ 'contacts._id': id }, {$set: {'contacts.$.name': contact.name, 'contacts.$.number': contact.number, 'contacts.$.email': contact.email, 'contacts.$.address': contact.address}}, { new: false }, function (err, contact) {
		if (err) {return res.send(err)};
	  	res.redirect('/contacts');
	});

});

router.route('/contacts/:id/delete').get(isAuthenticated, (req, res) => {
	console.log("i am here");
	const id = req.params.id;

	User.update({ 'contacts._id': id }, {$pull: {'contacts': { _id : id }}}, { new: false }, function (err, contact) {
		if (err) {return res.send(err)};
	  	res.redirect('/contacts');
	});
});

function isAuthenticated(req, res, next) {
	console.log('is auth firing');
	req.isAuthenticated() ? next() : res.redirect('login');
}

module.exports = router;
