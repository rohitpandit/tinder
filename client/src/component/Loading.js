import React from 'react';
import loading from './loading.gif';

const Loading = () => {
  return (
    <div className="fluid-container" >
      <img src={loading} alt="Loading..." />
    </div>
  )
};

export default Loading;
