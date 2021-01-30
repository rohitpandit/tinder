const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const auth = require('./routes/auth');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', auth);

app.listen(port, () => {
	console.log(`auth live at port: ${port}`);
});
