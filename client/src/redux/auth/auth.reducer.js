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

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  authSuccess: false,
  loading: true,
  user: null,
  error: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // Set token to LocalStorage
      localStorage.setItem('token', action.payload.token);
      // Set an empty private user object which will be later used
      localStorage.setItem('privateUser', JSON.stringify({ recipe: {} }));
      // Set user history in local storage
      localStorage.setItem('appHistory', JSON.stringify({ recipes: [] }));

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        authSuccess: true,
        loading: false
      }

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      // Remove Token from local storage
      localStorage.removeItem('token');
      // Remove private User recipe
      localStorage.removeItem('privateUser');
      // Remove user's history
      localStorage.removeItem('appHistory');
      // Delete 'x-auth-token' from default headers
      setAuthToken(false);

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        authSuccess: false,
        loading: false,
        user: null,
        error: action.payload
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return {
        ...state
      }
  }
};

export default authReducer;