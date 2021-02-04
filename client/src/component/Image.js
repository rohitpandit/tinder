import React from 'react';

const Image = ({ ...props }) => {
	return <div style={style} {...props}></div>;
};

const style = {
	width: '30%',
	margin: '.5rem',
	height: '15rem',
	padding: '.5rem',
	// border: '1px solid grey',
};

export default Image;
