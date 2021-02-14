const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(500).json({ msg: 'router setup' });
});

router.post('/:id', async (req, res) => {
	try {
		console.log(req.body);
		res.send('ol');
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
