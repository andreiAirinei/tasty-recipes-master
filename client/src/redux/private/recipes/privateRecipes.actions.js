import axios from 'axios';

import {
  CREATE_RECIPE
} from './privateRecipes.types';

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