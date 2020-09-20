import C from './constants';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case C.OPEN_NOTIFICATION:
      return {
        ...state,
        opened: true,
      };
    case C.HIDE_NOTIFICATION:
      return {
        ...state,
        opened: false,
      };
    case C.SET_NOTIFICATION_SEVERITY:
      return {
        ...state,
        severity: action.severity,
      };
    case C.SET_NOTIFICATION_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
