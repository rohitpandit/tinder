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
			const result = await axios.get('http://localhost:3001/user/', {
				header: { 'content-type': 'application/json' },
				data: {
					userId,
				},
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
			console.log({
				firstName,
				lastName,
				dob,
				city,
				state,
				zipcode,
				country,
			});
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

			const result = await axios.post('http://localhost:3001/user/', {
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
	});

module.exports = router;