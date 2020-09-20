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
  RESET_ALL_FIELDS,
  SET_EDIT_INPUT_VALUE,
  POPULATE_FROM_LOCALSTORAGE,
  FETCH_USER_RECIPES,
  REMOVE_RECIPE_BY_ID,
  EDIT_RECIPE_BY_ID,
  UPDATE_RECIPE,
  TOGGLE_EDIT_MODE,
  SET_ACTION_SUCCESSFUL_TO_FALSE
} from './privateRecipes.types';
import { setAlert } from '../../alert/alert.actions';

// ###################################################################################
// ##################################### CREATE RECIPE ###############################

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
export const resetAllFields = () => dispatch => {
  dispatch({ type: RESET_ALL_FIELDS });
  dispatch(setAlert('Fields have been Cleared!', 'warning'));
}

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

    dispatch(setAlert('Recipe Created!', 'success'));

  } catch (err) {
    // dispatch(setAlert(err.response.data.msg, 'fail'));
    console.log(err);
  }
};

// ###################################################################################
// ############################### MY RECIPES ########################################

// Fetch users's recipes
export const fetchUserRecipes = () => async dispatch => {
  console.log('FETCHING USER RECIPES');
  try {
    const res = await axios.get('/api/recipes');

    dispatch({
      type: FETCH_USER_RECIPES,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateRecipe = recipe => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const { id, name, category, area, youtubeURL, imageFromIMGBB, ingredients, steps } = recipe;

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
    const res = await axios.put(`/api/recipes/${id}`, toPost, config);

    dispatch({
      type: UPDATE_RECIPE,
      payload: res.data
    })

    dispatch(setAlert('Recipe Updated!', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'fail'));
  }
}

export const removeRecipeById = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/recipes/${id}`);

    dispatch({
      type: REMOVE_RECIPE_BY_ID,
      payload: id
    })

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, 'fail'));
  }
}

export const editRecipeById = id => dispatch => {
  dispatch({
    type: EDIT_RECIPE_BY_ID,
    payload: id
  })
}

export const toggleEditMode = value => dispatch => {
  dispatch({
    type: TOGGLE_EDIT_MODE,
    payload: value
  })
}

export const setActionSuccessfulToFalse = () => ({ type: SET_ACTION_SUCCESSFUL_TO_FALSE });