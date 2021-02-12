const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const result = await axios.get('http://localhost:5001/bulkProfile');
		console.log(result.data);
		res.send('ok');
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
