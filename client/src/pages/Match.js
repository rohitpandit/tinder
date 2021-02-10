import React from 'react';

import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const Match = ({ setIsLogged }) => {
	return (
		<div>
			<Navbar setIsLogged={setIsLogged} />
			Mathces
			<Footer />
		</div>
	);
};

export default Match;
