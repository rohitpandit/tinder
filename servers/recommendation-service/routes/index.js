const express = require('express');
const axios = require('axios');
const router = express.Router();

//router to get only the data
router.get('/user', async (req, res) => {
	try {
		const result = await axios.get(`http://localhost:5001/bulkProfile/`);

		console.log(result.data);
		res.send(result.data);
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

router.get('/photo/:photoNum', async (req, res) => {
	try {
		console.log('sdl');
		const { photoNum } = req.params;
		if (photoNum > 4) {
			res.send(400).json({ error: 'Invalid query' });
			return;
		}
		const result = await axios.get(
			`http://localhost:5001/bulkProfile/photo/${photoNum}`
		);

		res.status(200).json({ photo: result.data });
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
