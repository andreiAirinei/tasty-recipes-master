import { FETCH_ALL_INGREDIENTS } from './ingredients.types';

export const fetchAllIngredients = () => async dispatch => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/list.php?i=list`);
    const data = await res.json();

    dispatch({
      type: FETCH_ALL_INGREDIENTS,
      payload: data.meals
    });
  } catch (err) {
    console.log('API fetching all ingredients error!');
  }
}