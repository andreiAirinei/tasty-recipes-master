import axios from 'axios';

import {
  CREATE_RECIPE,
  SET_BASIC_FIELD_VALUES,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_INGREDIENTS,
  SET_CURRENT_STEP_VALUE,
  ADD_RECIPE_STEP,
  REMOVE_RECIPE_STEP,
  CLEAR_RECIPE_STEPS,
  RESET_ALL_FIELDS
} from './privateRecipes.types';

// Dynamically set form field values
export const setBasicFieldValue = name => dispatch => {
  dispatch({
    type: SET_BASIC_FIELD_VALUES,
    payload: name
  })
};

// ADD ingredient to list
export const addIngredient = ingredient => dispatch => {
  dispatch({
    type: ADD_INGREDIENT,
    payload: ingredient
  });
}

// REMOVE ingredient from list
export const removeIngredient = ingredient => dispatch => {
  dispatch({
    type: REMOVE_INGREDIENT,
    payload: ingredient
  });
};

// CLEAR all ingredients from list
export const clearIngredients = () => ({ type: CLEAR_INGREDIENTS });
;

// SET value of current step
export const setCurrentStepValue = txt => ({
  type: SET_CURRENT_STEP_VALUE,
  payload: txt
})

// ADD RECIPE STEP
export const addStep = () => ({
  type: ADD_RECIPE_STEP
});

// RESET all fields
export const resetAllFields = () => ({ type: RESET_ALL_FIELDS })

// ADD RECIPE
export const createRecipe = recipe => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/recipes', recipe, config);

    dispatch({
      type: CREATE_RECIPE,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data.msg);
  }
};