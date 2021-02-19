const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', (socket) => {
	console.log('hi');
});

const port = 5004;

http.listen(port, () => {
	console.log(`chat server listening at port: ${port}`);
});
