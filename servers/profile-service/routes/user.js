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

			const newuser = new User({
				firstName,
				lastName,
				dob,
				city,
				state,
				zipcode,
				country,
			});
			console.log('adding');

			await newuser.save();
			console.log('added');

			res.status(201).json({ user: newuser });
		} catch (err) {
			res.status(500).json({
				msg: err.message,
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
			} = req.body;

			console.log(req.body.userId);

			const user = await User.findOne({ _id: req.body.userId });
			if (firstName) {
				user.firstName = firstName;
			}
			if (lastName) {
				user.lastName = lastName;
			}
			if (dob) {
				user.dob = dob;
			}
			if (city) {
				user.city = city;
			}
			if (state) {
				user.state = state;
			}
			if (country) {
				user.country = country;
			}
			if (zipcode) {
				user.zipcode = zipcode;
			}

			console.log('adding');

			await user.save();
			console.log('added');

			res.status(200).json({ user });
		} catch (err) {
			res.status(500).json({
				msg: err.message,
			});
		}
	})
	.delete(async (req, res) => {
		try {
			const { userId } = req.body;

			if (!userId) {
				res.status(400).json({
					msg: 'UserId is missing',
				});
				return;
			}

			await User.deleteOne({ _id: userId });
			res.status(200).json({
				msg: 'Deleted successfully',
			});
		} catch (error) {
			res.status(500).json({
				msg: err.message,
			});
		}
	});

module.exports = router;
