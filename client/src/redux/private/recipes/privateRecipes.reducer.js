import {
  CREATE_RECIPE,
  SET_BASIC_FIELD_VALUES,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_INGREDIENTS,
  SET_CURRENT_STEP_VALUE,
  ADD_RECIPE_STEP,
  REMOVE_RECIPE_STEP,
  SET_STEP_TO_EDIT,
  EDIT_STEP_VALUE,
  SAVE_STEP_CHANGES,
  CANCEL_STEP_CHANGES,
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
      id: 'ingr1',
      name: 'Avocado',
      quantity: 'half'
    }, {
      id: 'ingr2',
      name: 'Salmon',
      quantity: '3 filetts'
    }, {
      id: 'ingr3',
      name: 'Bay Leaf',
      quantity: '2'
    }, {
      id: 'ingr4',
      name: 'Cajun',
      quantity: '100g'
    }],
    currentStep: '',
    steps: [],
    editStep: {
      id: null,
      value: ''
    }
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
            // spread the ingredient object and add an unique ID
            {
              ...action.payload,
              id: uuid()
            },
            ...state.recipe.ingredients
          ]
        }
      }

    case REMOVE_INGREDIENT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: state.recipe.ingredients.filter(ing => ing.id !== action.payload)
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

    case SET_STEP_TO_EDIT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          editStep: {
            ...state.recipe.editStep,
            id: action.payload.id,
            value: action.payload.value
          }
        }
      }

    case EDIT_STEP_VALUE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          editStep: {
            ...state.recipe.editStep,
            value: action.payload
          }
        }
      }

    case SAVE_STEP_CHANGES:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: state.recipe.steps.map(step => {
            step.id === state.recipe.editStep.id && (step.value = state.recipe.editStep.value);
            return step;
          }),
          editStep: {
            id: null,
            value: ''
          }
        }
      }

    case CANCEL_STEP_CHANGES:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          editStep: {
            id: null,
            value: ''
          }
        }
      }

    case ADD_RECIPE_STEP:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: [...state.recipe.steps, {
            id: uuid(),
            value: state.recipe.currentStep
          }],
          currentStep: ''
        }
      }

    case REMOVE_RECIPE_STEP:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: state.recipe.steps.filter(step => step.id !== action.payload)
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
          steps: [],
          editStep: {
            id: null,
            value: ''
          }
        }
      }

    default:
      return {
        ...state
      }
  }
};

export default privateRecipesReducer;