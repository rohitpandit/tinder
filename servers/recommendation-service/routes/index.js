const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({ msg: 'hello' });
});

//router to get only the data
router.get('/user/:skip/:gender', async (req, res) => {
	try {
		const { skip, gender } = req.params;
		const result = await axios.get(
			`http://localhost:5001/bulkProfile/user/${skip}/${gender}`
		);

		res.status(200).json({ user: result.data.user });
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

router.get('/photo/:photoNum/:skip/:gender', async (req, res) => {
	try {
		console.log('sdl');
		const { photoNum, skip, gender } = req.params;
		if (photoNum > 4) {
			res.send(400).json({ error: 'Invalid query' });
			return;
		}
		const result = await axios.get(
			`http://localhost:5001/bulkProfile/photo/${photoNum}/${skip}/${gender}`
		);

		res.status(200).json({ photo: result.data });
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
