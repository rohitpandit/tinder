const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const result = await axios.get('http://localhost:5001/bulkProfile');
		res.send(result.data);
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
