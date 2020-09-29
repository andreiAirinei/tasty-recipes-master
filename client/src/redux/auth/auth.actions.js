import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from './auth.types';

import { setAlert } from '../alert/alert.actions';

// Also used along 'logout' function
import { RESET_ALL_FIELDS } from '../private/recipes/privateRecipes.types';
import { DELETE_SEEN_RECIPES_HISTORY } from '../history/history.types';
import { CLEAR_BOOKMARKS } from '../private/bookmarks/bookmarks.types';
import { CLEAR_FAVORITES } from '../private/favorites/favorites.types';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/auth`);
    dispatch({ type: USER_LOADED, payload: res.data });

  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/users`, formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg || err.message
    })
  }
}

// Login User
export const login = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/auth`, formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg || err.message
    })
  }
};

// Logout
export const logout = () => dispatch => {
  // Remove USER dashboard details from Redux
  dispatch({ type: RESET_ALL_FIELDS });
  // Remove History
  dispatch({ type: DELETE_SEEN_RECIPES_HISTORY })
  // Remove bookmarks
  dispatch({ type: CLEAR_BOOKMARKS });
  // Remove favorites
  dispatch({ type: CLEAR_FAVORITES });
  // Remove token from LocalStorage
  dispatch({ type: LOGOUT });
  dispatch(loadUser());
  dispatch(setAlert('Logout successfully!', 'success'));
}

// Clear Errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
}