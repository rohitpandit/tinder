const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		res.send('hi');
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
