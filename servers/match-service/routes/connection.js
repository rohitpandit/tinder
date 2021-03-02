const express = require('express');
const router = express.Router();
const axios = require('axios');
const Connection = require('../models/Connection');

//Route for getting the connections(matches) data
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		if (!id) {
			res.status(400).json({ error: 'Invalid url' });
		}
		const conn = await Connection.find({ user1: id });
		if (!conn) {
			res.status(200).json({ users: [] });
			return;
		}

		console.log(conn);

		const users = [];

		for (let i = 0; i < conn.length; i++) {
			const result = await axios.get(
				`https://tinder-profile-service.herokuapp.com/singleUser/${conn[i].user2}`
			);
			users.push(result.data);
		}

		console.log(users);

		res.status(200).json({ users: users });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
