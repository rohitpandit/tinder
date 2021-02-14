const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({ msg: 'router setup' });
});

router.post('/:id', async (req, res) => {
	res.status(200).json({ msg: 'done' });
});

module.exports = router;
