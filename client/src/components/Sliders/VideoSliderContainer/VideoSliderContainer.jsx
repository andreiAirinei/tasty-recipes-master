import React from 'react';

// Slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

// Components
import VideoSliderItem from './VideoSliderItem';
import CustomNextArrow from '../customisations/CustomNextArrow';
import CustomPreviousArrow from '../customisations/CustomPreviousArrow';
import LoadingSpinner from '../../layout/LoadingSpinner';

const VideoSliderContainer = ({ toShow }) => {
  if (toShow.isLoading || toShow.data === null) return <LoadingSpinner />;

  return (
    <Slider {...settings} className='video-slider-container'>
      {
        toShow.data && toShow.data.map(recipe =>
          recipe.strYoutube && <VideoSliderItem
            key={recipe.idMeal}
            recipeID={recipe.idMeal}
            youtubeURL={recipe.strYoutube}
            title={recipe.strMeal}
            category={recipe.strCategory}
            imageURL={recipe.strMealThumb}
          />
        )
      }
    </Slider>
  )
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3.3,
  slidesToScroll: 1,
  centerMode: true,
  initialSlide: 5,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPreviousArrow />,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3.5,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.5
      }
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1.5,
      }
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

export default VideoSliderContainer;
