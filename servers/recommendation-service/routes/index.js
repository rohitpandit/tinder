const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
	try {
		const result = await User.find();
		console.log(result.data);
		res.status(200).json({ data: result.data });
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
