const express = require('express');
const router = express.Router();

//Route for getting the connections(matches)
router.get('/', async (req, res) => {
	res.send('hi');
});

module.exports = router;
