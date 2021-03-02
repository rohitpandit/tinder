const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const matchRouter = require('./routes/match');
const connectionRoute = require('./routes/connection');

const db = require('./db');

const port = process.env.PORT || 5003;
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).json({ msg: 'hello' });
});

app.use('/match', matchRouter);
app.use('/connection', connectionRoute);

app.listen(port, () => {
	console.log(`Match service live at port: ${port}`);
});
