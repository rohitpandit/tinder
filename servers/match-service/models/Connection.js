const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
	user1: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	user2: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model('Connection', connectionSchema);
