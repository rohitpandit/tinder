const express = require('express');
const router = express.Router();
const axios = require('axios');
const Connection = require('../models/Connection');

//Route for getting the connections(matches) data
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
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
		// conn.map(async (personId) => {
		// 	const {
		// 		data: { user },
		// 	} = await axios.get(`http://localhost:5001/singleUser/${id}`);
		// 	users.push(user);
		// 	return;
		// });

		for (let i = 0; i < conn.length; i++) {
			const result = await axios.get(
				`http://localhost:5001/singleUser/${conn[i].user1}`
			);
			console.log(conn[i].user1);
			console.log(result.data[i]);
		}

		console.log(users);

		res.send(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
