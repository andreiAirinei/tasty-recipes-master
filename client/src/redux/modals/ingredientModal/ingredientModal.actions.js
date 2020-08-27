import {
  MODAL_OPEN_INGREDIENT,
  MODAL_CLOSE_INGREDIENT,
  SET_INGREDIENT
} from './ingredientModal.types';

import {
  SET_BLURRED_BACKGROUND,
  SET_CLEAR_BACKGROUND
} from '../../ui/ui.types';

export const modalOpenIngredient = () => dispatch => {
  dispatch({ type: SET_BLURRED_BACKGROUND });
  dispatch({
    type: MODAL_OPEN_INGREDIENT
  })
}

export const closeModalIngredient = () => dispatch => {
  dispatch({ type: SET_CLEAR_BACKGROUND });
  dispatch({
    type: MODAL_CLOSE_INGREDIENT
  });
}

export const setModalIngredient = ingredient => dispatch => {
  dispatch({
    type: SET_INGREDIENT,
    payload: ingredient
  })
};
