// FaceRecognition.js
import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, isLoading }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt4'>
        {isLoading && <div className=' imgstyle loading-message'>Loading, please wait...</div>}
        {!isLoading && imageUrl && <img id='inputImage' alt='Result' src={imageUrl} style={{ maxWidth: '500px', height: 'auto' }}/>}
      </div>
    </div>
  );
}

export default FaceRecognition;

