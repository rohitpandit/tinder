const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	cors: 'https://mystifying-gates-ddf54b.netlify.app',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).json({ msg: 'hello' });
});

io.use((socket, next) => {
	if (socket.handshake.query && socket.handshake.query.id) {
		jwt.verify(socket.handshake.query.id, 'test', (err, payload) => {
			if (err) {
				return next(new Error('Authentication Error'));
			}
			socket.id = payload.id;
			next();
		});
	}
});

io.on('connection', (socket) => {
	console.log(socket.id);
	socket.join(socket.id);
	socket.on('send-message', ({ recipient, message }) => {
		console.log(message);
		console.log(recipient);
		socket.broadcast
			.to(recipient)
			.emit('recieve-message', { sender: socket.id, message });
	});

	socket.on('disconnect', () => {
		console.log('disconnected');
	});
});

io.removeAllListeners('msg');

const port = process.env.PORT || 5004;

http.listen(port, () => {
	console.log(`chat server listening at port: ${port}`);
});
