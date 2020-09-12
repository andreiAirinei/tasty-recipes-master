import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_BOOKMARKS,
  CLEAR_BOOKMARKS
} from './bookmarks.types';

const INITIAL_STATE = {
  current: null,
  bookmarks: []
};

const bookmarksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload
      }

    case ADD_BOOKMARK:
      return {
        ...state,
        current: action.payload
      }

    case REMOVE_BOOKMARK:
      const filteredBookmarks = state.bookmarks.filter(bm => bm.recipeID !== action.payload)
      return {
        ...state,
        bookmarks: [...filteredBookmarks]
      }

    case CLEAR_BOOKMARKS:
      return {
        ...state,
        current: null,
        bookmarks: []
      }

    default:
      return {
        ...state
      }
  }
};

export default bookmarksReducer;