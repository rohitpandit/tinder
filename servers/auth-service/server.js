const express = require('express');
const morgan = require('morgan');
const auth = require('./routes/auth');
const db = require('./db');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', auth);

app.listen(port, () => {
	console.log(`auth live at port: ${port}`);
});
