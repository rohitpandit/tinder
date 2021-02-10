import React, { Fragment } from 'react';
import Footer from '../component/layout/Footer';
import Navbar from '../component/layout/Navbar';
import Loading from '../component/Loading';

const Index = ({ setIsLogged }) => {
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
						<img
							className='card-img-top o'
							src='https://i.redd.it/la4wfhzam3g61.jpg'
							alt='Card image cap'
							style={{ height: '30rem', objectFit: 'cover' }}
						/>
						<div
							className='card-body position-absolute pl-5 pr-5 pb-1'
							style={{ bottom: '0', left: '0', width: '100%' }}>
							<h5 className='card-title text-light '>Name Age</h5>

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
