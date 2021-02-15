const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const matchRouter = require('./routes/match');

const db = require('./db');

const port = 5003;
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).json({ msg: 'hi' });
});

app.use('/match', matchRouter);

app.listen(port, () => {
	console.log(`Match service live at port: ${port}`);
});
