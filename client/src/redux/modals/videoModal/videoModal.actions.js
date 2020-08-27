import {
  MODAL_OPEN,
  MODAL_CLOSE,
  SET_VIDEO_URL
} from './videoModal.types';

import {
  SET_CLEAR_BACKGROUND,
  SET_BLURRED_BACKGROUND
} from '../../ui/ui.types';

export const modalOpen = () => dispatch => {
  dispatch({ type: SET_BLURRED_BACKGROUND });
  dispatch({ type: MODAL_OPEN });
};

export const modalClose = () => dispatch => {
  dispatch({ type: SET_CLEAR_BACKGROUND });
  dispatch({ type: MODAL_CLOSE });
};

export const setVideoURL = url => ({
  type: SET_VIDEO_URL,
  payload: url
});