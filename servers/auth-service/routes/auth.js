const express = require('express');
const router = express.Router();
const Auth = require('../models/Auth');

router.get('/', (req, res) => {
	res.json({ msg: 'hi' });
});

module.exports = router;
