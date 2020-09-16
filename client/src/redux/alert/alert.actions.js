import {
  SET_ALERT,
  REMOVE_ALERT
} from './alert.types';

import { v4 as uuid } from 'uuid';

// Add alert
export const setAlert = (msg, type, timeout = 2500) => dispatch => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}