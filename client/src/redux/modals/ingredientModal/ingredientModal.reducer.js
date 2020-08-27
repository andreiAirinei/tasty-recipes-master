import {
  MODAL_OPEN_INGREDIENT,
  MODAL_CLOSE_INGREDIENT,
  SET_INGREDIENT
} from './ingredientModal.types';

const INITIAL_STATE = {
  isActive: false,
  ingredient: null
};

const ingredientModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_OPEN_INGREDIENT:
      return {
        ...state,
        isActive: true
      }

    case MODAL_CLOSE_INGREDIENT:
      return {
        ...state,
        isActive: false
      }

    case SET_INGREDIENT:
      return {
        ...state,
        ingredient: action.payload
      }

    default:
      return {
        ...state
      };
  }
}

export default ingredientModalReducer;