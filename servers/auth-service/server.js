const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const user = require('./routes/user');
const recommendation = require('./routes/recommendation');
const db = require('./db');

const app = express();
const port = 5000;

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/index', recommendation);
app.use('/auth', auth);
app.use('/user', user);

app.listen(port, () => {
	console.log(`auth live at port: ${port}`);
});
