export interface UserReducers {
  userReducers: {
    loading: boolean;
    authenticated: boolean;
    token: string;
    responseMessage: string;
    error: boolean;
  };
}

export interface NotificationReducers {
  notificationReducers: {
    opened: boolean;
    severity: string;
    message: string;
  };
}
