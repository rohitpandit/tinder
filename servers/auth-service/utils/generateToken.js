const jwt = require('jsonwebtoken');

const generateToken = async (data) => {
	return jwt.sign(
		{
			_id: data,
		},
		'test',
		{ expiresIn: '1d' }
	);
};

module.exports = generateToken;
