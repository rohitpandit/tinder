import React, { useState, useEffect } from 'react';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const Profile = () => {
	return (
		<div>
			<Navbar />
			<div className='container'>
				<h1>Profile</h1>
				<hr />
				<div className='d-flex  '>
					<div className='d-flex flex-column mr-5 w-50'>
						<div class='input-group mb-3'>
							<div class='input-group-prepend'>
								<span class='input-group-text' id='basic-addon3'>
									First Name
								</span>
							</div>
							<input
								type='text'
								class='form-control'
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</div>
						<div class='input-group mb-3'>
							<div class='input-group-prepend'>
								<span class='input-group-text' id='basic-addon3'>
									Last Name
								</span>
							</div>
							<input
								type='text'
								class='form-control'
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</div>
						<div class='input-group mb-3'>
							<div class='input-group-prepend'>
								<span class='input-group-text' id='basic-addon3'>
									DOB
								</span>
							</div>
							<input
								type='date'
								class='form-control'
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</div>
						<div class='input-group mb-3'>
							<div class='input-group-prepend'>
								<span class='input-group-text' id='basic-addon3'>
									City
								</span>
							</div>
							<input
								type='text'
								class='form-control'
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</div>
						<div class='input-group mb-3'>
							<div class='input-group-prepend'>
								<span class='input-group-text' id='basic-addon3'>
									state
								</span>
							</div>
							<input
								type='text'
								class='form-control'
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</div>
						<div class='input-group mb-3'>
							<div class='input-group-prepend'>
								<span class='input-group-text' id='basic-addon3'>
									Zipcode
								</span>
							</div>
							<input
								type='text'
								class='form-control'
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</div>
						<div class='input-group mb-3'>
							<div class='input-group-prepend'>
								<span class='input-group-text' id='basic-addon3'>
									Country
								</span>
							</div>
							<input
								type='text'
								class='form-control'
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</div>
						<button className='btn btn-primary' type='submit'>
							Save
						</button>
					</div>

					{/* image */}
					<div className='d-flex flex-wrap'>
						<div className='w-25'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								class='img-fluid  img-thumbnail'
								alt='Responsive image'
							/>
						</div>
						<div className='w-25'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								class='img-fluid max-width-10 img-thumbnail'
								alt='Responsive image'
							/>
						</div>
						<div className='w-25'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								class='img-fluid max-width-10 img-thumbnail'
								alt='Responsive image'
							/>
						</div>
						<div className='w-25'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								class='img-fluid max-width-10 img-thumbnail'
								alt='Responsive image'
							/>
						</div>
						<div className='w-25'>
							<img
								src='https://i.redd.it/0gicq802q5f61.jpg'
								class='img-fluid max-width-10 img-thumbnail'
								alt='Responsive image'
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
