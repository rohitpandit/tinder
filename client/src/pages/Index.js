import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import Footer from '../component/layout/Footer';
import Navbar from '../component/layout/Navbar';
// import Loading from '../component/Loading';

const Index = ({ setIsLogged }) => {
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [id, setId] = useState('');
	const [photoCount, setPhotoCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [currentCount, setCurrntCount] = useState(0);

	//useEffect for getting the user data like name and age
	useEffect(() => {
		getUserName();
		getUserProfile(0);
	}, []);

	const getUserName = async () => {
		const userData = await axios.get('http://localhost:5000/index/user');
		const { user } = userData.data;
		console.log(user);
		setPhotoCount(user.photoCount);
		setName(user.firstName + ' ' + user.lastName);
		setId(user._id);

		setAge(
			new Date().toLocaleDateString('en-US').split('/')[2] -
				user.dob.split('-')[0]
		);
		if (userData.data.photoCount !== 0) {
			setLoading(true);
		}
	};

	const getUserProfile = async (photoNum) => {
		//getting the first photo of the user
		const photo = await axios.get(
			`http://localhost:5000/index/photo/${photoNum}`
		);
		console.log(photo.data.photo);

		const arrayBufferView = new Uint8Array(photo.data.photo.data);
		const url = URL.createObjectURL(
			new Blob([arrayBufferView], { type: MimeType })
		);

		let img = document.getElementById('profile-img');
		console.log(img);
		img.src = url;
		setLoading(false);

		img.onload = (e) => URL.revokeObjectURL(url);
	};

	const onLeftArrowHandler = () => {
		if (currentCount === 0) {
			return;
		}
		let count = currentCount;
		count--;
		getUserProfile(count);
		setCurrntCount(count);
	};

	const onRightArrowHandler = () => {
		if (currentCount === photoCount - 1) {
			return;
		}
		let count = currentCount;
		count++;
		getUserProfile(count);
		setCurrntCount(count);
	};

	return (
		<Fragment>
			<Navbar setIsLogged={setIsLogged} />
			<main className='container' style={{ height: '100vh' }}>
				<div className='d-flex m-2 justify-content-center align-items-center '>
					<div
						onClick={onLeftArrowHandler}
						className='shadow m-2 pt-2 pb-2 pl-3 pr-3 border bg-dark text-light rounded-circle'>
						<i className='fas fa-chevron-left'></i>
					</div>
					<div
						className=' shadow card pl-6 pr-6 border position-relative'
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
								<span className='bg-dark p-2 rounded'>{name}</span>
								{'  '}
								<span className='bg-dark p-2 rounded-circle  '>
									<strong>{age}</strong>
								</span>
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
					<div
						onClick={onRightArrowHandler}
						className='shadow m-2 pt-2 pb-2 pl-3 pr-3 border bg-dark text-light rounded-circle'>
						<i className='fas fa-chevron-right'></i>
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};

export default Index;
