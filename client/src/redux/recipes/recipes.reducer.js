import {
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE,
  GET_LATEST_RECIPES,
  GET_RANDOM_SINGLE_RECIPE,
  GET_RANDOM_MULTIPLE_RECIPES,
  GET_RECIPES_BY_CATEGORY,
  GET_RECIPES_BY_INGREDIENT,
  CLEAR_SINGLE_RECIPE,
  SET_LOADING
} from './recipes.types';

const INITIAL_STATE = {
  allRecipes: null,
  singleRecipe: null,
  latestRecipes: {
    data: null,
    isLoading: false
  },
  recipesByCategory: {
    data: null,
    isLoading: false
  },
  recipesByIngredient: {
    data: null,
    isLoading: false
  },
  randomSingle: null,
  randomMultiple: {
    data: null,
    isLoading: false
  }
}

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.payload && action.payload.sort((a, b) => {
          let textA = a.strMeal.toUpperCase().trim();
          let textB = b.strMeal.toUpperCase().trim();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }),
        isLoading: false
      }
    case GET_SINGLE_RECIPE:
      return {
        ...state,
        singleRecipe: action.payload,
        isLoading: false
      }

    case GET_LATEST_RECIPES:
      return {
        ...state,
        latestRecipes: {
          data: action.payload.data,
          isLoading: action.payload.isLoading
        }
      }

    case GET_RANDOM_SINGLE_RECIPE:
      return {
        ...state,
        randomSingle: action.payload,
        isLoading: false
      }

    case GET_RANDOM_MULTIPLE_RECIPES:
      return {
        ...state,
        randomMultiple: {
          data: action.payload.data,
          isLoading: action.payload.isLoading
        }
      }

    case GET_RECIPES_BY_CATEGORY:
      return {
        ...state,
        recipesByCategory: {
          data: action.payload.data && action.payload.data.sort((a, b) => {
            let textA = a.strMeal.toUpperCase().trim();
            let textB = b.strMeal.toUpperCase().trim();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }),
          isLoading: action.payload.isLoading
        }
      }

    case GET_RECIPES_BY_INGREDIENT:
      return {
        ...state,
        recipesByIngredient: {
          data: action.payload.data,
          isLoading: action.payload.isLoading
        }
      }

    case CLEAR_SINGLE_RECIPE:
      return {
        ...state,
        singleRecipe: null
      }

    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      }

    default:
      return {
        ...state
      }
  }
}

export default recipesReducer;