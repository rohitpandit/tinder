const express = require('express');
const Match = require('../models/Match');
const Connection = require('../models/Connection');
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

		const isMatch = await Match.find({ user: personId, likedUser: id });

		if (isMatch) {
			const newConnection = new Connection({
				user1: id,
				user2: personId,
			});

			const newConnectionSame = new Connection({
				user1: personId,
				user2: id,
			});

			await newConnection.save();
			await newConnectionSame.save();
			res.send(200).json({ msg: 'You have a new match' });
			return;
		}

		res.status(201).json({ msg: 'saved to the match service' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
