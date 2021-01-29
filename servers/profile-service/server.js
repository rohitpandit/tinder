const express = require('express');
const morgan = require('morgan');
const db = require('./db');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.status(200);
	res.json({
		msg: 'hello',
	});
});

app.listen(port, console.log(`profile server listening at port: ${port}`));
