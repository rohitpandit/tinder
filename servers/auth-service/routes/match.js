const axios = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		//verify token
		const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'test');
		if (decoded === null) {
			res.status(401).json({ msg: 'User is not authorized' });
			return;
		}

		const { personId } = req.body;
		console.log(personId);
		// console.log(decoded.id);

		console.log('auth match');

		await axios({
			method: 'post',
			url: `http://localhost:5003/match/${decoded.id}`,
			data: {
				personId: personId,
			},
		});

		res.status(200).json({ msg: 'done' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//route to get all the data of the users conneciton
router.get('/connection', async (req, res) => {
	try {
		//verify token
		const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'test');
		if (decoded === null) {
			res.status(401).json({ error: 'User is not authorized' });
			return;
		}

		console.log('hi');
		const result = await axios.get(
			`http://localhost:5003/connection/${decoded.id}`
		);
		console.log(result.data);
		res.status(200).json({ connection: result.data });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
