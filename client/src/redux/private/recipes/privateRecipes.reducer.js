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
  SET_EDIT_INPUT_VALUE,
  SAVE_STEP_CHANGES,
  CANCEL_STEP_CHANGES,
  POPULATE_FROM_LOCALSTORAGE,
  RESET_ALL_FIELDS,
  FETCH_USER_RECIPES,
  REMOVE_RECIPE_BY_ID,
  EDIT_RECIPE_BY_ID,
  UPDATE_RECIPE,
  TOGGLE_EDIT_MODE,
  SET_ACTION_SUCCESSFUL_TO_FALSE,
  SET_IMAGE_LOADING
} from './privateRecipes.types';

import {
  setFieldValueToLocalStorage,
  addIngredientToLocalStorage,
  addStepToLocalStorage,
  removeStepFromLocalStorage,
  populateFromLocalStorage,
  setStepToEditToLocalStorage,
  setEditInputValueToLS,
  removeIngredientFromLocalStorage,
  clearIngredientFromLocalStorage,
  saveStepChangesToLocalStorage,
  cancelStepChangesFromLocalStorage,
  resetFieldsFromLocalStorage
} from './privateRecipes.utils';

import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
  recipe: {
    name: '',
    category: '',
    area: '',
    youtubeURL: '',
    localImage: '',
    imageFromIMGBB: '',
    ingredients: [],
    currentStep: '',
    steps: [],
    editStep: {
      id: null,
      value: ''
    }
  },
  recipes: [],
  editMode: false,
  current: null,
  actionSuccessful: false,
  imgbbLoading: false
};

const privateRecipesReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SET_BASIC_FIELD_VALUES:
      const { fieldName, value } = action.payload;
      !state.editMode && setFieldValueToLocalStorage({
        fieldName,
        value
      });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [fieldName]: value
        }
      }

    case SET_LOCAL_IMAGE:
      !state.editMode && setFieldValueToLocalStorage({ fieldName: 'localImage', value: action.payload });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          localImage: action.payload
        }
      }

    case REMOVE_LOCAL_IMAGE:
      !state.editMode && setFieldValueToLocalStorage({ fieldName: 'localImage', value: '' });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          localImage: ''
        }
      }

    case SET_IMGBB_IMAGE:
      !state.editMode && setFieldValueToLocalStorage({ fieldName: 'imageFromIMGBB', value: action.payload });
      return {
        ...state,
        imgbbLoading: false,
        recipe: {
          ...state.recipe,
          imageFromIMGBB: action.payload
        }
      }

    case REMOVE_IMGBB_IMAGE:
      !state.editMode && setFieldValueToLocalStorage({ fieldName: 'imageFromIMGBB', value: '' });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          imageFromIMGBB: ''
        }
      }

    case ADD_INGREDIENT: {
      const id = uuid();
      !state.editMode && addIngredientToLocalStorage({ ...action.payload, id });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: [
            // similar to UNSHIFT method
            // spread the ingredient object and add an unique ID
            { ...action.payload, id },
            ...state.recipe.ingredients
          ]
        }
      }
    }

    case REMOVE_INGREDIENT:
      !state.editMode && removeIngredientFromLocalStorage(action.payload);
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: state.recipe.ingredients.filter(ing => ing.id !== action.payload)
        }
      }

    case CLEAR_INGREDIENTS:
      !state.editMode && clearIngredientFromLocalStorage();
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: []
        }
      }

    case SET_CURRENT_STEP_VALUE:
      !state.editMode && setFieldValueToLocalStorage({ fieldName: 'currentStep', value: action.payload });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          currentStep: action.payload
        }
      }

    case ADD_RECIPE_STEP: {
      const id = uuid();
      !state.editMode && addStepToLocalStorage({ id, value: state.recipe.currentStep });
      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: [...state.recipe.steps, {
            id: id,
            value: state.recipe.currentStep
          }],
          currentStep: ''
        }
      }
    }

    case REMOVE_RECIPE_STEP:
      !state.editMode && removeStepFromLocalStorage(action.payload);
      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: state.recipe.steps.filter(step => step.id !== action.payload)
        }
      }

    case SET_STEP_TO_EDIT:
      !state.editMode && setStepToEditToLocalStorage(action.payload);
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

    case SET_EDIT_INPUT_VALUE:
      !state.editMode && setEditInputValueToLS(action.payload);
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
      const modifiedSteps = state.recipe.steps.map(step => {
        step.id === state.recipe.editStep.id && (step.value = state.recipe.editStep.value);
        return step;
      });
      !state.editMode && saveStepChangesToLocalStorage(modifiedSteps);

      return {
        ...state,
        recipe: {
          ...state.recipe,
          steps: modifiedSteps,
          editStep: {
            id: null,
            value: ''
          }
        }
      }

    case CANCEL_STEP_CHANGES:
      !state.editMode && cancelStepChangesFromLocalStorage();
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

    case CREATE_RECIPE:
      resetFieldsFromLocalStorage();
      return {
        ...state,
        recipe: {
          ...state.recipe,
          name: '',
          category: '',
          area: '',
          youtubeURL: '',
          localImage: '',
          imageFromIMGBB: '',
          ingredients: [],
          currentStep: '',
          steps: [],
          editStep: {
            id: null,
            value: ''
          }
        },
        current: action.payload,
        actionSuccessful: true
      }

    case RESET_ALL_FIELDS: {
      !state.editMode && resetFieldsFromLocalStorage();
      return {
        ...state,
        recipe: {
          ...state.recipe,
          name: '',
          category: '',
          area: '',
          youtubeURL: '',
          localImage: '',
          imageFromIMGBB: '',
          ingredients: [],
          currentStep: '',
          steps: [],
          editStep: {
            id: null,
            value: ''
          }
        }
      }
    }

    case POPULATE_FROM_LOCALSTORAGE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ...populateFromLocalStorage()
        }
      }

    case FETCH_USER_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }

    case REMOVE_RECIPE_BY_ID:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload)
      }

    case EDIT_RECIPE_BY_ID:
      const toEdit = state.recipes.find(recipe => recipe._id === action.payload);
      const { _id, name, category, area, imageFromIMGBB, youtubeURL, ingredients, steps } = toEdit;

      return {
        ...state,
        recipe: {
          ...state.recipe,
          id: _id,
          name,
          category,
          area,
          localImage: imageFromIMGBB,
          imageFromIMGBB,
          youtubeURL,
          ingredients,
          steps
        },
        editMode: true
      }

    case UPDATE_RECIPE:
      return {
        ...state,
        current: action.payload,
        actionSuccessful: true
      }

    case TOGGLE_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload
      }

    case SET_ACTION_SUCCESSFUL_TO_FALSE:
      return {
        ...state,
        actionSuccessful: false
      }

    case SET_IMAGE_LOADING:
      return {
        ...state,
        imgbbLoading: true
      }

    default:
      return {
        ...state
      }
  }
};

export default privateRecipesReducer;