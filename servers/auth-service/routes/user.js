const express = require('express');
const axios = require('axios');
const router = express.Router();

router
	.route('/')
	.get(async (req, res) => {
		try {
			const { userId } = req.body;
			console.log(userId);
			console.log('in the get user ');
			const result = await axios.get(`http://localhost:3001/user/:userId`, {
				header: { 'content-type': 'application/json' },
			});
			console.log(result.data.user);
			res.status(200).json({ user: result.data.user });
			return;
		} catch (error) {
			res.status(500).json({
				msg: error.message,
			});
		}
	})
	.post(async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				dob,
				city,
				state,
				zipcode,
				country,
			} = req.body;
			if (
				!firstName ||
				!lastName ||
				!dob ||
				!city ||
				!state ||
				!zipcode ||
				!country
			) {
				console.log('Enter all the details');
				res.status(400).json({
					msg: 'Enter all the details',
				});
				return;
			}

			const result = await axios.post(`http://localhost:3001/user/`, {
				firstName,
				lastName,
				dob,
				city,
				state,
				zipcode,
				country,
			});
			console.log(result.data.user);
			res.status(200).json({ user: result.data.user });
			return;
		} catch (error) {
			res.status(500).json({
				msg: error.message,
			});
		}
	})
	.put(async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				dob,
				city,
				state,
				zipcode,
				country,
				userId,
			} = req.body;

			const result = await axios.put(`http://localhost:3001/user/`, {
				firstName,
				lastName,
				dob,
				city,
				state,
				zipcode,
				country,
				userId,
			});
			console.log(result.data.user);
			res.status(200).json({ user: result.data.user });
			return;
		} catch (error) {
			res.status(500).json({
				msg: error.message,
			});
		}
	})
	.delete(async (req, res) => {
		try {
			const { userId } = req.body;
			if (!userId) {
				res.status(400).json({
					msg: 'userId missing',
				});
				return;
			}

			const result = await axios.delete(`http://localhost:3001/user/`);

			//TODO implement delete
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	});

module.exports = router;
