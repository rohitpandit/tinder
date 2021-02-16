import React from 'react';

import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const PageNotFound = ({ setIsLogged, setTotalViewed }) => {
	return (
		<div>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />
			Page not found
			<Footer />
		</div>
	);
};

export default PageNotFound;
