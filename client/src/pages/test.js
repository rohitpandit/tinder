import React, { useEffect } from 'react';
import axios from 'axios';

const Test = () => {
	useEffect(() => {
		const getUserProfile = async () => {
			//getting the data about the user
			const userData = await axios.get('http://localhost:5000/index/user');

			const photo = await axios.get('http://localhost:5000/index/photo/0');
			console.log(photo.data.photo);

			const blob = new Blob([photo.data.photo.data]);
			// const url = URL.createObjectURL(blob);
			const img = document.getElementById('profile-img');
			// img.src = url;
			img.src = 'data:image/bmp;base64,' + Base64.encode(blob);

			console.log(img.src);

			// img.onload = (e) => URL.revokeObjectURL(url);
		};

		getUserProfile();
	}, []);

	return (
		<div>
			<img id='profile-img' />
		</div>
	);
};

export default Test;
