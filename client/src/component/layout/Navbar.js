import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = ({ setIsLogged, setTotalViewed, currentPage }) => {
	const history = useHistory();

	const logoutHandler = (e) => {
		e.preventDefault();
		console.log('logout 1');
		localStorage.removeItem('token');
		localStorage.removeItem('totalViewed');
		setTotalViewed(0);
		setIsLogged(null);
		history.push('/login');

		console.log('logout');
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light theme-color'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					<i className='fas fa-fire fa-2x'></i>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav m-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link
								className={`nav-link ${
									currentPage === 'Home' ? 'active' : ''
								} `}
								aria-current='page'
								to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className={`nav-link ${
									currentPage === 'Match' ? 'active' : ''
								}`}
								to='/match'>
								My Matches
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className={`nav-link ${
									currentPage === 'Profile' ? 'active' : ''
								}`}
								to='/profile'>
								Profile
							</Link>
						</li>
					</ul>
					<form className='float-right' onSubmit={logoutHandler}>
						<button className='btn btn-primary' type='submit'>
							Logout
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
