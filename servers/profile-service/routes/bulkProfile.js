const express = require('express');
const co = require('co');
const User = require('../models/User');
const router = express.Router();
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');
const util = require('util');

//imposing async/await behaviour in our fs module
const fs_readdir = util.promisify(fs.readdir);
const fs_writeFile = util.promisify(fs.writeFile);
const fs_mkdir = util.promisify(fs.mkdir);
const fs_readFile = util.promisify(fs.readFile);
const fs_unlink = util.promisify(fs.unlink);
const fs_rename = util.promisify(fs.rename);

router.get('/', async (req, res) => {
	try {
		//sending just one user at a time
		const users = await User.find({ gender: 'female' }).skip(1).limit(1);
		if (users[0] === null) {
			res.status(200).json({ error: 'No more Profiles available' });
			return;
		}

		console.log(users[0]);

		let photos = [];
		for (let i = 0; i < users[0].photosUrl.length; i++) {
			const photo = await fs_readFile(users[0].photosUrl[i]);

			photos.push(photo);
		}
		res.status(200).json({ user: users[0], photos });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
