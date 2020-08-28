import axios from 'axios';

import {
  ADD_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_FAVORITE,
  CLEAR_FAVORITES
} from './favorites.types';

// Fetch user's favorite recipes
export const fetchFavorites = () => async dispatch => {
  try {
    const res = await axios.get('/api/favorites');

    dispatch({
      type: FETCH_FAVORITES,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data.msg);
  }
}

// Add recipe to user's favorite list
export const addFavorite = favorite => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/favorites', favorite, config);

    dispatch({
      type: ADD_FAVORITE,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data.msg);
  }
};

// Remove favorite recipe from user's list
export const removeFavorite = id => async dispatch => {
  try {
    await axios.delete(`/api/favorites/${id}`);

    dispatch({
      type: REMOVE_FAVORITE,
      payload: id
    })
  } catch (err) {
    console.error(err.message);
  }
}

// Clear everything related to Favorites
export const clearFavorites = () => dispatch => {
  dispatch({ type: CLEAR_FAVORITES });
}