import React, { useEffect, useState, useRef } from 'react';

// Redux
import { connect } from 'react-redux';
import {
  createRecipe,
  populateFieldsFromLS,
  resetAllFields
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Components
import BasicDetails from './BasicDetails';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const TabCreate = ({ createRecipe, populateFieldsFromLS, resetAllFields, recipe }) => {

  const { ingredients, steps } = recipe;

  useEffect(() => {
    populateFieldsFromLS();
  }, []);


  const handleResetButton = () => {
    resetAllFields();
    window.scrollTo(0, 400);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!ingredients.length > 0) {
      console.log('Atleast 1 ingredient needed');
      window.scrollTo(0, 1012);
      return;
    };
    if (!steps.length > 0) {
      console.log('Atleast 1 cooking step needed');
      window.scrollTo(0, 1400);
      return;
    };

    console.log('FORM SUBMITED');
    console.log(recipe);
    createRecipe(recipe);
  };

  return (
    <div className='tab-create'>
      <h1>Create new recipe</h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <BasicDetails />
        <IngredientsList />
        <Instructions />
        <div className="text-center">
          <Button type='submit' variant='success mr-3'>SAVE RECIPE</Button>
          <Button onClick={handleResetButton} variant='outline-secondary'>RESET FIELDS</Button>
        </div>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  recipe: state.privateRecipes.recipe
})

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe)),
  populateFieldsFromLS: () => dispatch(populateFieldsFromLS()),
  resetAllFields: () => dispatch(resetAllFields())
});

export default connect(mapStateToProps, mapDispatchToProps)(TabCreate);
