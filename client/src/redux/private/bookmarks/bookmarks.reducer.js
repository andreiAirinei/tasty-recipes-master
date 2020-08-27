import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  FETCH_BOOKMARKS
} from './bookmarks.types';

const INITIAL_STATE = {
  current: null,
  bookmarks: null
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
      const filteredBookmarks = state.bookmarks.filter(bm => bm._id !== action.payload)
      return {
        ...state,
        bookmarks: [...filteredBookmarks]
      }

    default:
      return {
        ...state
      }
  }
};

export default bookmarksReducer;