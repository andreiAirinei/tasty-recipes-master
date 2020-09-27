// Helper functions
const getLocalStorageUser = () => JSON.parse(localStorage.getItem('privateUser'));
const setLocalStorageUser = (user) => { localStorage.setItem('privateUser', JSON.stringify(user)) };

// Check localStorage disk space before setting the item.
// If error, item will not be saved in LS for a component rehydration on mount/unmount
const checkAndSave = (item) => {
  try {
    setLocalStorageUser(item);
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.log("LocalStorage space is full!");
    } else {
      alert("LocalStorage: Something went wrong.");
    }
  }
}

export const setFieldValueToLocalStorage = payload => {
  const user = getLocalStorageUser();
  // Spread object and dynamically modify values based on property
  const item = {
    ...user,
    recipe: {
      ...user.recipe,
      [payload.fieldName]: payload.value
    }
  }
  // setLocalStorageUser(item);
  checkAndSave(item);
};

// ### RECIPE INGREDIENTS
export const addIngredientToLocalStorage = payload => {
  const user = getLocalStorageUser();

  if (!user.recipe.hasOwnProperty('ingredients')) user.recipe.ingredients = [];
  user.recipe.ingredients.unshift(payload);
  setLocalStorageUser(user);
};

export const removeIngredientFromLocalStorage = id => {
  const user = getLocalStorageUser();
  user.recipe.ingredients = user.recipe.ingredients.filter(step => step.id !== id);
  setLocalStorageUser(user);
}

export const clearIngredientFromLocalStorage = () => {
  const user = getLocalStorageUser();
  user.recipe.ingredients = [];
  setLocalStorageUser(user);
}

// ### RECIPE STEPS
export const addStepToLocalStorage = ({ id, value }) => {
  const user = getLocalStorageUser();

  if (!user.recipe.hasOwnProperty('steps')) user.recipe.steps = [];
  user.recipe.steps.push({ id, value });
  user.recipe.currentStep = '';
  setLocalStorageUser(user);
};

export const removeStepFromLocalStorage = id => {
  const user = getLocalStorageUser();
  user.recipe.steps = user.recipe.steps.filter(step => step.id !== id);
  setLocalStorageUser(user);
}

export const setStepToEditToLocalStorage = ({ id, value }) => {
  const user = getLocalStorageUser();
  user.recipe.editStep = ({ id, value });
  setLocalStorageUser(user);
}

export const setEditInputValueToLS = payload => {
  const user = getLocalStorageUser();
  user.recipe.editStep.value = payload;
  setLocalStorageUser(user);
}

export const saveStepChangesToLocalStorage = payload => {
  const user = getLocalStorageUser();
  user.recipe.steps = payload;
  user.recipe.editStep = { id: null, value: '' };
  setLocalStorageUser(user);
}

export const cancelStepChangesFromLocalStorage = () => {
  const user = getLocalStorageUser();
  user.recipe.editStep = { id: null, value: '' };
  setLocalStorageUser(user);
}

// Reset all fields
export const resetFieldsFromLocalStorage = () => {
  const user = getLocalStorageUser();
  user.recipe = {};
  setLocalStorageUser(user);
}

// ### Populate 'Create Recipe' fields from LocalStorage
export const populateFromLocalStorage = () => {
  // Not sure if return is good
  if (!localStorage.privateUser) return null;

  const { recipe } = JSON.parse(localStorage.getItem('privateUser'));
  return {
    name: recipe.name || '',
    category: recipe.category || '',
    area: recipe.area || '',
    youtubeURL: recipe.youtubeURL || '',
    localImage: recipe.localImage || null,
    imageFromIMGBB: recipe.imageFromIMGBB || '',
    ingredients: recipe.ingredients || [],
    currentStep: recipe.currentStep || '',
    steps: recipe.steps || [],
    editStep: recipe.editStep || {
      id: null,
      value: ''
    }
  }
};