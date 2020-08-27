import {
  CREATE_RECIPE
} from './privateRecipes.types';

const INITIAL_STATE = {
  current: null
};

const privateRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_RECIPE:
      return {
        ...state,
        current: action.payload
      }

    default:
      return {
        ...state
      }
  }
};

export default privateRecipesReducer;