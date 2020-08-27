import React from 'react';

// Slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

// Components
import SliderItem from './SliderItem';
import CustomNextArrow from '../customisations/CustomNextArrow';
import CustomPreviousArrow from '../customisations/CustomPreviousArrow';
import LoadingSpinner from '../../layout/LoadingSpinner';

const SliderContainer = ({ toShow }) => {

  if (toShow.isLoading || toShow.data === null) return <LoadingSpinner />;

  return (
    <Slider {...settings} className='slider-container'>
      {
        toShow.data && toShow.data.map(recipe =>
          <SliderItem
            key={recipe.idMeal}
            recipeID={recipe.idMeal}
            name={recipe.strMeal}
            category={recipe.strCategory}
            imgURL={`${recipe.strMealThumb}`}
          />
        )
      }
    </Slider>
  )
};

// Slider settings
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
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

export default SliderContainer;