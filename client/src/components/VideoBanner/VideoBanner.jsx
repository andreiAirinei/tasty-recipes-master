import React from 'react';

// Components
import CallToActionCard from '../CallToActionCard/CallToActionCard';

const VideoBanner = () => {
  return (
    <div className='video-banner'>
      <div className="video d-none d-md-flex align-items-center">
        <video className='clip' autoPlay muted loop >
          <source src={require('../../assets/videos/tasty-marshmallows.mp4')} type='video/mp4' />
        </video>
      </div>
      <CallToActionCard withLogo />
    </div>
  )
}

export default VideoBanner;
