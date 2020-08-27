import React from 'react';
import ReactLogo from '../../../assets/svgs/solid/arrow-right.svg';

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='slider-next-arrow d-flex align-items-center'>
      <div className='next-arrow-container d-flex align-items-center bg-white shadow-sm' onClick={onClick}>
        <button
          onClick={onClick}
          className='slider-button ml-2 bg-white'
        >
          <img src={ReactLogo} alt="Next Arrow" />
        </button>
      </div>
    </div>
  )
}

export default CustomNextArrow;
