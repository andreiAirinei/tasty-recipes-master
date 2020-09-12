import {
  ADD_RECIPE_TO_HISTORY,
  POPULATE_HISTORY_FROM_LOCAL_STORAGE
} from './history.types';

export const addRecipeToHistory = recipe => ({ type: ADD_RECIPE_TO_HISTORY, payload: recipe });

export const populateHistoryFromLS = () => ({ type: POPULATE_HISTORY_FROM_LOCAL_STORAGE });