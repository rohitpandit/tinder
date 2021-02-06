const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');
const User = require('../models/User');
const multer = require('multer');

//imposing async/await behaviour in our fs module
const fs_readdir = util.promisify(fs.readdir);
const fs_writeFile = util.promisify(fs.writeFile);
const fs_mkdir = util.promisify(fs.mkdir);
const fs_readFile = util.promisify(fs.readFile);

const upload = multer({
	dest: `./upload`,
});

const router = express.Router();

router
	.route('/:id')
	.get(async (req, res) => {
		const { id } = req.params.id;
		try {
			const { id } = req.params;
			const user = await User.findOne({ _id: id });
			console.log(user);

			const photos = [];
			for (let i = 0; i < user.photosUrl.length; i++) {
				const temp = await fs_readFile(user.photosUrl[i]);
				photos.unshift(temp);
			}

			console.log(user.photosUrl.length);
			console.log(photos);

			res.json({ user: user, photos: photos });
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
	try {
		const { id } = req.params;
		const user = User.findOne({ _id: id });

		//if the folder already exist for a particular user otherwise create a folder first
		if (fs.existsSync(`./upload/${id}`)) {
			const files = await fs_readdir(`./upload/${id}`);
			const count = files.length;

			await fs_writeFile(
				`./upload/${id}/${count}.jpeg`,
				Buffer.from(req.body.newAvtar.buffer.data)
			);

			const user = await User.findById({ _id: id });
			if (user.photosUrl.length === 0) {
				user.photosUrl.push(`./upload/${id}/${count}.jpeg`);
				console.log(user.photosUrl[0]);
			} else {
				const photoUrl = [...user.photosUrl];
				photoUrl.push(`./upload/${id}/${count}.jpeg`);
				user.photosUrl = photoUrl;
				console.log(user.photosUrl);
			}
			await user.save();
		} else {
			const dir = await fs_mkdir(`./upload/${req.params.id}`);

			const count = 0;

			fs_writeFile(
				`./upload/${req.params.id}/${count}.jpeg`,
				Buffer.from(req.body.newAvtar.buffer.data)
			);

			const user = await User.findById({ _id: id });
			if (user.photosUrl.length === 0) {
				user.photosUrl.push(`./upload/${id}/${count}.jpeg`);
				console.log(user.photosUrl[0]);
			} else {
				const photoUrl = [...user.photosUrl];
				photoUrl.push(`./upload/${id}/${count}.jpeg`);
				user.photosUrl = photoUrl;
				console.log(user.photosUrl);
			}
			await user.save();
		}

		res.send('photo update');
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: error.stack,
		});
	}
});

module.exports = router;
