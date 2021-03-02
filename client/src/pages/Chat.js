import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { io } from 'socket.io-client';
// import moment from 'moment';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

let id = 0;
const recipient = window.location.pathname.split('/')[2];
console.log(recipient);

if (localStorage.getItem('token')) {
	id = localStorage.getItem('token');
}

const socket = io('http://localhost:5004', { query: { id } });

//chat storing locally to the localstore
let conversation = null;
if (!localStorage.getItem(`conversations[${recipient}]`)) {
	localStorage.setItem(`conversations[${recipient}]`, []);
	conversation = [];
} else {
	conversation = JSON.parse(
		localStorage.getItem(`conversations[${recipient}]`)
	);
}

const Chat = ({ setIsLogged, setTotalViewed }) => {
	const [chat, setChat] = useState(conversation);
	const [message, setMessage] = useState('');

	//function for settting the view into the last message
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	//function to store the message to the localstore
	//this function handles all the messages
	const addToChat = useCallback(
		({ sender, message }) => {
			console.log(sender);
			console.log('added to chat');

			setChat([...chat, { sender, message }]);

			localStorage.setItem(`conversations[${recipient}]`, JSON.stringify(chat));
			setMessage('');
		},
		[chat]
	);

	//function for handling the message sending form the user
	const onMessageSend = (sendTo, message) => {
		console.log(chat);
		socket.emit('send-message', { recipient: sendTo, message });
		addToChat({ sender: 'You', message });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (message.length > 0) {
			onMessageSend(recipient, message);
			setMessage('');
		}

		document.getElementById('message-input').focus();
	};

	useEffect(() => {
		if (socket == null) {
			return;
		}

		socket.on('recieve-message', addToChat);

		return () => socket.off('recieve-message');
	}, [addToChat]);

	return (
		<Fragment>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />
			<div className='container mb-5 mt-2'>
				<h1>Chat</h1>
				<hr />
				<div
					className='container p-2 my-2 d-flex flex-column  overflow-auto'
					style={chatContainer}>
					{chat &&
						chat.map((converse, index) => {
							const lastMessage = chat.length - 1;
							// console.log(conversation[lastMessage]);
							return (
								<div
									ref={lastMessage ? setRef : null}
									key={index}
									className={`d-flex flex-column rounded p-2 my-1 ${
										converse.sender === 'You'
											? 'align-self-end align-items-end'
											: 'align-self-start'
									}`}>
									{console.log(converse.message)}
									<div
										className={`border rounded p-1 ${
											converse.sender === 'You'
												? ' bg-success text-white'
												: 'bg-light'
										}`}>
										{converse.message}
									</div>
									<div className='small text-muted'>{converse.sender}</div>
								</div>
							);
						})}
				</div>

				<div className='container align-self-end '>
					<form className='d-flex' onSubmit={onSubmitHandler}>
						<input
							id='message-input'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className='form-control'
							type='text'
						/>
						<button type='submit' className='btn btn-success'>
							Send
						</button>
					</form>
				</div>
			</div>

			<Footer />
		</Fragment>
	);
};

const chatContainer = {
	height: '60vh',
};

// const messageContainer = {
// 	height: '75vh',
// 	overflow: 'scroll',
// };

export default Chat;
