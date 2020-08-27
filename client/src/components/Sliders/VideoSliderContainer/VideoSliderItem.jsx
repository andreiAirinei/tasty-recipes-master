import React from 'react';
import ReactLogo from '../../../assets/play-button.svg'
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import {
  modalOpen,
  setVideoURL
} from '../../../redux/modals/videoModal/videoModal.actions';

// Bootstrap Components
import Image from 'react-bootstrap/Image';

const VideoSliderItem = ({
  youtubeURL,
  recipeID,
  title,
  category,
  imageURL,
  modalOpen,
  setVideoURL
}) => {

  const handleImageError = (e) => {
    e.target.src = 'https://i.ibb.co/9sYvpxK/logo.png';
  }

  const handleThumbnailClick = () => {
    setVideoURL(youtubeURL);
    modalOpen();
  }

  return (
    <div className='video-slider-item m-2'>
      <div className="thumbnail" onClick={handleThumbnailClick}>
        <Image
          src={imageURL}
          rounded
          fluid
          onError={handleImageError}
        // onLoad={handleImageLoad}
        />
        <div className="overlay d-flex align-content-center align-items-center justify-content-center">
          <div className="overlay-image bg-white text-center">
            <img src={ReactLogo} alt="Play Button" />
          </div>
        </div>
      </div>
      <div className="body mt-3">
        <p className='text-danger l-spacing-2 mb-1'>{category}</p>
        <Link to={`/recipes/recipe/${recipeID}`} className='card-link'>
          <p className='card-title text-dark text-size-1 mb-1'>{title}</p>
        </Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  modalOpen: () => dispatch(modalOpen()),
  setVideoURL: url => dispatch(setVideoURL(url))
});

export default connect(null, mapDispatchToProps)(VideoSliderItem);
