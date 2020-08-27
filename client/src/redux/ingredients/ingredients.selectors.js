import { createSelector } from 'reselect';

const selectIngredients = state => state.ingredients;

export const selectIngredientsGroupedAlphabetically = createSelector(
  [selectIngredients],
  selectIngredients => {
    // Create an empty object
    const groupedList = {};

    // Add alphabet letters as object keys and values with empty array
    // Empty arrays will later be filled with the specific ingredients to the group
    for (let i = 65; i <= 90; i++) {
      groupedList[String.fromCharCode(i)] = [];
    }

    selectIngredients.list && selectIngredients.list.forEach(ingredient => {
      groupedList[ingredient.strIngredient.charAt(0).toUpperCase()].push(ingredient);
    })

    return groupedList;
  }
)