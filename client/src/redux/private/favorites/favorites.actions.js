import axios from 'axios';

import {
  ADD_FAVORITE,
  FETCH_FAVORITES,
  REMOVE_FAVORITE,
  CLEAR_FAVORITES
} from './favorites.types';

import { setAlert } from '../../alert/alert.actions';
import { getErrorType } from '../../errors.data';

// Fetch user's favorite recipes
export const fetchFavorites = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/favorites`);

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
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/favorites`, favorite, config);

    dispatch({
      type: ADD_FAVORITE,
      payload: res.data
    });

    dispatch(setAlert('Recipe successfully added to Favorites', 'success'));
  } catch (err) {
    dispatch(setAlert(getErrorType(err.response.data.msg), 'fail'));
  }
};

// Remove favorite recipe from user's list
export const removeFavorite = id => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_SERVER}/api/favorites/${id}`);

    dispatch({
      type: REMOVE_FAVORITE,
      payload: id
    })

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch(setAlert(getErrorType(err.response.data.msg), 'fail'));
  }
}

// Clear everything related to Favorites
export const clearFavorites = () => dispatch => {
  dispatch({ type: CLEAR_FAVORITES });
}