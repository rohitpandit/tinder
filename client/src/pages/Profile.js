import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';
import Image from '../component/Image';
import Loading from '../component/Loading';

const Profile = ({ setIsLogged }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipcode, setZipcode] = useState('');
	const [country, setCountry] = useState('');
	const [avtars, setAvtars] = useState([]);
	const [isAvtar, setIsAvtar] = useState(false);
	const [tempImage, setTempImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [formLoading, setFormLoading] = useState(false);

	useEffect(() => {
		//getting all the profile data from the server
		const getData = async () => {
			setImageLoading(true);
			setFormLoading(true);
			const initialData = await axios.get('http://localhost:5000/user');
			if (initialData.status !== 200) {
				return;
			}

			console.log('shi');

			const { user, photos } = initialData.data;
			if (user.firstName) {
				setFirstName(user.firstName);
			}
			if (user.lastName) {
				setLastName(user.lastName);
			}
			if (user.dob) {
				setDob(user.dob.split('T')[0]);
			}
			if (user.city) {
				setCity(user.city);
			}
			if (user.state) {
				setState(user.state);
			}
			if (user.zipcode) {
				setZipcode(user.zipcode);
			}
			if (user.country) {
				setCountry(user.country);
			}

			setFormLoading(false);

			if (photos && photos.length > 0) {
				setIsAvtar(true);
			}

			let photoArray = [];
			for (let i = 0; i < photos.length; i++) {
				const arrayBufferView = new Uint8Array(photos[i].data);
				const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
				const urlCreator = window.URL || window.webkitURL;
				const imageUrl = urlCreator.createObjectURL(blob);
				console.log(imageUrl);

				photoArray.unshift(imageUrl);
			}

			setAvtars(photoArray);
			setImageLoading(false);

			//clean-up code
			return function cleanup() {
				URL.revokeObjectURL(photoArray);
			};
		};

		getData();
	}, []);

	//Form submit for the user information
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (
			firstName === '' ||
			lastName === '' ||
			dob === '' ||
			state === '' ||
			city === '' ||
			country === '' ||
			zipcode === ''
		) {
			return;
		}

		setFormLoading(true);
		const res = await axios.put('http://localhost:5000/user', {
			firstName,
			lastName,
			dob,
			state,
			city,
			country,
			zipcode,
		});
		setFormLoading(false);

		if (res.status !== 200) {
			window.location.reload();
			return;
		}

		console.log('saved successfully');
	};

	const onUploadHandler = async (e) => {
		e.preventDefault();

		if (avtars.length >= 5) {
			console.log('You can have 5 images at max');
			return;
		}

		console.log(tempImage);
		const formData = new FormData();
		formData.append('newAvtar', tempImage);

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		setImageLoading(true);
		const result = await axios.put(
			'http://localhost:5000/user/photos',
			formData,
			config
		);
		setImageLoading(false);

		if (result.status === 200) {
			window.location.reload();
			setTempImage(null);
			console.log(tempImage);
			return;
		}

		console.log('some error happended', result.msg);

		return;
	};

	const deleteImageHandler = async (count) => {
		setImageLoading(true);
		const result = await axios.delete(
			`http://localhost:5000/user/photos/${count}`
		);
		setImageLoading(false);
		console.log(result.data);
		console.log('delte image');
		if (result.status === 200) {
			window.location.reload();
			setTempImage(null);
			console.log(tempImage);
		}

		return;
	};

	return (
		<div>
			<Navbar setIsLogged={setIsLogged} />
			<div className='container mb-5 mt-2'>
				<h1>Profile</h1>
				<hr />
				<div className='row  '>
					<div className='d-flex flex-column mr-5 w-100 col'>
						{formLoading ? (
							<Loading />
						) : (
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
									Apply Changes
								</button>
							</form>
						)}
					</div>

					{/* image */}
					<div className='col-8'>
						<form
							onSubmit={onUploadHandler}
							className='mb-2'
							encType='multipart/form-data'>
							<div className='custom-file'>
								<input
									name='newAvtar'
									type='file'
									className='custom-file-input mb-10'
									id='newAvtar'
									onChange={(e) => setTempImage(e.target.files[0])}
									required
								/>
								<label className='custom-file-label' htmlFor='inputGroupFile01'>
									Choose file
								</label>
							</div>
							<button
								className='btn btn-primary btn-block mt-2 mb-4'
								type='submit'>
								Upload
							</button>
						</form>
						<hr />
						{imageLoading ? (
							<Loading />
						) : avtars.length === 0 ? (
							<div>Upload some images</div>
						) : (
							<div className='d-flex flex-wrap'>
								<Image>
									{avtars.length >= 1 ? (
										<Fragment>
											<i
												className='far fa-window-close text-danger   m-2  float-right'
												style={{}}
												onClick={() => deleteImageHandler(0)}
											/>
											<img
												id='test-img'
												src={avtars[0]}
												className='img-fluid'
												alt='Responsive '
											/>
										</Fragment>
									) : (
										<></>
									)}
								</Image>
								<Image className=''>
									{avtars.length >= 2 ? (
										<Fragment>
											<i
												className='far fa-window-close text-danger   m-2  float-right'
												style={{}}
												onClick={() => deleteImageHandler(1)}
											/>

											<img
												src={avtars[1]}
												className='img-fluid '
												alt='Responsive '
											/>
										</Fragment>
									) : (
										<></>
									)}
								</Image>
								<Image className=''>
									{avtars.length >= 3 ? (
										<Fragment>
											<i
												className='far fa-window-close text-danger   m-2  float-right'
												style={{}}
												onClick={() => deleteImageHandler(2)}
											/>

											<img
												src={avtars[2]}
												className='img-fluid '
												alt='Responsive '
											/>
										</Fragment>
									) : (
										<></>
									)}
								</Image>
								<Image className=''>
									{avtars.length >= 4 ? (
										<Fragment>
											<i
												className='far fa-window-close text-danger   m-2  float-right'
												style={{}}
												onClick={() => deleteImageHandler(3)}
											/>
											<img
												src={avtars[3]}
												className='img-fluid '
												alt='Responsive '
											/>
										</Fragment>
									) : (
										<></>
									)}
								</Image>
								<Image className=''>
									{avtars.length >= 5 ? (
										<Fragment>
											<i
												className='far fa-window-close text-danger   m-2  float-right'
												style={{}}
												onClick={() => deleteImageHandler(4)}
											/>
											<img
												src={avtars[4]}
												className='img-fluid '
												alt='Responsive '
											/>
										</Fragment>
									) : (
										<></>
									)}
								</Image>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Profile;
