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
  EDIT_STEP_VALUE,
  SAVE_STEP_CHANGES,
  CANCEL_STEP_CHANGES,
  CLEAR_RECIPE_STEPS,
  POPULATE_FROM_LOCALSTORAGE,
  RESET_ALL_FIELDS
} from './privateRecipes.types';

import {
  setImage,
  removeImage,
  addIngredient,
  populateFromLS
} from './privateRecipes.utils';

import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  recipe: {
    name: '',
    category: '',
    area: '',
    youtubeURL: '',
    imageFromLocal: '',
    imageFromIMGBB: '',
    ingredients: [],
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

    case SET_LOCAL_IMAGE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          imageFromLocal: setImage(action.payload)
        }
      }

    case REMOVE_LOCAL_IMAGE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          imageFromLocal: removeImage()
        }
      }

    case SET_IMGBB_IMAGE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          imageFromIMGBB: action.payload
        }
      }

    case REMOVE_IMGBB_IMAGE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          imageFromIMGBB: null
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
            addIngredient({
              ...action.payload,
              id: uuid()
            }),
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
      const user = JSON.parse(localStorage.getItem('privateUser'));

      localStorage.setItem('privateUser', JSON.stringify({
        ...user,
        recipe: {}
      }));

      return {
        ...state,
        recipe: {
          ...state.recipe,
          name: '',
          category: '',
          area: '',
          youtubeURL: '',
          imageFromLocal: null,
          imageFromIMGBB: null,
          ingredients: [],
          currentStep: '',
          steps: [],
          editStep: {
            id: null,
            value: ''
          }
        }
      }

    case POPULATE_FROM_LOCALSTORAGE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ...populateFromLS()
        }
      }

    default:
      return {
        ...state
      }
  }
};

export default privateRecipesReducer;