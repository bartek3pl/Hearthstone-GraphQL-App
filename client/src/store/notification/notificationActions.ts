import C from './constants';

export const openNotification = () => (dispatch: Function) => {
  dispatch({ type: C.OPEN_NOTIFICATION });
};

export const hideNotification = () => (dispatch: Function) => {
  dispatch({ type: C.HIDE_NOTIFICATION });
};

export const setNotificationSeverity = (severity: string) => (
  dispatch: Function
) => {
  dispatch({ type: C.SET_NOTIFICATION_SEVERITY, severity });
};

export const setNotificationMessage = (message: string) => (
  dispatch: Function
) => {
  dispatch({ type: C.SET_NOTIFICATION_MESSAGE, message });
};
