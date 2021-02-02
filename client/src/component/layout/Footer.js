import React from 'react';

const Footer = () => {
	return (
		<div className='container-fluid bg-light' style={style}>
			All rights reserved &#169; Tinder
		</div>
	);
};

const style = {
	backgroundColor: 'var(--theme-main)',
	display: 'flex',
	justifyContent: 'center',
};

export default Footer;
