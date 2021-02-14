const express = require('express');
const axios = require('axios');
const router = express.Router();

//router to get only the data
router.get('/user/:skip', async (req, res) => {
	try {
		const { skip } = req.params;
		const result = await axios.get(
			`http://localhost:5001/bulkProfile/user/${skip}`
		);

		res.status(200).json({ user: result.data.user });
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

router.get('/photo/:photoNum/:skip', async (req, res) => {
	try {
		console.log('sdl');
		const { photoNum, skip } = req.params;
		if (photoNum > 4) {
			res.send(400).json({ error: 'Invalid query' });
			return;
		}
		const result = await axios.get(
			`http://localhost:5001/bulkProfile/photo/${photoNum}/${skip}`
		);

		res.status(200).json({ photo: result.data });
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
