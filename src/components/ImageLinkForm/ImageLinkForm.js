// ImageLinkForm.js
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className='center'>
            <div className='form pa4 br3 shadow-5'>
                <input 
                  className='f4 pa2 w-70 ' 
                  type='text' 
                  onChange={onInputChange} 
                  placeholder='Enter text to generate an image'
                />
                <button 
                  className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                  onClick={onSubmit}
                >
                  Generate Image
                </button>
            </div>
        </div>
    );
};

export default ImageLinkForm;
