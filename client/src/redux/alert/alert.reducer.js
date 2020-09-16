import {
  SET_ALERT,
  REMOVE_ALERT
} from './alert.types';

const INITIAL_STATE = {
  alerts: []
}

const alertReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SET_ALERT:
      // const isDuplicate = state.alerts.some(alert => alert.msg = action.payload.msg);

      return {
        ...state,
        // Do not set alert if the same message is already in queue
        alerts: state.alerts.some(alert => alert.msg === action.payload.msg) ?
          [...state.alerts] : [...state.alerts, action.payload]
      }

    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload)
      }

    default:
      return state;
  }
}

export default alertReducer;