const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
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
		interestedGender: {
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
