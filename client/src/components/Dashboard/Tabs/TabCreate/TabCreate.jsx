import React, { useEffect, useState, useRef } from 'react';

// Redux
import { connect } from 'react-redux';
import {
  createRecipe,
  updateRecipe,
  populateFieldsFromLS,
  resetAllFields,
  toggleEditMode
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Components
import BasicDetails from './BasicDetails';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const TabCreate = ({ createRecipe, updateRecipe, populateFieldsFromLS, resetAllFields, editMode, toggleEditMode, recipe }) => {

  const { ingredients, steps } = recipe;

  useEffect(() => {
    !editMode && populateFieldsFromLS();

    return () => {
      toggleEditMode(false);
    }
  }, [editMode, toggleEditMode, populateFieldsFromLS]);


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
    console.log(recipe);
    !editMode ? createRecipe(recipe) : updateRecipe(recipe);
  };

  return (
    <div className={`tab-create ${editMode && 'theme-edit'}`}>

      {!editMode ? <h1>Create new recipe</h1> : <h1>Edit Recipe</h1>}
      <hr />
      <Form onSubmit={handleSubmit}>
        <BasicDetails />
        <IngredientsList />
        <Instructions />
        {
          !editMode ?
            <div className="text-center">
              <Button type='submit' variant='success' className='create-form-button mr-3'>SAVE RECIPE</Button>
              <Button onClick={handleResetButton} variant='outline-secondary' className='create-form-button'>RESET FIELDS</Button>
            </div>
            : <div className="text-center">
              <Button type='submit' variant='success' className='mr-3' className='create-form-button'>UPDATE RECIPE</Button>
              <Button onClick={() => window.history.back()} variant='outline-dark' className='create-form-button'>CANCEL</Button>
            </div>
        }
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  recipe: state.privateRecipes.recipe,
  editMode: state.privateRecipes.editMode
})

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe)),
  updateRecipe: recipe => dispatch(updateRecipe(recipe)),
  populateFieldsFromLS: () => dispatch(populateFieldsFromLS()),
  resetAllFields: () => dispatch(resetAllFields()),
  toggleEditMode: value => dispatch(toggleEditMode(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabCreate);
