const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('msg', (message) => {
		console.log(message);
		io.emit('msg', message);
	});

	socket.on('disconnect', () => {
		console.log('disconnected');
	});
});

io.removeAllListeners('msg');

const port = 5004;

http.listen(port, () => {
	console.log(`chat server listening at port: ${port}`);
});
