import {
  MODAL_OPEN,
  MODAL_CLOSE,
  SET_VIDEO_URL
} from './videoModal.types';

const INITIAL_STATE = {
  isActive: false,
  videoURL: null
};

const videoModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        isActive: true
      }

    case MODAL_CLOSE:
      return {
        ...state,
        isActive: false
      }

    case SET_VIDEO_URL:
      return {
        ...state,
        videoURL: action.payload
      }

    default:
      return {
        ...state
      }
  }
}

export default videoModalReducer;