const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
	},
	likedUser: {
		type: mongoose.Types.ObjectId,
	},
});

module.exports = mongoose.model('Match', matchSchema);
