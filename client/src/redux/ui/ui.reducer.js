import {
  OPEN_MOBILE_MENU,
  CLOSE_MOBILE_MENU,
  SET_BLURRED_BACKGROUND,
  SET_CLEAR_BACKGROUND,
  SET_TAB_TITLE,
  SET_INFINITY_LIST_SETTINGS
} from './ui.types';

const INITIAL_STATE = {
  isShowingMobileMenu: false,
  isBackgroundBlurred: false,
  title: null,
  infinityListSettings: {
    idxStart: 0,
    idxEnd: 12
  },
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_MOBILE_MENU:
      return {
        ...state,
        isShowingMobileMenu: true
      }

    case CLOSE_MOBILE_MENU:
      return {
        ...state,
        isShowingMobileMenu: false
      }

    case SET_BLURRED_BACKGROUND:
      return {
        ...state,
        isBackgroundBlurred: true
      }

    case SET_CLEAR_BACKGROUND:
      return {
        ...state,
        isBackgroundBlurred: false
      }

    case SET_TAB_TITLE:
      return {
        ...state,
        title: action.payload
      }

    case SET_INFINITY_LIST_SETTINGS:
      return {
        ...state,
        infinityListSettings: action.payload
      }

    default:
      return {
        ...state
      }
  }
}

export default uiReducer;