import axios from 'axios';

import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_BOOKMARKS
} from './bookmarks.types';

// Fetch user's bookmarks
export const fetchBookmarks = () => async dispatch => {
  try {
    const res = await axios.get('/api/bookmarks');

    dispatch({
      type: FETCH_BOOKMARKS,
      payload: res.data
    })
  } catch (err) {
    console.log(err.message);
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
    const res = await axios.post('/api/bookmarks', bm, config);

    dispatch({
      type: ADD_BOOKMARK,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Remove bookmark from user's list
export const removeBookmark = id => async dispatch => {
  try {
    await axios.delete(`/api/bookmarks/${id}`);

    dispatch({
      type: REMOVE_BOOKMARK,
      payload: id
    })
  } catch (err) {
    console.error(err.message);
  }
}