const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const router = require('./routes/index');

const port = 5002;

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', router);

app.listen(port, () => {
	console.log(`Recommendation service listening at port: ${port}`);
});
