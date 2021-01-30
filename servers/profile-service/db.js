const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://rohit123:rohit123@cluster0.re02x.mongodb.net/Tinder?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;
db.on('error', () => {
	console.log('error in connection');
});
db.once('open', () => {
	console.log('db is live', db.host);
});

module.exports = db;
