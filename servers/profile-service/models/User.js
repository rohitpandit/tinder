const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	age: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	zipcode: {
		type: Number,
	},
	country: {
		type: String,
	},
	photos: [{ type: String }],
});

module.exports = mongoose.model('User', userSchema);
