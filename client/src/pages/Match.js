import React from 'react';

import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const Match = ({ setIsLogged, setTotalViewed }) => {
	return (
		<div>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />
			Mathces
			<Footer />
		</div>
	);
};

export default Match;
