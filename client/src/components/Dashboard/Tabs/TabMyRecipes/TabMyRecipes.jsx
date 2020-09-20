import React from 'react';

// Components
import RecipesContainer from './RecipesContainer.jsx';
import SectionTitle from '../../../layout/SectionTitle.jsx';

const TabMyRecipes = () => {

  return (
    <div>
      <SectionTitle title='My Recipes' />
      <RecipesContainer />
    </div>
  )
}

export default TabMyRecipes;
