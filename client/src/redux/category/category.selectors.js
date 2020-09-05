import { createSelector } from 'reselect';

// Input selector returning a slice of the state
const selectCategory = state => state.category;

// @arg2 - gets the return of @arg1
export const selectActiveCategory = createSelector(
  [selectCategory],
  category => category.activeCategory
);

export const selectCountriesList = createSelector(
  [selectCategory],
  category => category.countriesList
);

export const selectDishTypes = createSelector(
  [selectCategory],
  category => category.dishTypes
);

export const selectPopularCategories = createSelector(
  [selectCategory],
  category => category.popular
);