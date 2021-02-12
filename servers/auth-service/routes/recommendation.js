const { default: axios } = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/user', async (req, res) => {
	try {
		//verify token
		const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'test');
		if (decoded === null) {
			res.status(401).json({ msg: 'User is not authorized' });
			return;
		}

		const result = await axios.get('http://localhost:5001/user');

		res.status(200).json({ user: result.data });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/photo/:photoNum', async (req, res) => {
	try {
		const { photoNum } = req.params;
		if (photoNum > 4) {
			res.status(400).json({ error: 'Invalid request' });
			return;
		}

		//verify token
		const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'test');
		if (decoded === null) {
			res.status(401).json({ msg: 'User is not authorized' });
			return;
		}

		const result = await axios.get(`http://localhost:5001/photo/${photoNum}`);

		res.status(200).json({ photo: result.data });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
