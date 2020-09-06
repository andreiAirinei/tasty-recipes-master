export const setImage = payload => {
  if (!localStorage.privateUser) return '';

  const user = JSON.parse(localStorage.getItem('privateUser'));

  if (payload) {
    user.recipe.recipeImage = payload;
    localStorage.setItem('privateUser', JSON.stringify(user));

    return payload;
  }

  // Return will be NULL if recipeImage is empty/not exist
  return user.recipe.hasOwnProperty('recipeImage') ? user.recipe.recipeImage : '';
};

// Removing image from LocalStorage and also from Redux by returning NULL
export const removeImage = () => {
  const user = JSON.parse(localStorage.getItem('privateUser'));
  console.log(user);
  user.recipe.recipeImage = '';
  localStorage.setItem('privateUser', JSON.stringify(user));

  return '';
};

export const addIngredient = payload => {
  const user = JSON.parse(localStorage.getItem('privateUser'));

  if (!user.recipe.hasOwnProperty('ingredients')) user.recipe.ingredients = [];

  user.recipe.ingredients.unshift(payload);
  localStorage.setItem('privateUser', JSON.stringify(user));

  return payload;
}

// Populate Create Meal fields from LocalStorage
export const populateFromLS = () => {
  const { recipe } = JSON.parse(localStorage.getItem('privateUser'));
  console.log(recipe);
};