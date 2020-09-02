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

import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  recipe: {
    name: '',
    category: '',
    area: '',
    youtubeURL: '',
    ingredients: [{
      name: 'Avocado',
      quantity: 'half'
    }, {
      name: 'Salmon',
      quantity: '3 filetts'
    }, {
      name: 'Bay Leaf',
      quantity: '2'
    }, {
      name: 'Cajun',
      quantity: '100g'
    }],
    currentStep: '',
    steps: []
  },
  current: null
};

const privateRecipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BASIC_FIELD_VALUES:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [action.payload.fieldName]: action.payload.value
        }
      }

    case ADD_INGREDIENT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: [
            // similar to UNSHIFT method
            action.payload, ...state.recipe.ingredients
          ]
        }
      }

    case REMOVE_INGREDIENT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: state.recipe.ingredients.filter(ing => ing.name !== action.payload)
        }
      }

    case CLEAR_INGREDIENTS:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: []
        }
      }

    case SET_CURRENT_STEP_VALUE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          currentStep: action.payload
        }
      }

    case ADD_RECIPE_STEP:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: [...state.recipe.steps, {
            id: uuid(),
            step: state.recipe.currentStep
          }]
        }
      }

    case CREATE_RECIPE:
      return {
        ...state,
        current: action.payload
      }

    case RESET_ALL_FIELDS:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          name: '',
          category: '',
          area: '',
          youtubeURL: '',
          ingredients: [],
          currentStep: '',
          steps: []
        }
      }

    default:
      return {
        ...state
      }
  }
};

export default privateRecipesReducer;