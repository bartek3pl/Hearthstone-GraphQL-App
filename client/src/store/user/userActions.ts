import C from './constants';
import authService from '../../services/authService';

const ERROR_MESSAGE = 'Sorry, something went wrong.';

export const register = (
  username: string,
  password: string,
  registerFunction: Function
) => async (dispatch: Function) => {
  dispatch({ type: C.REGISTRATION_BEGIN });

  try {
    const { data } = await registerFunction({
      variables: { input: { login: username, password } },
    });

    if (data?.register?.success) {
      dispatch({
        type: C.REGISTRATION_SUCCESS,
        responseMessage: data?.register?.message,
      });
    } else {
      dispatch({
        type: C.REGISTRATION_FAILURE,
        responseMessage: data?.register?.message,
      });
    }
  } catch (error) {
    dispatch({ type: C.REGISTRATION_FAILURE, responseMessage: ERROR_MESSAGE });
    console.error(error);
  }
};

export const login = (
  username: string,
  password: string,
  logIn: Function
) => async (dispatch: Function) => {
  dispatch({ type: C.LOGIN_BEGIN });

  const { setAccessToken, setUserId } = authService();

  try {
    const { data } = await logIn({
      variables: { input: { login: username, password } },
    });

    if (data?.login?.success) {
      setAccessToken(data?.login?.token?.accessToken);
      setUserId(data?.login?.user?._id);

      dispatch({
        type: C.LOGIN_SUCCESS,
        token: data?.login?.token?.accessToken,
        responseMessage: data?.login?.message,
        id: data?.login?.user?._id,
      });
    } else {
      dispatch({
        type: C.LOGIN_FAILURE,
        responseMessage: data?.login?.message,
      });
    }
  } catch (error) {
    dispatch({ type: C.LOGIN_FAILURE, responseMessage: ERROR_MESSAGE });
    console.error(error);
  }
};

export const logout = () => (dispatch: Function) => {
  dispatch({ type: C.LOGOUT_BEGIN });

  const { logout: logoutFunction } = authService();
  logoutFunction();

  dispatch({
    type: C.LOGOUT_SUCCESS,
    responseMessage: 'User successfully logged out.',
  });
};
