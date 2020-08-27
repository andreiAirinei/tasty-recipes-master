import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Redux
import { getRecipesByCategory } from '../../redux/recipes/recipes.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import {
  selectSingleRecipe,
  selectLimitedRecipesList
} from '../../redux/recipes/recipes.selectors';

// Components
import SliderContainer from '../Sliders/SliderContainer/SliderContainer';

const RelatedRecipes = ({ singleRecipe, getRecipesByCategory, recipesByCategory }) => {
  useEffect(() => {
    if (singleRecipe) getRecipesByCategory({ type: singleRecipe.strCategory, isCountry: false });
  }, [singleRecipe, getRecipesByCategory])

  return (
    <div className='related-recipes'>
      <SliderContainer toShow={recipesByCategory && recipesByCategory} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  singleRecipe: selectSingleRecipe,
  recipesByCategory: selectLimitedRecipesList(10)
});

const mapDispatchToProps = dispatch => ({
  getRecipesByCategory: category => dispatch(getRecipesByCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(RelatedRecipes);
