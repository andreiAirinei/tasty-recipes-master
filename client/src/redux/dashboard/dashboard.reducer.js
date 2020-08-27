import {
  SET_ACTIVE_TAB
} from './dashboard.types';

const INITIAL_STATE = {
  activeTab: 'create'
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      }

    default:
      return {
        ...state
      }
  }
};

export default dashboardReducer;