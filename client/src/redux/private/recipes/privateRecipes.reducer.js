import {
  CREATE_RECIPE,
  SET_RECIPE_FIELD_VALUES,
} from './privateRecipes.types';

const INITIAL_STATE = {
  recipe: {
    name: '',
    category: '',
    area: '',
    youtubeURL: '',
    ingredients: [],
    steps: []
  },
  current: null
};

const privateRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RECIPE_FIELD_VALUES:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.payload.fieldName]: action.payload.value
        }
      }
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