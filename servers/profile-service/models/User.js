import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	zipCode: {
		type: Number,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	photos: [{ type: String }],
});

module.exports = mongoose.model('User', userSchema);
