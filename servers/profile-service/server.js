const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoute = require('./routes/user');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200);
	res.json({
		msg: 'hello',
	});
});

app.use('/user', userRoute);

app.listen(port, console.log(`profile server listening at port: ${port}`));
