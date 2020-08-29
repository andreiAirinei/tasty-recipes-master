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

// ####### Selectors for REACT-SELECT input values

export const selectDishTypesSearchList = createSelector(
  [selectDishTypes],
  dishTypes => dishTypes ? dishTypes.map(type => ({
    // First two properties are required by REACT-SELECT 
    value: type.strCategory,
    label: type.strCategory,
    // Property to help replicating "e.target.value"
    target: {
      value: type.strCategory,
      name: 'category'
    }
  })) : []
);

export const selectCountriesSearchList = createSelector(
  [selectCountriesList],
  countriesList => countriesList ? countriesList.map(area => ({
    value: area.strArea,
    label: area.strArea,
    target: {
      value: area.strArea,
      name: 'area'
    }
  })) : []
);