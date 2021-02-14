import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import Footer from '../component/layout/Footer';
import Navbar from '../component/layout/Navbar';
import Loading from '../component/Loading';

const Index = ({ setIsLogged }) => {
	const [user, setUser] = useState(null);
	const [photoCount, setPhotoCount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getUserProfile = async () => {
			//getting the data about the user
			const userData = await axios.get('http://localhost:5000/index/user');
			setPhotoCount(userData.data.photosLength);
			setUser(userData.data);

			if (userData.data.photoCount !== 0) {
				setLoading(true);
			}

			//getting the first photo of the user
			const photo = await axios.get('http://localhost:5000/index/photo/0');
			console.log(photo.data.photo);

			const arrayBufferView = new Uint8Array(photo.data.photo.data);
			const url = URL.createObjectURL(
				new Blob([arrayBufferView], { type: MimeType })
			);

			const img = document.getElementById('profile-img');
			img.src = url;
			setLoading(false);

			img.onload = (e) => URL.revokeObjectURL(url);
		};

		getUserProfile();
	}, []);

	return (
		<Fragment>
			<Navbar setIsLogged={setIsLogged} />
			<main className='container' style={{ height: '100vh' }}>
				<div className='d-flex m-2 justify-content-center align-items-center '>
					<div className=''>
						<i className='fas fa-chevron-left'></i>
					</div>
					<div
						className='card pl-6 pr-6 border position-relative'
						style={{ width: '25rem' }}>
						{photoCount === 0 ? (
							<i
								className='card-img-top fas fa-user fa-10x d-flex justify-content-center align-items-center bg-dark text-light'
								style={{ height: '30rem', objectFit: 'cover' }}></i>
						) : (
							<img
								id='profile-img'
								className='card-img-top '
								alt='profile image'
								style={{ height: '30rem', objectFit: 'cover' }}
							/>
						)}

						<div
							className='card-body position-absolute pl-5 pr-5 pb-1'
							style={{ bottom: '0', left: '0', width: '100%' }}>
							<h5 className='card-title text-light '>
								<span className='bg-dark p-2'>
									<strong>name</strong>
								</span>{' '}
								<span className='bg-dark p-2'>Age</span>
							</h5>

							<div className='d-flex justify-content-between  '>
								<a href='#' className='btn btn-danger'>
									Reject
								</a>
								<a href='#' className='btn btn-success'>
									Accept
								</a>
							</div>
						</div>
					</div>
					<div className=''>
						<i className='fas fa-chevron-right'></i>
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};

export default Index;
