const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
const axios = require('axios');

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({
				error: 'Enter email and password',
			});
			return;
		}

		const user = await Auth.findOne({ email });
		if (!user) {
			res.status(400).json({
				error: 'Email or password is incorrect',
			});
			return;
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			res.status(400).json({
				error: 'Email or password is incorrect',
			});
			return;
		}

		const token = jwt.sign({ id: user._id }, 'test');
		res.status(200).json({
			token,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({
				error: 'Enter email and password',
			});
			return;
		}

		const existUser = await Auth.findOne({ email });
		if (existUser !== null) {
			res.status(400).json({
				error: 'Email already exists',
			});
			return;
		}

		const newPassword = await bcrypt.hash(password, 10);

		const newUser = new Auth({
			email,
			password: newPassword,
		});

		await newUser.save();

		//creating an empty value for the user in profile service
		const userProfile = await axios.put(
			`http://localhost:5001/user/${newUser._id}`
		);

		const token = jwt.sign({ id: newUser._id }, 'test');

		res.status(201).json({ user: newUser, token });
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
});

module.exports = router;
