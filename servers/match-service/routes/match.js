const express = require('express');
const Match = require('../models/Match');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(500).json({ msg: 'router setup' });
});

router.post('/:id', async (req, res) => {
	try {
		const { personId } = req.body;
		if (!personId) {
			res.status(400).json({ error: 'personId missing' });
			return;
		}

		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: 'userId missing' });
			return;
		}

		const newMatch = new Match({
			user: id,
			likedUser: personId,
		});

		await newMatch.save();

		res.status(201).json({ msg: 'saved to the match service' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
