const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Auth = require('../models/Auth');
const { pass, user } = require('../db');

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({
				msg: 'Enter email and password',
			});
			return;
		}

		const user = await Auth.findOne({ email });
		if (!user) {
			res.status(400).json({
				msg: 'Email or password is incorrect',
			});
			return;
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			res.status(400).json({
				msg: 'Email or password is incorrect',
			});
			return;
		}

		res.status(200).json({
			msg: 'successful login',
		});
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
});

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({
				msg: 'Enter email and password',
			});
			return;
		}

		const newPassword = await bcrypt.hash(password, 10);

		const newUser = new Auth({
			email,
			password: newPassword,
		});

		await newUser.save();

		res.status(201).json({ user: newUser });
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		});
	}
});

module.exports = router;
