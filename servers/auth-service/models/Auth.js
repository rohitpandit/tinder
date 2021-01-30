const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

exports.module = mongoose.model('Auth', authSchema);
