import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { getRecipeByID, clearSingleRecipe } from '../../redux/recipes/recipes.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectSingleRecipe } from '../../redux/recipes/recipes.selectors';

// Components
import RecipeHeader from './RecipeHeader';
import RecipeContent from './RecipeContent/RecipeContent';
import CallToActionCard from '../CallToActionCard/CallToActionCard';
import RelatedRecipes from '../Sliders/RelatedRecipes';
import SectionTitle from '../layout/SectionTitle';

// Bootstrap
import Container from 'react-bootstrap/Container'

const RecipeOverview = ({ match, getRecipeByID, clearSingleRecipe, singleRecipe }) => {
  useEffect(() => {
    getRecipeByID(match.params.recipeID);

    return () => {
      clearSingleRecipe();
    }
  }, [getRecipeByID, match.params.recipeID, clearSingleRecipe]);

  return (
    <>
      <Container className='recipe-overview' fluid='xl'>
        <div className="recipe-overview-underlay" />
        <div className="curved-line d-none d-lg-block" />
        <RecipeHeader />
        <RecipeContent />
        <CallToActionCard withLogo />
      </Container>

      {
        singleRecipe &&
        <Container className='recipes-slider px-0 mb-5' fluid='xl'>
          <SectionTitle title={`Related ${singleRecipe.strCategory} recipes`} />
          <RelatedRecipes />
        </Container>
      }
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  singleRecipe: selectSingleRecipe
});

const mapDispatchToProps = dispatch => ({
  getRecipeByID: id => dispatch(getRecipeByID(id)),
  clearSingleRecipe: () => dispatch(clearSingleRecipe())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeOverview);
