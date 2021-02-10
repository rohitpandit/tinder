import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loading from '../component/Loading';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsLogged, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			setLoading(true);
			const res = await axios.post('http://localhost:5000/auth/login', {
				email,
				password,
			});

			const { token } = res.data;
			setLoading(false);

			console.log(token);

			if (res.status === 200) {
				localStorage.setItem('token', token);
				setIsLogged(token);
				history.push('/');
				window.location.reload();
			}
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.error);
		}
	};

	return (
		<div style={parent}>
			<ToastContainer />
			{loading ? (
				<Loading />
			) : (
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

					<h6 className='text-center'>
						New User? <Link to='/signup'>Signup</Link>
					</h6>
				</div>
			)}
		</div>
	);
};

const parent = {
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const box = {
	padding: '1rem',
	flexDirection: 'Column',
	border: '1px solid grey',
	borderRadius: '5px',
};

const style = {
	width: '50vw',
	borderRadius: '.3rem',
	padding: '1rem',
};

export default Login;
