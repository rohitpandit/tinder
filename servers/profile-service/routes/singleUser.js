const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		if (!id) {
			res.status(400).json({ error: 'invalid url' });
			return;
		}
		const user = await User.findById({ _id: id });
		if (!user) {
			res.status(200).json({ user: [] });
			return;
		}
		let userInfo = {
			firstName: user.firstName,
			lastName: user.lastName,
			dob: user.dob,
			id: user._id,
		};
		console.log(userInfo);

		res.status(200).json({ user: userInfo });
		return;
	} catch (error) {
		res.status(500).json({ error: error.message });
		return;
	}
});

module.exports = router;
