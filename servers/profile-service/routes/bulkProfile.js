const express = require('express');
const co = require('co');
const User = require('../models/User');
const router = express.Router();
const fs = require('fs');
const util = require('util');

//promisify the fs functions
const fs_readFile = util.promisify(fs.readFile);

//route just to send the user info
router.get('/user/:skip/:gender', async (req, res) => {
	try {
		let { skip, gender } = req.params;
		//sending just one user at a time
		// const users = await User.find({ gender: 'female' })
		console.log(gender);
		let users;
		if (gender === 'all') {
			users = await User.find().skip(Number.parseInt(skip)).limit(1);
		} else {
			users = await User.find({ gender }).skip(Number.parseInt(skip)).limit(1);
		}

		if (users[0] === null) {
			res.status(200).json({ error: 'No more Profiles available' });
			return;
		}

		console.log(users[0]);

		//only data relevent for the recommendation service
		const user = {
			_id: users[0]._id,
			firstName: users[0].firstName,
			lastName: users[0].lastName,
			dob: users[0].dob,
			photosLength: users[0].photosUrl.length,
		};
		res.status(200).json({ user: user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//random comment
//route to send the photo of user
router.get('/photo/:photoNum/:skip/:gender', async (req, res) => {
	try {
		const { photoNum, skip, gender } = req.params;
		if (photoNum > 4 || photoNum < 0) {
			res.status(400).json({ error: 'Invalid url' });
			return;
		}

		console.log(gender);

		//sending just one user at a time
		// const users = await User.find({ gender: 'female' })
		let users;
		if (gender === 'all') {
			users = await User.find().skip(Number.parseInt(skip)).limit(1);
		} else {
			users = await User.find({ gender }).skip(Number.parseInt(skip)).limit(1);
		}
		if (users[0] === null) {
			res.status(200).json({ error: 'No more Profiles available' });
			return;
		}

		// fs.createReadStream(users[0].photosUrl[photoNum]).pipe(res);
		const photo = await fs_readFile(users[0].photosUrl[photoNum]);
		res.status(200).json({ photo });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
