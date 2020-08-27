import { combineReducers } from 'redux';
import recipesReducer from './recipes/recipes.reducer';
import videoModalReducer from './modals/videoModal/videoModal.reducer';
import uiReducer from './ui/ui.reducer';
import categoryReducer from './category/category.reducer';
import ingredientsReducer from './ingredients/ingredients.reducer';
import ingredientsModalReducer from './modals/ingredientModal/ingredientModal.reducer';
import credentialsModalReducer from './modals/credentialsModal/credentialsModal.reducer';
import dashboardReducer from './dashboard/dashboard.reducer';
import authReducer from './auth/auth.reducer';
import privateRecipesReducer from './private/recipes/privateRecipes.reducer';
import favoritesReducer from './private/favorites/favorites.reducer';
import bookmarksReducer from './private/bookmarks/bookmarks.reducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  ingredients: ingredientsReducer,
  category: categoryReducer,
  credentialsModal: credentialsModalReducer,
  videoModal: videoModalReducer,
  ingredientModal: ingredientsModalReducer,
  dashboard: dashboardReducer,
  ui: uiReducer,
  auth: authReducer,
  privateRecipes: privateRecipesReducer,
  favorites: favoritesReducer,
  bookmarks: bookmarksReducer
});

export default rootReducer;