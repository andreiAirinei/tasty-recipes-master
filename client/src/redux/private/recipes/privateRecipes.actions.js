import axios from 'axios';

import {
  CREATE_RECIPE,
  SET_BASIC_FIELD_VALUES,
  SET_LOCAL_IMAGE,
  REMOVE_LOCAL_IMAGE,
  SET_IMGBB_IMAGE,
  REMOVE_IMGBB_IMAGE,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_INGREDIENTS,
  SET_CURRENT_STEP_VALUE,
  ADD_RECIPE_STEP,
  REMOVE_RECIPE_STEP,
  SET_STEP_TO_EDIT,
  SAVE_STEP_CHANGES,
  CANCEL_STEP_CHANGES,
  CLEAR_RECIPE_STEPS,
  RESET_ALL_FIELDS,
  SET_EDIT_INPUT_VALUE,
  POPULATE_FROM_LOCALSTORAGE
} from './privateRecipes.types';

// Dynamically set form field values
export const setBasicFieldValue = name => dispatch => {
  dispatch({
    type: SET_BASIC_FIELD_VALUES,
    payload: name
  })
};

// Set recipe image locally
export const setLocalImage = img => dispatch => {
  dispatch({
    type: SET_LOCAL_IMAGE,
    payload: img
  })
};

// Remove recipe image
export const removeImage = () => dispatch => {
  dispatch({ type: REMOVE_LOCAL_IMAGE });
  dispatch({ type: REMOVE_IMGBB_IMAGE });
};

// Set recipe image on IMGBB API
export const setImgbbImage = file => async dispatch => {
  // There is a CORS error while 'x-auth-token' is included in the Headers when trying to do a request to IMGUR API 
  // I could have used 'fetch' instead of 'axios' in order to avoid this problem, same as I have used 'fetch' for TheMealDB API
  const formData = new FormData();
  formData.append("image", file);
  // Create a new AXIOS instance just for this API call in order to send a request without 'x-auth-token' in Headers
  const instance = axios.create({ timeout: 10000 });
  delete instance.defaults.headers.common['x-auth-token'];

  const res = await instance.post('https://api.imgbb.com/1/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      key: `${process.env.REACT_APP_IMGBB_KEY}`
    }
  });

  dispatch({
    type: SET_IMGBB_IMAGE,
    payload: res.data.data.image.url
  })
};

// ADD ingredient to list
export const addIngredient = ingredient => dispatch => {
  dispatch({
    type: ADD_INGREDIENT,
    payload: ingredient
  });
};

// REMOVE ingredient from list
export const removeIngredient = ingredient => dispatch => {
  dispatch({
    type: REMOVE_INGREDIENT,
    payload: ingredient
  });
};

// CLEAR all ingredients from list
export const clearIngredients = () => ({ type: CLEAR_INGREDIENTS });


// SET value of current step
export const setCurrentStepValue = txt => ({
  type: SET_CURRENT_STEP_VALUE,
  payload: txt
});

// ADD RECIPE STEP
export const addStep = () => ({ type: ADD_RECIPE_STEP });

// REMOVE RECIPE STEP
export const removeStep = id => ({
  type: REMOVE_RECIPE_STEP,
  payload: id
});

export const setStepToEdit = step => ({
  type: SET_STEP_TO_EDIT,
  payload: step
});

export const setEditInputValue = input => ({
  type: SET_EDIT_INPUT_VALUE,
  payload: input
});

export const saveStepChanges = () => ({ type: SAVE_STEP_CHANGES });

export const cancelStepChanges = () => ({ type: CANCEL_STEP_CHANGES });

// Populate fields from local storage
export const populateFieldsFromLS = () => ({ type: POPULATE_FROM_LOCALSTORAGE });

// RESET all fields
export const resetAllFields = () => ({ type: RESET_ALL_FIELDS })

// ADD RECIPE
export const createRecipe = recipe => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const { name, category, area, youtubeURL, imageFromIMGBB, ingredients, steps } = recipe;

  const toPost = {
    name,
    category,
    area,
    youtubeURL,
    imageFromIMGBB,
    ingredients,
    steps
  };

  try {
    const res = await axios.post('/api/recipes', toPost, config);

    dispatch({
      type: CREATE_RECIPE,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data.msg);
  }
};