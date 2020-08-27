import {
  SET_ACTIVE_CATEGORY,
  FETCH_COUNTRIES,
  FETCH_DISH_TYPES
} from './category.types';

export const setActiveCategory = category => dispatch => {
  dispatch({
    type: SET_ACTIVE_CATEGORY,
    payload: category
  })
}

export const fetchCountries = () => async dispatch => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/list.php?a=list`);
    const data = await res.json();

    dispatch({
      type: FETCH_COUNTRIES,
      payload: data.meals
    })
  } catch (err) {
    console.log('API fetching error!');
  }
}

export const fetchDishTypes = () => async dispatch => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/list.php?c=list`);
    const data = await res.json();

    dispatch({
      type: FETCH_DISH_TYPES,
      payload: data.meals
    })
  } catch (err) {
    console.log('API fetching error!');
  }
}

// export const getCategories = dispatch => {
//   dispatch(GET_CATEGORIES);
// }