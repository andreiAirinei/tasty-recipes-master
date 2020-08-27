import {
  OPEN_MODAL_CREDENTIALS,
  CLOSE_MODAL_CREDENTIALS,
  SET_TOPIC_LOGIN
} from './credentialsModal.types';

const INITIAL_STATE = {
  isActive: false,
  topicLogin: true,
  credentials: {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  }
};

const credentialsModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case OPEN_MODAL_CREDENTIALS:
      return {
        ...state,
        isActive: true
      }

    case CLOSE_MODAL_CREDENTIALS:
      return {
        ...state,
        isActive: false
      }

    case SET_TOPIC_LOGIN:
      return {
        ...state,
        topicLogin: action.payload
      }

    default:
      return {
        ...state
      }
  }
};

export default credentialsModalReducer;