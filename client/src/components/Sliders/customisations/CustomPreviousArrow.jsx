import React from 'react';
import ReactLogo from '../../../assets/svgs/solid/arrow-left.svg';

const CustomPreviousArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='slider-previous-arrow d-flex align-items-center'>
      <div className='previous-arrow-container d-flex align-items-center bg-white shadow-sm' onClick={onClick}>
        <button
          onClick={onClick}
          className='slider-button bg-white ml-auto mr-2'
        >
          <img src={ReactLogo} alt="Previous Arrow" />
        </button>
      </div>
    </div>
  )
}

export default CustomPreviousArrow;
