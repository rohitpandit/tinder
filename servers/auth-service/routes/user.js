const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();

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
			if (decoded) {
				console.log(decoded.id);
			}
			console.log('in the get user ');
			const result = await axios.get(
				`http://localhost:5001/user/${decoded.id}`,
				{
					headers: { 'content-type': 'application/json' },
				}
			);
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
			//verify token
			const decoded = jwt.verify(
				req.headers.authorization.split(' ')[1],
				'test'
			);
			if (decoded) {
				console.log(decoded.id);
			}

			const result = await axios.post(
				`http://localhost:5001/user/${decoded.id}`,
				{
					firstName,
					lastName,
					dob,
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

			//verify token
			const decoded = jwt.verify(
				req.headers.authorization.split(' ')[1],
				'test'
			);
			if (decoded) {
				console.log(decoded.id);
			}

			const result = await axios.put(
				`http://localhost:5001/user/${decoded.id}`,
				{
					firstName,
					lastName,
					dob,
					city,
					state,
					zipcode,
					country,
					userId,
				}
			);
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
			//verify token
			const decoded = jwt.verify(
				req.headers.authorization.split(' ')[1],
				'test'
			);
			if (decoded) {
				console.log(decoded.id);
			}

			const result = await axios.delete(
				`http://localhost:5001/user/${decoded.id}`
			);

			//TODO implement delete
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	});

module.exports = router;
