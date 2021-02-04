const express = require('express');
const User = require('../models/User');

const router = express.Router();

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id });
			res.json({ user: user });
		} catch (err) {
			console.log(err.message);

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
				_id: userId,
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
			console.log(err.message);

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

			const { id } = req.params;

			const user = await User.findOne({ _id: id });
			if (user) {
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
				res.status(200).json({ user: user });
			} else {
				const newUser = new User({
					firstName,
					lastName,
					dob,
					city,
					state,
					country,
					zipcode,
				});
				await newUser.save();
				res.status(200).json({ user: newUser });
			}
		} catch (err) {
			console.log(err.message);

			res.status(500).json({
				msg: err.message,
			});
		}
	})
	.delete(async (req, res) => {
		try {
			const { id } = req.params;

			await User.deleteOne({ _id: id });
			res.status(200).json({
				msg: 'Deleted successfully',
			});
		} catch (error) {
			console.log(error.message);
			res.status(500).json({
				msg: err.message,
			});
		}
	});

module.exports = router;
