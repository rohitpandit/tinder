import React, { Fragment } from 'react';

const Login = () => {
	return (
		<div style={box}>
			<form style={style}>
				<h1 className='text-center'>Login</h1>
				<hr />
				<div className='mb-3'>
					<label for='email'>Email address</label>
					<input
						type='email'
						className='form-control'
						id='email'
						aria-describedby='emailHelp'
						required
					/>
				</div>
				<div className='mb-3'>
					<label for='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						id='password'
						required
					/>
				</div>
				<button type='submit' className='btn btn-primary btn-block'>
					Submit
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
