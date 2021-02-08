const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	dob: {
		type: Date,
	},
	gender: {
		type: String,
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
	photosUrl: [{ type: String }],
});

module.exports = mongoose.model('User', userSchema);
