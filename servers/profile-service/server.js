const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoute = require('./routes/user');
const bulkRouter = require('./routes/bulkProfile');
const singleUser = require('./routes/singleUser');

const app = express();
const port = process.env.PORT || 5001;

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
	res.status(200);
	res.json({
		msg: 'hello',
	});
});

app.use('/user', userRoute);
app.use('/bulkProfile', bulkRouter);
app.use('/singleUser', singleUser);

app.listen(port, console.log(`profile server listening at port: ${port}`));
