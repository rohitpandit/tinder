const express = require('express');
const app = express();

const port = 5003;

app.get('/', (req, res) => {
	res.status(200).json({ msg: 'hi' });
});

app.listen(port, () => {
	console.log(`Match service live at port: ${port}`);
});
