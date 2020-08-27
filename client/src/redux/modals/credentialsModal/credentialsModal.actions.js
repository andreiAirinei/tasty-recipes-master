import {
  OPEN_MODAL_CREDENTIALS,
  CLOSE_MODAL_CREDENTIALS,
  SET_TOPIC_LOGIN,
} from './credentialsModal.types';

import {
  SET_CLEAR_BACKGROUND,
  SET_BLURRED_BACKGROUND
} from '../../ui/ui.types';

export const openModalCredentials = () => dispatch => {
  dispatch({ type: SET_BLURRED_BACKGROUND });
  dispatch({
    type: OPEN_MODAL_CREDENTIALS
  });
};

export const closeModalCredentials = () => dispatch => {
  dispatch({ type: SET_CLEAR_BACKGROUND });
  dispatch({
    type: CLOSE_MODAL_CREDENTIALS
  });
};

export const setTopicLogin = topic => dispatch => {
  dispatch({
    type: SET_TOPIC_LOGIN,
    payload: topic
  })
}