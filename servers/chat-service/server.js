const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

let users = {};

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('private message', (user) => {
		// console.log(msg);
		io.emit('message', user);
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
