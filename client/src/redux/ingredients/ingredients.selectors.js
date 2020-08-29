import { createSelector } from 'reselect';

const selectIngredients = state => state.ingredients;

export const selectIngredientsList = createSelector(
  [selectIngredients],
  ingredients => ingredients.list
);

export const selectIngredientsGroupedAlphabetically = createSelector(
  [selectIngredientsList],
  ingredientsList => {
    // Create an empty object
    const groupedList = {};

    // Add alphabet letters as object keys and values with empty array
    // Empty arrays will later be filled with the specific ingredients to the group
    for (let i = 65; i <= 90; i++) {
      groupedList[String.fromCharCode(i)] = [];
    }

    ingredientsList && ingredientsList.forEach(ingredient => {
      groupedList[ingredient.strIngredient.charAt(0).toUpperCase()].push(ingredient);
    })

    return groupedList;
  }
);

// ####### Selectors for REACT-SELECT input values
export const selectIngredientsSearchList = createSelector(
  [selectIngredientsList],
  ingredientsList => ingredientsList ? ingredientsList.map(el => ({
    value: el.strIngredient,
    label: el.strIngredient,
    target: {
      name: 'ingredient',
      value: el.strIngredient
    }
  })) : []
);