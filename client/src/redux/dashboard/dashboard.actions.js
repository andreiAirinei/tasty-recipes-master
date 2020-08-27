import {
  SET_ACTIVE_TAB
} from './dashboard.types';

export const setActiveTab = tab => dispatch => {
  dispatch({
    type: SET_ACTIVE_TAB,
    payload: tab
  })
};