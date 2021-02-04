import React, { Fragment } from 'react';
import Footer from '../component/layout/Footer';
import Navbar from '../component/layout/Navbar';

const Index = () => {
	return (
		<Fragment>
			<Navbar />
			<main className='container'>some content</main>
			<Footer />
		</Fragment>
	);
};

export default Index;
