const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connect', (socket) => {
	console.log('hi');
	io.emit('hello', 'world');
});

// io.on('');

const port = 5004;

http.listen(port, () => {
	console.log(`chat server listening at port: ${port}`);
});
