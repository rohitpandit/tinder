import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import Footer from '../component/layout/Footer';
import Navbar from '../component/layout/Navbar';
// import Loading from '../component/Loading';

const Index = ({ setIsLogged, totalViewed, setTotalViewed }) => {
	// const pastViewedProfiles = localStorage

	console.log(totalViewed);

	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [id, setId] = useState('');
	const [photoCount, setPhotoCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [currentCount, setCurrntCount] = useState(0);

	//useEffect for getting the user data like name and age
	useEffect(() => {
		setCurrntCount(0);
		getUserName(totalViewed);
		getUserProfile(totalViewed, 0);
		localStorage.setItem('totalViewed', totalViewed);
	}, [totalViewed]);

	//function for setting the match to the get saved in the match service
	const setAccept = async (personId) => {
		console.log(personId);
		await axios.post('http://localhost:5000/match', { personId });
	};

	const getUserName = async (skip) => {
		const userData = await axios.get(
			`http://localhost:5000/index/user/${skip}`
		);
		const { user } = userData.data;
		console.log(user);
		setPhotoCount(user.photosLength);
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

	const getUserProfile = async (skip, photoNum) => {
		//getting the first photo of the user
		const photo = await axios.get(
			`http://localhost:5000/index/photo/${photoNum}/${skip}`
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

	//Arrow handlers
	const onLeftArrowHandler = () => {
		if (photoCount === 0) {
			return;
		}
		if (currentCount === 0) {
			return;
		}
		let count = currentCount;
		count--;
		getUserProfile(totalViewed, count);
		setCurrntCount(count);
	};

	const onRightArrowHandler = () => {
		if (photoCount === 0) {
			return;
		}
		if (currentCount === photoCount - 1) {
			return;
		}
		let count = currentCount;
		count++;
		getUserProfile(totalViewed, count);
		setCurrntCount(count);
	};

	//Handling the dislike/Reject
	const rejectHandler = () => {
		console.log('rejected');
		let viewed = totalViewed;
		viewed++;
		setTotalViewed(viewed);
		console.log(viewed);
	};

	//handling the like/Accept
	const acceptHandler = () => {
		console.log('accepted');
		let viewed = totalViewed;
		viewed++;
		setTotalViewed(viewed);
		console.log(viewed);
		setAccept(id);
	};

	return (
		<Fragment>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />
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
								<button onClick={rejectHandler} className='btn btn-danger'>
									Reject
								</button>
								<button onClick={acceptHandler} className='btn btn-success'>
									Accept
								</button>
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
