const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const router = express.Router();

const upload = multer();

router
	.route('/')
	.get(async (req, res) => {
		try {
			console.log(req.headers.authorization.split(' ')[1]);
			//verify token
			const decoded = jwt.verify(
				req.headers.authorization.split(' ')[1],
				'test'
			);
			if (decoded === null) {
				res.status(401).json({ msg: 'User is not authorized' });
				return;
			}
			console.log('in the get user ');
			const result = await axios.get(
				`http://localhost:5001/user/${decoded.id}`,
				{
					headers: { 'content-type': 'application/json' },
				}
			);
			console.log(typeof result.data.photos);
			res
				.status(200)
				.json({ user: result.data.user, photos: result.data.photos });
			return;
		} catch (error) {
			res.status(500).json({
				error: error.message,
			});
		}
	})
	.post(async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				dob,
				gender,
				city,
				state,
				zipcode,
				country,
			} = req.body;
			if (
				!firstName ||
				!lastName ||
				!dob ||
				!gender ||
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
			//verify token
			const decoded = jwt.verify(
				req.headers.authorization.split(' ')[1],
				'test'
			);
			if (decoded === null) {
				res.status(401).json({ msg: 'User is not authorized' });
				return;
			}
			const result = await axios.post(
				`http://localhost:5001/user/${decoded.id}`,
				{
					firstName,
					lastName,
					dob,
					gender,
					city,
					state,
					zipcode,
					country,
				}
			);
			console.log(result.data.user);
			res.status(200).json({ user: result.data.user });
			return;
		} catch (error) {
			res.status(500).json({
				error: error.message,
			});
		}
	})
	.put(async (req, res) => {
		try {
			const {
				firstName,
				lastName,
				dob,
				gender,
				city,
				state,
				zipcode,
				country,
			} = req.body;
			console.log(req);
			if (
				!firstName ||
				!lastName ||
				!dob ||
				!gender ||
				!city ||
				!state ||
				!zipcode ||
				!country
			) {
				console.log(
					firstName,
					lastName,
					dob,
					gender,
					city,
					state,
					country,
					zipcode
				);
				console.log('Enter all the details');
				res.status(400).json({
					msg: 'Enter all the details',
				});
				return;
			}

			console.log(req);

			//verify token
			const decoded = jwt.verify(
				req.headers.authorization.split(' ')[1],
				'test'
			);
			if (decoded === null) {
				res.status(401).json({ msg: 'User is not authorized' });
				return;
			}
			const result = await axios.put(
				`http://localhost:5001/user/${decoded.id}`,
				{
					firstName,
					lastName,
					dob,
					gender,
					city,
					state,
					zipcode,
					country,
				}
			);
			console.log(result.data.user);
			res.status(200).json({ user: result.data.user });
			return;
		} catch (error) {
			res.status(500).json({
				error: error.message,
			});
		}
	})
	.delete(async (req, res) => {
		try {
			//verify token
			const decoded = jwt.verify(
				req.headers.authorization.split(' ')[1],
				'test'
			);
			if (decoded === null) {
				res.status(401).json({ msg: 'User is not authorized' });
				return;
			}
			const result = await axios.delete(
				`http://localhost:5001/user/${decoded.id}`
			);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

//router for uploading a photo
router.put('/photos', upload.single('newAvtar'), async (req, res) => {
	try {
		//verify token
		const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'test');
		if (decoded === null) {
			res.status(401).json({ msg: 'User is not authorized' });
			return;
		}
		const buffer = req.file.buffer;
		console.log(req.file);

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		const form = {
			newAvtar: req.file,
		};

		const result = await axios.put(
			`http://localhost:5001/user/photos/${decoded.id}`,
			form
		);

		res.status(200).send('done');
	} catch (error) {
		res.status(500).json({ error: error.stack });
	}
});

//route for deleting a photo
router.delete('/photos/:count', async (req, res) => {
	try {
		//verify token
		const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'test');
		if (decoded === null) {
			res.status(401).json({ msg: 'User is not authorized' });
			return;
		}
		const { count } = req.params;
		const result = await axios.delete(
			`http://localhost:5001/user/photos/${decoded.id}/${count}`
		);
		console.log(result.data);
		console.log('in the auth service');
		res.status(200).json({ msg: 'delete successful' });
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ error: error.msg });
	}
});

module.exports = router;
