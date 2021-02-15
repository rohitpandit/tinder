const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	likedUser: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model('Match', matchSchema);
