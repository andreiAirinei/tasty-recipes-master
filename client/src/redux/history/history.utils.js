export const checkIfSeenAndReplace = (seenRecipes, payload) => {
  // Check if recipe exists and return it's position
  const foundRecipeAtIndex = seenRecipes.findIndex(recipe => recipe.id === payload.id);

  if (foundRecipeAtIndex > -1) {
    // Remove recipe from array
    seenRecipes.splice(foundRecipeAtIndex, 1);
  }

  // Payload will be a new recipe OR the existing one which was previously found somewhere in the array
  seenRecipes.unshift(payload);
  addRecipeHistoryToLocalStorage(seenRecipes);
  return seenRecipes;
}

export const addRecipeHistoryToLocalStorage = list => {
  const appHistory = JSON.parse(localStorage.getItem('appHistory'));
  appHistory.recipes = list;
  localStorage.setItem('appHistory', JSON.stringify(appHistory));
}

export const getHistoryFromLocalStorage = () => {
  const appHistory = JSON.parse(localStorage.getItem('appHistory'));
  return [...appHistory.recipes] || [];
}