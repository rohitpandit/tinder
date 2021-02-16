import React from 'react';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';

const Chat = ({ setIsLogged, setTotalViewed }) => {
	return (
		<div>
			<Navbar setTotalViewed={setTotalViewed} setIsLogged={setIsLogged} />
			Chat
			<Footer />
		</div>
	);
};

export default Chat;
