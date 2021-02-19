import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const socket = io('http://localhost:5004');

const Chat = ({ setIsLogged, setTotalViewed }) => {
	useEffect(() => {
		socket.on('connect', () => {
			console.log('hell');
		});
	}, []);

	return (
		<div>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />
			<div className='container mb-5 mt-2'>
				<h1>Chat</h1>
				<hr />
				<div
					className='container p-2 mt-2 mb-5 d-flex flex-column border'
					style={chatContainer}>
					<div className='container mt-2 mb-2 d-flex border p-2'>
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
					</div>
					<div className='container align-self-end m-2'>
						<form className='d-flex' action=''>
							<input className='form-control' type='text' />
							<button className='btn btn-success'>Send</button>
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
