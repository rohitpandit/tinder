import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const Match = ({ setIsLogged, setTotalViewed }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const res = await axios.get('http://localhost:5000/match/connection');
			console.log(res.data);
		};

		getData();
	}, []);

	return (
		<div>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />

			<div className='container mb-5 mt-2' style={style}>
				<h1>My Matches</h1>
				<hr />
				<div
					className='container d-flex border rounded m-3 bg-light'
					style={elementStyle}>
					<div className='border rounded-circle overflow-hidden m-1'>
						<i className='card-img-top fas fa-user fa-3x d-flex justify-content-center align-items-center bg-dark text-light'></i>
					</div>
					<div className='d-flex justify-content-center align-items-center ml-2'>
						name 1
					</div>
				</div>
				<div
					className='container d-flex border rounded m-3  bg-light'
					style={elementStyle}>
					<div className='border rounded-circle overflow-hidden m-1'>
						<i className='card-img-top fas fa-user fa-3x d-flex justify-content-center align-items-center bg-dark text-light'></i>
					</div>
					<div className='d-flex justify-content-center align-items-center ml-2'>
						name 1
					</div>
				</div>
				<div
					className='container d-flex border rounded m-3  bg-light'
					style={elementStyle}>
					<div className='border rounded-circle overflow-hidden m-1'>
						<i className='card-img-top fas fa-user fa-3x d-flex justify-content-center align-items-center bg-dark text-light'></i>
					</div>
					<div className='d-flex justify-content-center align-items-center ml-2'>
						name 1
					</div>
				</div>
				<div
					className='container d-flex border rounded m-3 bg-light'
					style={elementStyle}>
					<div className='border rounded-circle overflow-hidden m-1'>
						<i className='card-img-top fas fa-user fa-3x d-flex justify-content-center align-items-center bg-dark text-light'></i>
					</div>
					<div className='d-flex justify-content-center align-items-center ml-2'>
						name 1
					</div>
				</div>
				<div
					className='container d-flex border rounded m-3 bg-light'
					style={elementStyle}>
					<div className='border rounded-circle overflow-hidden m-1'>
						<i className='card-img-top fas fa-user fa-3x d-flex justify-content-center align-items-center bg-dark text-light'></i>
					</div>
					<div className='d-flex justify-content-center align-items-center ml-2'>
						name 1
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

const style = {
	// height: '90vh',
};

const elementStyle = {
	padding: '.5rem',
	margin: '.5rem',
};

export default Match;
