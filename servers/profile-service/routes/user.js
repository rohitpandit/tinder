const express = require('express');
const User = require('../models/User');

const router = express.Router();

router
	.route('/')
	.get(async (req, res) => {
		try {
			const { userId } = req.body;
			console.log(userId);
			if (!userId) {
				console.log('userId missing');
				res.status(400).json({
					msg: 'userId is missing',
				});
				return;
			}

			const user = await User.findOne({ _id: userId });
			res.json({ user: user });
		} catch (err) {
			res.status(500).json({
				msg: err.message,
			});
		}
	})
	.post(async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				age,
				city,
				state,
				zipcode,
				country,
			} = req.body;
			if (
				!firstName ||
				!lastName ||
				!age ||
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

			const newuser = new User({
				firstName,
				lastName,
				age,
				city,
				state,
				zipcode,
				country,
			});
			console.log('adding');

			await newuser.save();
			console.log('added');

			res.status(201).json({ newuser });
		} catch (err) {}
	});

module.exports = router;
