export interface UserReducers {
  userReducers: {
    id: string;
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
