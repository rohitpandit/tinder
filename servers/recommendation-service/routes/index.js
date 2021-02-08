const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
	try {
		const result = await User.find().limit(5);
		console.log(result.data);
		res.status(200).json({ data: result.data });
	} catch (error) {
		console.log(err.stack);
		res.status(500).json({ msg: error.stack });
	}
});

module.exports = router;
