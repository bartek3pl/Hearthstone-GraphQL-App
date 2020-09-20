import C from './constants';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case C.REGISTRATION_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case C.REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        responseMessage: action.responseMessage,
        error: null,
      };
    case C.REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        responseMessage: action.responseMessage,
        error: true,
      };

    case C.LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case C.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        token: action.token,
        responseMessage: action.responseMessage,
        error: null,
      };
    case C.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        authenticated: false,
        token: null,
        responseMessage: action.responseMessage,
        error: true,
      };

    case C.LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case C.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: false,
        token: null,
        responseMessage: action.responseMessage,
        error: null,
      };

    default:
      return state;
  }
};
