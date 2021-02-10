import React from 'react';
import loading from './loading.gif';

const Loading = () => {
	return (
		<div
			className='fluid-container d-flex justify-content-center align-items-center'
			style={{ height: '70vh' }}>
			<img src={loading} alt='Loading...' />
		</div>
	);
};

export default Loading;
