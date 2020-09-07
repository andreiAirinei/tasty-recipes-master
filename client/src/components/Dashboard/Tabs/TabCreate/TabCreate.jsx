import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import {
  createRecipe,
  populateFieldsFromLS,
  resetAllFields
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Components
import BasicDetails from './BasicDetails';
import RecipeImage from './RecipeImage';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';

// Bootstrap
import Button from 'react-bootstrap/Button';

const TabCreate = ({ createRecipe, populateFieldsFromLS, resetAllFields }) => {

  useEffect(() => {
    populateFieldsFromLS();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    createRecipe();
  };

  return (
    <div className='tab-create'>
      <h1>Create new recipe</h1>
      <hr />
      <BasicDetails />
      <IngredientsList />
      <Instructions />
      <div className="text-center">
        <Button variant='success mr-3'>SAVE RECIPE</Button>
        <Button onClick={resetAllFields} variant='outline-secondary'>RESET FIELDS</Button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  createRecipe: () => dispatch(createRecipe()),
  populateFieldsFromLS: () => dispatch(populateFieldsFromLS()),
  resetAllFields: () => dispatch(resetAllFields())
});

export default connect(null, mapDispatchToProps)(TabCreate);
