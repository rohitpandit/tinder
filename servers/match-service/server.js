const express = require('express');
const app = express();
const matchRouter = require('./routes/match');
const db = require('./db');

const port = 5003;

app.get('/', (req, res) => {
	res.status(200).json({ msg: 'hi' });
});

app.use('/match', matchRouter);

app.listen(port, () => {
	console.log(`Match service live at port: ${port}`);
});
