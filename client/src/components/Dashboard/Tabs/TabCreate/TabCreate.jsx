import React from 'react';

// Redux
import { connect } from 'react-redux';
import {
  createRecipe,
  resetAllFields
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Components
import BasicDetails from './BasicDetails';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';

// Bootstrap
import Button from 'react-bootstrap/Button';

const TabCreate = ({
  createRecipe,
  resetAllFields
}) => {

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
  resetAllFields: () => dispatch(resetAllFields())
});

export default connect(null, mapDispatchToProps)(TabCreate);
