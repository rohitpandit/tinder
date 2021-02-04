import React, { useState, useEffect } from 'react';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';
import axios from 'axios';

const Profile = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [country, setCountry] = useState('');

	useEffect(() => {
		const getData = async () => {
			const initialData = await axios.get('http://localhost:5000/user');
			if (initialData.status !== 200) {
				console.log(initialData.msg);
				return;
			}

			console.log(initialData.data);
		};

		getData();
		//eslint-disble-next-line
	}, []);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		console.log('saved');
		if (
			firstName === '' ||
			lastName === '' ||
			dob === '' ||
			state === '' ||
			city === '' ||
			country === '' ||
			zipcode === ''
		) {
			console.log('Enter all the fields');
			return;
		}

		//formatting the date
		console.log(typeof dob);
		setDob(new Date(dob));
		console.log(typeof dob);
		console.log(dob);
		console.log(country);

		const res = await axios.put('http://localhost:5000/user', {
			firstName,
			lastName,
			dob,
			state,
			city,
			country,
			zipcode,
		});

		if (res.status !== 200) {
			console.log(res.msg);
			return;
		}

		console.log('saved successfully');
	};

	return (
		<div>
			<Navbar />
			<div className='container mb-5 mt-2'>
				<h1>Profile</h1>
				<hr />
				<div className='row  '>
					<div className='d-flex flex-column mr-5 w-100 col'>
						<form onSubmit={onSubmitHandler}>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='basic-addon3'>
										First Name
									</span>
								</div>
								<input
									type='text'
									className='form-control'
									id='basic-url'
									aria-describedby='basic-addon3'
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='basic-addon3'>
										Last Name
									</span>
								</div>
								<input
									type='text'
									className='form-control'
									id='basic-url'
									aria-describedby='basic-addon3'
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='basic-addon3'>
										DOB
									</span>
								</div>
								<input
									type='date'
									className='form-control'
									id='basic-url'
									aria-describedby='basic-addon3'
									value={dob}
									onChange={(e) => setDob(e.target.value)}
								/>
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='basic-addon3'>
										City
									</span>
								</div>
								<input
									type='text'
									className='form-control'
									id='basic-url'
									aria-describedby='basic-addon3'
									value={city}
									onChange={(e) => setCity(e.target.value)}
								/>
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='basic-addon3'>
										state
									</span>
								</div>
								<input
									type='text'
									className='form-control'
									id='basic-url'
									aria-describedby='basic-addon3'
									value={state}
									onChange={(e) => setState(e.target.value)}
								/>
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='basic-addon3'>
										Zipcode
									</span>
								</div>
								<input
									type='text'
									className='form-control'
									id='basic-url'
									aria-describedby='basic-addon3'
									value={zipcode}
									onChange={(e) => setZipcode(e.target.value)}
								/>
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='basic-addon3'>
										Country
									</span>
								</div>
								<input
									type='text'
									className='form-control'
									id='basic-url'
									aria-describedby='basic-addon3'
									value={country}
									onChange={(e) => setCountry(e.target.value)}
								/>
							</div>
							<button className='btn btn-primary btn-block' type='submit'>
								Save
							</button>
						</form>
					</div>

					{/* image */}
					<div className='d-flex flex-wrap col-8'>
						<div className='w-50'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								className='img-fluid  img-thumbnail'
								alt='Responsive '
							/>
						</div>
						<div className='w-50'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								className='img-fluid max-width-10 img-thumbnail'
								alt='Responsive '
							/>
						</div>
						<div className='w-50'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								className='img-fluid max-width-10 img-thumbnail'
								alt='Responsive '
							/>
						</div>
						<div className='w-50'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								className='img-fluid max-width-10 img-thumbnail'
								alt='Responsive '
							/>
						</div>
						<div className='w-50'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								className='img-fluid max-width-10 img-thumbnail'
								alt='Responsive '
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Profile;
