import { FETCH_ALL_INGREDIENTS } from './ingredients.types';

const INITIAL_STATE = {
  list: null
};

const ingredientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_INGREDIENTS:
      return {
        ...state,
        list: action.payload
      }

    default:
      return {
        ...state
      }
  }
};

export default ingredientsReducer;