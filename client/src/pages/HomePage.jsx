import React, { lazy, Suspense } from 'react';

// Components
import Jumbotron from '../components/Jumbotron/Jumbotron';
import RecipesSlider from '../components/Sliders/RecipesSlider';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const CategoriesContainer = lazy(() =>
  import("../components/CategoriesSection/CategoriesContainer")
);
const VideoBanner = lazy(() =>
  import("../components/VideoBanner/VideoBanner")
);

const HomePage = () => {

  return (
    <div className='homepage'>
      <Jumbotron
        title='Looking for a tasty recipe?'
        imgURL='site1.jpg'
        withSearchbar />
      <RecipesSlider />
      <Suspense fallback={<LoadingSpinner />}>
        <CategoriesContainer />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <VideoBanner />
      </Suspense>
      <RecipesSlider title='Video Recipes' isVideo />
    </div>
  )
}

export default HomePage;
