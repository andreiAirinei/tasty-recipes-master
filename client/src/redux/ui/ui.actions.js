import {
  OPEN_MOBILE_MENU,
  CLOSE_MOBILE_MENU,
  SET_TAB_TITLE,
  SET_INFINITY_LIST_SETTINGS,
  SET_BLURRED_BACKGROUND,
  SET_CLEAR_BACKGROUND
} from './ui.types';

export const openMobileMenu = () => dispatch => {
  dispatch({
    type: OPEN_MOBILE_MENU
  })
};

export const closeMobileMenu = () => dispatch => {
  dispatch({
    type: CLOSE_MOBILE_MENU
  })
};

export const setTabTitle = (title) => dispatch => {
  dispatch({
    type: SET_TAB_TITLE,
    payload: title
  });
};

export const setInfinityListSettings = (settings) => dispatch => {
  dispatch({
    type: SET_INFINITY_LIST_SETTINGS,
    payload: settings
  })
};

export const setBlurredBackground = () => dispatch => {
  dispatch({
    type: SET_BLURRED_BACKGROUND
  })
};

export const setClearBackground = () => dispatch => {
  dispatch({
    type: SET_CLEAR_BACKGROUND
  })
};