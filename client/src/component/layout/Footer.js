import React from 'react';

const Footer = () => {
	return (
		<div className='container-fluid bg-light p-2 my-10' style={style}>
			All rights reserved &#169; Tinder
		</div>
	);
};

const style = {
	backgroundColor: 'var(--theme-main)',
	display: 'flex',
	justifyContent: 'center',
	position: 'relative',
	bottom: '0px',
};

export default Footer;
