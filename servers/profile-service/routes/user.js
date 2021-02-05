const express = require('express');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const multer = require('multer');

const upload = multer({
	dest: `./upload`,
});

const router = express.Router();

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.id });
			console.log(user);
			user.photos = [];
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
				_id: req.params.id,
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
				photos,
			} = req.body;

			const { id } = req.params;
			console.log(req);

			const user = await User.findOne({ _id: id });
			if (user) {
				console.log('in the if');
				user.firstName = firstName;
				user.lastName = lastName;
				user.dob = dob;
				user.city = city;
				user.state = state;
				user.country = country;
				user.zipcode = zipcode;

				console.log('adding');

				await user.save();
				console.log('added');
				res.status(200).json({ user: user });
			} else {
				console.log('in the else');
				const newUser = new User({
					_id: id,
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

//router for uploading photo
router.put('/photos/:id', async (req, res) => {
	const dir = `./upload/${req.params.id}/`;

	console.log(req.body);

	if (fs.existsSync(`./upload/${req.params.id}`)) {
		fs.readdir(`./upload/${req.params.id}`, (err, files) => {
			if (err) {
				console.log(err);
			}
			const count = files.length;

			fs.writeFile(
				`./upload/${req.params.id}/${count}.jpeg`,
				Buffer.from(req.body.newAvtar.buffer.data),
				(err) => {
					if (err) {
						console.log(err);
					}
				}
			);
		});
	} else {
		fs.mkdir(`./upload/${req.params.id}`, (err) => {
			if (err) {
				console.log(err);
			}
		});
	}

	res.send('photo update');
});

module.exports = router;
