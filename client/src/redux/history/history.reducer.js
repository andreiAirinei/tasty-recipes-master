import {
  ADD_RECIPE_TO_HISTORY,
  POPULATE_HISTORY_FROM_LOCAL_STORAGE,
  DELETE_SEEN_RECIPES_HISTORY
} from './history.types';
import {
  checkIfSeenAndReplace,
  getHistoryFromLocalStorage
} from './history.utils';

const INITIAL_STATE = {
  seenRecipes: []
};

const historyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RECIPE_TO_HISTORY:
      return {
        ...state,
        seenRecipes: checkIfSeenAndReplace(state.seenRecipes, action.payload)
      }

    case POPULATE_HISTORY_FROM_LOCAL_STORAGE:
      return {
        ...state,
        seenRecipes: getHistoryFromLocalStorage()
      }

    case DELETE_SEEN_RECIPES_HISTORY:
      return {
        ...state,
        seenRecipes: []
      }
    default:
      return {
        ...state
      }
  }
};

export default historyReducer;