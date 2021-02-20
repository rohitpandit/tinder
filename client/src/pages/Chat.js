import React, { useState } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const socket = io('http://localhost:5004', {
	userId: localStorage.token.split('.')[1],
});

const getUser = (sendTo, message) => {
	return {
		sendTo,
		message,
		date: moment().format('LT'),
	};
};

socket.on('message', (user) => {
	console.log('in the private message');

	const ul = document.getElementById('chat-ul');
	const item = document.createElement('li');
	const div = document.createElement('div');
	div.textContent = user.message;
	const p = document.createElement('p');
	p.innerText = user.date;
	div.appendChild(p);
	// item. = div;
	ul.appendChild(div);
});

const Chat = ({ setIsLogged, setTotalViewed }) => {
	const [message, setMessage] = useState('');

	//user id to send to
	// console.log(window.location.href.split('/')[4]);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (message.length > 0) {
			socket.emit(
				'private message',
				getUser(window.location.href.split('/')[4], message)
			);
			setMessage('');
		}

		document.getElementById('message-input').focus();
	};

	return (
		<div>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />
			<div className='container mb-5 mt-2'>
				<h1>Chat</h1>
				<hr />
				<div
					className='container p-2 mt-2 mb-5 d-flex flex-column border'
					style={chatContainer}>
					{/* <div className='container mt-2 mb-2 d-flex border p-2'>
						<div className='border rounded-circle overflow-hidden m-1'>
							<i className='card-img-top fas fa-user fa-3x d-flex justify-content-center align-items-center bg-dark text-light'></i>
						</div>
						<div className='d-flex justify-content-center align-items-center ml-2'>
							Name
						</div>
					</div>
					<div className='container bg-light' style={messageContainer}>
						<div className='border rounded-pill p-3 m-2 text-white  bg-success'>
							Messaeg 1
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
						<div className='border rounded-pill bg-info bg-info text-white p-3 m-2'>
							Messaeg 1 Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Repudiandae architecto optio quas deserunt dolorum officiis
							nihil id repellat illum ipsa?
						</div>
					</div> */}

					<ul id='chat-ul'></ul>
					<div className='container align-self-end m-2'>
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
			</div>

			<Footer />
		</div>
	);
};

const chatContainer = {
	// height: '100vh',
};

const messageContainer = {
	height: '75vh',
	overflow: 'scroll',
};

export default Chat;
