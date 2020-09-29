import axios from 'axios';

import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_BOOKMARKS,
  CLEAR_BOOKMARKS
} from './bookmarks.types';

import { setAlert } from '../../alert/alert.actions';
import { getErrorType } from '../../errors.data';

// Fetch user's bookmarks
export const fetchBookmarks = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/bookmarks`);

    dispatch({
      type: FETCH_BOOKMARKS,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data.msg);
  }
}

// Add bookmark to user's bookmarks list
export const addBookmark = bm => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/bookmarks`, bm, config);

    dispatch({
      type: ADD_BOOKMARK,
      payload: res.data
    });

    dispatch(setAlert('Recipe successfully added to Bookmarks', 'success'));
  } catch (err) {
    dispatch(setAlert(getErrorType(err.response.data.msg), 'fail'));
  }
};

// Remove bookmark from user's list
export const removeBookmark = id => async dispatch => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_SERVER}/api/bookmarks/${id}`);

    dispatch({
      type: REMOVE_BOOKMARK,
      payload: id
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch(setAlert(getErrorType(err.response.data.msg), 'fail'));
  }
}

// CLEAR EVERYTHING
export const clearBookmarks = () => dispatch => {
  dispatch({ type: CLEAR_BOOKMARKS });
};