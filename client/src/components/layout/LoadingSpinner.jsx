import React from 'react';

// Bootstrap Components
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner text-center w-100'>
      <Spinner animation='grow' variant='primary' size='sm' />
      <Spinner animation='grow' variant='primary' size='sm' />
      <Spinner animation='grow' variant='primary' size='sm' />
    </div>
  )
}

export default LoadingSpinner;
