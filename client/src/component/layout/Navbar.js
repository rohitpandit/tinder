import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
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
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link className='nav-link ' aria-current='page' to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/match'>
								My Matches
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/profile'>
								Profile
							</Link>
						</li>
						<li className='nav-item'>
							<form action='/logout' method='POST'>
								<buttom type='submit'>
									<Link className='nav-link' to='/fasd'>
										Logout
									</Link>
								</buttom>
							</form>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
