import {
  ADD_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_FAVORITE,
  CLEAR_FAVORITES
} from './favorites.types';

const INITIAL_STATE = {
  favorites: [],
  current: null
};


const favoritesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      }

    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        current: action.payload
      }

    case REMOVE_FAVORITE:
      const filteredFavorites = state.favorites.filter(fav => fav.recipeID !== action.payload)
      return {
        ...state,
        favorites: [...filteredFavorites]
      }

    case CLEAR_FAVORITES:
      return {
        ...state,
        current: null,
        favorites: []
      }

    default:
      return {
        ...state
      }
  }
};

export default favoritesReducer;