import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const res = await axios.post('http://localhost:5000/auth/login', {
			email,
			password,
		});

		console.log(res);

		if (res.status === 200) {
			history.push('/profile');
		}
	};

	return (
		<div style={box}>
			<form style={style} onSubmit={onSubmitHandler}>
				<h1 className='text-center'>Login</h1>
				<hr />
				<div className='mb-3'>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						className='form-control'
						id='email'
						aria-describedby='emailHelp'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength='5'
						required
					/>
				</div>
				<button type='submit' className='btn btn-primary btn-block'>
					Login
				</button>
			</form>
		</div>
	);
};

const box = {
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const style = {
	width: '50vw',
	border: '1px solid grey',
	borderRadius: '.3rem',
	padding: '1rem',
};

export default Login;
